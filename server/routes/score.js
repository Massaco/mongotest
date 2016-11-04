var express = require('express');
var router  = express.Router();
var Score    = require('../models/score');
var crypto  = require('crypto');
var config  = require('../../config');

router.route('/score')
    .post(function(req, res) {
        var score = new Score();
        score.score = req.body.score;   
        score.save(function(err) {
            if (err) res.send(err);
            res.json({success: true, message: 'Score Saved!' });
        });
    })
    .get(function(req, res) {
        Score.find(function(err, score) {
            if (err) res.send(err);
            res.json(score);
        });
    });

module.exports = router;