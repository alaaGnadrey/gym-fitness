var express = require('express');
var router = express.Router();

/* none payments report */
router.get('/nonePayments', function(req, res, next) {
  res.render('reports/nonePaymentReport', { title: 'Gym Fitness - דוח אי תשלומים'});
});

module.exports = router;
