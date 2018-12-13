/* State Model
* Author    : Saurabh Agarwal
* Date  : July 17, 2018
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');

var TestStateSchema = new Schema({
id:{
	type: Number,
	trim: true
},
name: {
	type: String,
	trim: true
},
country_id:{
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

TestStateSchema.methods.toJSON = function() {
    var obj = this.toObject();   
    return obj;
   }
module.exports = mongoose.model('TestState',TestStateSchema);
