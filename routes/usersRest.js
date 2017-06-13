var express = require('express');
var router = express.Router();

module.exports =function(passport,routesMiddleware){

  /*
  router.post('/login',function(req, res, next) {
        passport.authenticate('local-login', function(err, user) {
            if (err) { return next(err) }
            if (!user) {
                return res.render('/login');
            }

            // make passportjs setup the user object, serialize the user, ...
            req.login(user, {}, function(err) {
                if (err) { return next(err) };
                return res.redirect("/");
            });
        })(req, res, next);
        return;
    }
    );
  */  
  
  /*
   passport.authenticate('local-login'),function(req,res) {
          res.redirect('/clients');
  }
  );
  */

  return router;

}  
