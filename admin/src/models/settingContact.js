//'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');
		
var SettingContactSchema = new Schema({
isContact:{
  type: Boolean,
  default: true
},
email:{
	type:String,
	sparse: true,
	lowercase:true,
	required:true
},
address:{
	type:String,
	trim:true
},
city:{
	type:String,
	trim:true
},
state:{
	type:String,
	trim:true
},
country:{
	type:String,
	trim:true
},
zipCode:{
	type:String,
	trim:true
},
},
{
timestamps:true
});
SettingContactSchema.methods.toJSON = function() {
    var obj = this.toObject();   
    return obj;
}
module.exports = mongoose.model('SettingContact', SettingContactSchema);
