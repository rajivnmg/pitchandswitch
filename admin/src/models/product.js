'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  relationship = require("mongoose-relationship");
  
global.Promise = mongoose.Promise;
var  bcrypt = require('bcrypt-nodejs');
var Image = require('./productImage');
var ProductSchema = new Schema({
productName:{
 type:String,
 trim:true
},
description:{
    type:String,
    trim:true
},

	
userId:{
     type: Schema.Types.ObjectId,
     ref: 'User'
},
productCategory:{
	type: Schema.Types.ObjectId,
    ref: 'Category'
},

productImages: [],
color:{
type:String,
trim:true,
},
brand:{
  type: Schema.Types.ObjectId,
  ref: 'Brand'
},
size:{
  type: Schema.Types.ObjectId,
  ref: 'Size'
},
condition:{
  type: String,
  ref: 'Size'
},
productAge:{
type:String,
trim:true
},

length:{
type:String,
trim:true,
default:0
},
width:{
type:String,
trim:true,
default:0
},
height:{
type:String,
trim:true,
default:0
},
weight:{
type:String,
trim:true,
default:0 //weight always be in kgs
},
productStatus:{
 type:String,
 trim:true,
 sparse:true,
 default:0 // 0 -> inactive, 1->Active, 2-> sold out
}
},
{
timestamps:true
});
ProductSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
}

ProductSchema.methods.getCategory = function(callback) {
  var product = this;
  var productCategoryID = this.productCategory.map(function(productCategory) {
    return productCategory.product_id;

  }); 
};

module.exports = mongoose.model('Product', ProductSchema);
