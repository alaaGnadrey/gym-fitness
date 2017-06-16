var express = require('express');
var router = express.Router();

module.exports = function(passport,routesMiddleware){

  /* GET clients listing. */
  router.get('/:id?',routesMiddleware.isLoggedIn, function(req, res, next) {
    res.render('clients', { title: 'Gym Fitness - מנויים' ,clientId: req.params.id});
  });

  /* GET client payments listing. */
  router.get('/:id/payments/:paymentId?',routesMiddleware.isLoggedIn, function(req, res, next) {
    res.render('payments', { title: 'Gym Fitness - תשלומים' ,clientId: req.params.id,paymentId:req.params.paymentId});
  });

  return router;
};
