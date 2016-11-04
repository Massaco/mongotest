var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    email: String,
    name: String,
    password: String,     
    admin: Boolean 
}, { versionKey: false });

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);