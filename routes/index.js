var express = require('express');
var router = express.Router();

module.exports = function(passport,routesMiddleware){

  // caching disabled for every route
  router.all('*',function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });


  /* GET home page. */
  router.get('/',routesMiddleware.isLoggedIn, function(req, res, next) {
    res.render('index', { title: 'Gym Fitness' });
  });

  router.get('/login', function(req, res, next) {
    res.render('account/login', { title: 'כניסה' , message: req.flash('loginMessage') });
  });

    router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }));


  router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/login');
  });


  /* GET clients listing. */
  router.get('/clients/:id?',routesMiddleware.isLoggedIn, function(req, res, next) {
    res.render('clients', { title: 'Gym Fitness - מנויים' ,clientId: req.params.id});
  });

  /* GET client payments listing. */
  router.get('/clients/:id/payments/:paymentId?',routesMiddleware.isLoggedIn, function(req, res, next) {
    res.render('payments', { title: 'Gym Fitness - תשלומים' ,clientId: req.params.id,paymentId:req.params.paymentId});
  });


  /* none payments report */
  router.get('/reports/nonePayments',routesMiddleware.isLoggedIn, function(req, res, next) {
    res.render('reports/nonePaymentReport', { title: 'Gym Fitness - דוח אי תשלומים'});
  });


  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on 
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/login');
  }

  return router;
}

