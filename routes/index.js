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
    var errorMessageId=req.flash('loginMessage');
    var errorMessageText="";
    errorMessageId=errorMessageId.length ? errorMessageId[0]:"";
    
    switch(errorMessageId){
      case 'NoUserFound' :{errorMessageText="משתמש לא קיים"; break;}
      case 'WrongPassword' :{errorMessageText="סיסמה שגויה"; break;}
    }
    
    res.render('account/login', { title: 'כניסה' , message: errorMessageText });
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

  return router;
};

