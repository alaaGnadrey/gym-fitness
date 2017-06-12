var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var configDB = require('./config/database.js');

//get db schema
require('./models/clients');
require('./models/payments');
require('./models/users');

//Connect to our local MongoDB instance 
mongoose.connect(configDB.url);

var configPassport = require('./config/passport.js')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// required for passport
app.use(session({ 
  secret: 'ilovescotchscotchyscotchscotch',
  cookie: { maxAge  : (60000 * 30) }//half hour
}));
/*  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: new Date(Date.now() + 3600000)
  }
}));
*/
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



var routes = require('./routes/index')(passport);;
//var users = require('./routes/users');
var usersRest=require('./routes/usersRest')(passport);
//var clients = require('./routes/clients');
var clientRest = require('./routes/clientRest');
//var reports = require('./routes/reports');
var reportsRest=require('./routes/reportsRest');


//register routers
app.use('/', routes);
//app.use('/users', users);
app.use('/usersApi',usersRest);
//app.use('/clients', clients);
app.use('/clientApi',clientRest);
//app.use('/reports',reports);
app.use('/reportsApi',reportsRest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* error handlers */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
