var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var clientModel = mongoose.model('Client');
var paymentModel = mongoose.model('Payment');

module.exports = function(passport,routesMiddleware){

  /* POST  new client  and save. */
  router.post('/nonePayments',routesMiddleware.isLoggedIn, function(req, res, next) {
    var requestParam= req.body;
    var fromDate=requestParam.fromDate;
    var toDate= requestParam.toDate;

    if(fromDate && toDate){
      fromDate=new Date(requestParam.fromDate);
      toDate=new Date(requestParam.toDate);

      clientModel.find({registerDate: {
            $lte: toDate,
          }})
          .populate('payments')
          .exec(function(err, clients){
          if(err){ return next(err); }
      
          res.json(clients);
        });
    }else{
        return next(new Error('error perform the payments report')); 
    }
  });

  return router;
};

