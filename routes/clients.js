var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:id?', function(req, res, next) {
  res.render('clients', { title: 'Gym Fitness - מנויים' ,clientId: req.params.id});
});

/* GET users listing. */
router.get('/:id/payments/:paymentId?', function(req, res, next) {
  res.render('payments', { title: 'Gym Fitness - תשלומים' ,clientId: req.params.id,paymentId:req.params.paymentId});
});


module.exports = router;
