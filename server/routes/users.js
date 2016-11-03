var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var crypto  = require('crypto');
var config  = require('../../config');

router.route('/users')
    // (accessed at POST http://localhost:3000/api/users)
    .post(function(req, res) {
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
    // (accessed at GET http://localhost:3000/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) res.send(err);

            res.json(users);
        });
    });

router.route('/users/:user_id')
    // (accessed at GET http://localhost:3000/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    })
    // (accessed at PUT http://localhost:3000/api/users/:user_id)
    .put(function(req, res) {        
        User.findById(req.params.user_id, function(err, user) {
            if (err) res.send(err);
            user.email = req.body.email;
            user.name = req.body.name;  
            user.password = req.body.password;
            user.admin = req.body.admin;          
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ success: true, message: 'User updated!' });
            });
        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) res.send(err);
            res.json({ success: true, message: 'Successfully deleted' });
        });
    });

module.exports = router;