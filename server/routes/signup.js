var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var crypto  = require('crypto');
var config  = require('../../config');
var validator   = require('express-validator');

router.use(validator({
  customValidators: {
    isEmailAvailable: function(value) {
      return new Promise(function(resolve, reject) {        
        User.findOne({ email: value })
          .then(function(user) {            
            if (!user) {
              resolve();              
            }
            else {              
              reject(user);              
            }
          })
          .catch(function(error){
            if (error) {
              reject(error);
            }
          });
      });
    }
  }
}));

router.route('/signup')
  .post(function(req, res) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email Taken').isEmailAvailable();
    req.checkBody('email', 'A valid email is required').isEmail();
    req.checkBody('password', 'Please enter a password with a length between 5 and 35 digits').len(9, 35);
    //var errors = req.validationErrors();
    //if (errors) { res.json({success: false, errors: errors}); return; }

    req.asyncValidationErrors()
    .then(function() {
      var user = new User();
      user.email = req.body.email;
      user.name = req.body.name;
      user.password = crypto.createHmac('sha256', config.secret).update(req.body.password).digest('hex');
      user.admin = req.body.admin;
      user.save(function(err) {
        if (err) res.send(err);
        res.json({success: true, message: 'User created!' });
      });
    })
    .catch(function(errors) {
      //res.status(422).json({success: false, errors: errors});
      res.status(422).send(errors);
    });
  });

module.exports = router;