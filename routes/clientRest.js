var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var clientModel = mongoose.model('Client');
var paymentModel = mongoose.model('Payment');

/* GET all client listing. */
router.get('/', function(req, res, next) {
 clientModel.find(function(err, clients){
    if(err){ return next(err); }

    res.json(clients);
 });
});

/* POST  new client  and save. */
 router.post('/', function(req, res, next) {
  var client = new clientModel(req.body);

  client.save(function(err, post){
    if(err){ return next(err); }

    res.json(client);
  });
});

/* middleware param */
 router.param('clientId', function(req, res, next, id) {
  var query = clientModel.findById(id);

  query.exec(function (err, client){
    if (err) { return next(err); }
    if (!client) { return next(new Error('can\'t find client')); }
    
    req.client = client;
    return next();
  });
});

/* get specific client by id */
router.get('/:clientId', function(req, res) {
  res.json(req.client);
});

/* get specific client by id */
router.put('/:clientId', function(req, res) {

	req.client.fname=req.body.fname;
	req.client.lname=req.body.lname;
	req.client.status=req.body.status;
	req.client.program=req.body.program;
	req.client.birthday=req.body.birthday;
	req.client.identity=req.body.identity;
	req.client.address=req.body.address;
	req.client.phone1=req.body.phone1;
	req.client.phone2=req.body.phone2;

    req.client.save(function (err, todo) {
    	if (err) {
        	res.status(500).send(err)
        }
  		res.json(req.client);
    });
});


/*------------------------------payments------------------------------------------*/

/* middleware param */
 router.param('paymentId', function(req, res, next, id) {
  var query = paymentModel.findById(id);

  query.exec(function (err, payment){
    if (err) { return next(err); }
    if (!payment) { return next(new Error('can\'t find payment')); }

    req.payment = payment;
    return next();
  });
});

/* GET all client payments. */
router.get('/:clientId/payment', function(req, res, next) {

  clientModel.findById(req.client._id)
  .populate('payments')
  .exec(function (err, client) {
    if (err) return next(err);
        res.json(client.payments);
  });
});

/* GET a client specific payment. */
router.get('/:clientId/payment/:paymentId', function(req, res, next) {
  res.json(req.payment);  
});


router.post('/:clientId/payment', function(req, res, next) {
  var payment = new paymentModel(req.body);
  payment.client = req.client;

  payment.save(function(err, comment){
    if(err){ return next(err); }

    req.client.payments.push(payment);
    req.client.save(function(err, post) {
      if(err){ return next(err); }

      res.json(payment);
    });
  });
});

/* get specific client by id */
router.put('/:clientId/payment/:paymentId', function(req, res) {

  req.payment.fromDate=req.body.fromDate;
  req.payment.toDate=req.body.toDate;
  req.payment.amount=req.body.amount;
  
    req.payment.save(function (err, todo) {
      if (err) {
          res.status(500).send(err)
        }
      res.json(req.payment);
    });
});


module.exports = router;
