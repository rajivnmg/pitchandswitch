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
	lowercase:true
	//required:true
},
fromEmail:{
	type:String,
	sparse: true	
},
contactNumber:{
	type:String,
	sparse: true
	
},
address:{
	type:String,
	trim:true
},
city:{
	type:String,
	trim:true,
	default:null
},
state:{
	type:String,
	trim:true,
	default:null
},
country:{
	type:String,
	trim:true,
	default:null
},
zipCode:{
	type:String,
	trim:true,
	default:null
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
