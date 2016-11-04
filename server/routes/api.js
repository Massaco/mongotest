var express = require('express');
var router  = express.Router();
var jwt     = require('jsonwebtoken');
var config  = require('../../config');

// TODO http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/

router.use(require('./authenticate')); // Before middleware 
router.use(require('./signup'));

// middleware to use for all requests
router.use(function(req, res, next) {
  // //req.body.token || req.query.token || req.headers['x-access-token'] || 
  // var token = req.headers['authorization'].split(' ')[1];    
  // if (token) {        
    // jwt.verify(token, config.secret, function(err, decoded) {      
      // if (err) {
        // return res.json({ success: false, message: 'Failed to authenticate token.' });    
      // } else {
        // req.decoded = decoded;
        // next();
      // }
    // });
  // } else {    
    // return res.status(403).send({ 
      // success: false, 
      // message: 'No token? You Shall Not Pass!' 
    // });    
  // }
  next();
});

router.use(require('./users'));
router.use(require('./countries'));
router.use(require('./score'));

router.get('/', function(req, res) {    
    res.json({ message: 'welcome to /api'});
});

module.exports = router;