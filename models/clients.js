var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  fname: {type:String,required: true},
  lname: {type:String,required: true},
  registerDate:{ type: Date, default: Date.now },
  status:{ type: Number, default:0 },//app.clientStatus
  program:{ type: Number, default: 0 },
  birthday:{ type: Date, default: null },
  identity:{ type: String, default: null },
  address:{ type: String, default: "" },
  phone1:{ type: String, default: "" },
  phone2:{ type: String, default: "" },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
});

mongoose.model('Client', ClientSchema);