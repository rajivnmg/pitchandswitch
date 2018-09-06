//'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
global.Promise = mongoose.Promise;
var bcrypt = require('bcrypt-nodejs');

var truestedUserSchema = new Schema({
	
submitUserId:{
  type:String,
  trim:true
},
userId:{
 type:String,
 trim:true
},

tradeId:{
    type:String,
    trim:true
},

review:{
    type:String,
    trim:true
},

status:{
  type:String,
  trim:true,
  sparse:true,
  default:0
},

{
 timestamps:true
});

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}
module.exports = mongoose.model('truestedUser', truestedUserSchema);
