var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var config  = require('../../config');
var crypto  = require('crypto');

//$http.defaults.headers.common['x-access-token'] = jwt
router.route('/authenticate')
    .post(function(req, res) {
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) throw err;
            if (!user) {                
                res.status(401).send([{ success: false, msg: 'Authentication failed. User not found.' }]);
            } else if (user) {
                // check if password matches
                var hash = crypto.createHmac('sha256', config.secret)
                    .update(req.body.password)
                    .digest('hex');
                if (user.password != hash) {                    
                    res.status(401).send([{ success: false, msg: 'Authentication failed. Wrong password.' }]);
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: '15m' // 1s 2sec 1m 1h 1.5hrs 1d 2
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }   
            }
        });
    });

module.exports = router;
