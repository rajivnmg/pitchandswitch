/*  *Country Model
    *Author: Rajiv Kumar
    *Date  : Nov 16, 2018
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');

var TestCountrySchema = new Schema({
	id: {
        type: Number,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    sortname: {
        type: String,
        trim: true
    },
    status:{
        type:String,
        trim:true,
        sparse:true 
       },
    phoneCode:{
        type:Number,
        trim:true,
        sparse:true 
       }
},
{
    timestamps:true
});
TestCountrySchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
}
module.exports = mongoose.model('TestCountry', TestCountrySchema);
