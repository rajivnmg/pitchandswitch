/* City Model
* Author    : Saurabh Agarwal
* Date  : July 17, 2018
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');

var TestCitySchema = new Schema({
id:{
	type: Number,
	trim: true
},
name: {
	type: String,
	trim: true
},
state_id:{
    type:String,
    trim: true
},
status:{
 type:String,
 trim:true,
 sparse:true 
},
},
{
 timestamps:true
});

TestCitySchema.methods.toJSON = function() {
    var obj = this.toObject();   
    return obj;
   }
module.exports = mongoose.model('TestCity', TestCitySchema);
