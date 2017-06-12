var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
  fromDate: {type: Date, required: true},
  toDate: {type: Date, required: true},
  amount: {type: Number, default: 0},
  createDate:{ type: Date, default: Date.now },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
});

mongoose.model('Payment', PaymentSchema);