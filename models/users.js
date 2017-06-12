var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    fname: {type:String,required: true},
     local            : {
        username     : {type:String,required: true},
        password     : {type:String,required: true}
    }
});

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return password===this.local.password;
};
mongoose.model('User', UserSchema);