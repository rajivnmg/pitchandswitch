//'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');
		
var SettingSocialMediaSchema = new Schema({
isFacebook:{
  type: Boolean,
  default: true
},
facebookUrl:{
    type: String,
	trim:true,
	lowercase:true,
},
isTwitter:{
    type:String,
    trim:true
},
twitterUrl:{
    type: String,
	trim:true,
	lowercase:true,
},
isLinkedIn:{
    type: Boolean,
	default: true
},
linkedInUrl:{
    type: String,
	trim:true,
	lowercase:true,
}
},
{
timestamps:true
});

SettingSocialMediaSchema.methods.toJSON = function() {
    var obj = this.toObject();   
    return obj;
}

module.exports = mongoose.model('SettingSocialMedia', SettingSocialMediaSchema);
