var express = require('express');
var router = express.Router();


module.exports = function(passport,routesMiddleware){
  /* none payments report */
  router.get('/nonePayments',routesMiddleware.isLoggedIn, function(req, res, next) {
    res.render('reports/nonePaymentReport', { title: 'Gym Fitness - דוח אי תשלומים'});
  });

  return router;
};

