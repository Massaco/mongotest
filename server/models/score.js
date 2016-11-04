var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ScoreSchema   = new Schema({
    score: Number  
}, { versionKey: false });

module.exports = mongoose.model('Score', ScoreSchema);