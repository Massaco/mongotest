var express = require('express');
var router  = express.Router();

// db.getCollection('countries').findOne();
// db.getCollection('countries').distinct("region", {"region": {$ne: ""}},{"region":1})
// db.getCollection('countries').distinct("name.common", {"region": {$eq: "Oceania"}})

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ArraySchema = new Schema({ any: [] })
var Country = mongoose.model('Country', ArraySchema);

router.route('/countries')
    // (accessed at GET ./api/countries)
    .get(function(req, res) {
        Country.find()
        .distinct('name.common', function(err, countries) {
            if (err) res.send(err);
            res.json(countries);
        });
    });

router.route('/countries/:region')
    // (accessed at GET ./api/countries/Americas)
    .get(function(req, res) {
        Country.find({'region': {$eq: req.params.region}})
        .distinct('name.common', function(err, countries) {
            if (err) res.send(err);
            res.json(countries);
        });
    });

router.route('/countries/:region/:subregion')
    // (accessed at GET ./api/countries/Americas)
    .get(function(req, res) {
        Country.find({'subregion': {$eq: req.params.subregion}})
        .distinct('name.common', function(err, countries) {
            if (err) res.send(err);
            res.json(countries);
        });
    });

router.route('/subregions/:region')
    // (accessed at GET ./api/regions)
    .get(function(req, res) {
        Country.find({'region': {$eq: req.params.region}})
        .distinct('subregion', function(err, regions) {
            if (err) res.send(err);
            res.json(regions);
        });
    })

router.route('/regions')
    // (accessed at GET ./api/countries)
    .get(function(req, res) {
        Country.find({"region": {$ne: ""}})
        .distinct('region', function(err, countries) {
            if (err) res.send(err);
            res.json(countries);
        });
    });


module.exports = router;