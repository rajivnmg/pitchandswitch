//'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');
		
var SettingModulesSchema = new Schema({
isPopularItem:{
  type: Boolean,
  default: true
},
isHomeSponsors:{
    type:Boolean,
    trim:true
},
isTestimonials:{
    type: Boolean,
	default: true
},
isDonate:{
	type: Boolean,
    default: true
},
isNewlyProducts:{
	type: Boolean,
	default: true
},
isWhatOtherSwitched:{
	type: Boolean,
	default: true
},
isMostTrusted:{
	type: Boolean,
	default: true
},
isHowItWorks:{
	type: Boolean,
	default: true
},
youTubeVideoId:{
	type:String,
	trim:true,
	default: null
},
isWeKeepSafe:{
	type: Boolean,
	default: true
},
isWhatPitchSwitch:{
	type: Boolean,
	default: true
}
},
{
timestamps:true
});

SettingModulesSchema.methods.toJSON = function() {
    var obj = this.toObject();   
    return obj;
}

module.exports = mongoose.model('SettingModules', SettingModulesSchema);
