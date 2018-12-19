/* State Model
* Author    : Rajiv Kumar
* Date  : Dec 17, 2018
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');

var PartnerVisitorSchema = new Schema({
partnerId:{ 
  type:Schema.Types.ObjectId,
  ref: 'Advertisement'
},
ip:{
    type:String,
    trim:true
},

userId:{
	type: String,
	trim: true
},
},
{
timestamps:true
});
PartnerVisitorSchema.methods.toJSON = function() {
    var obj = this.toObject();   
    return obj;
   }
module.exports = mongoose.model('PartnerVisitor',PartnerVisitorSchema);
