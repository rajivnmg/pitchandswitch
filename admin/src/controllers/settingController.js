//const bodyParser = require('body-parser')
const SettingModules = require("../models/settingModules");
const SettingContact = require("../models/settingContact");
const SettingSocialMedia = require("../models/settingSocialMedia");
const httpResponseCode = require("../helpers/httpResponseCode");
const httpResponseMessage = require("../helpers/httpResponseMessage");
const validation = require("../middlewares/validation");
const constant = require("../../common/constant");
const commonFunction = require("../../common/commonFunction");
const moment = require("moment-timezone");
const md5 = require("md5");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const multiparty = require("multiparty");
const http = require("http");
const path = require("path");
const fs = require("fs"); //FileSystem for node.js
var gm = require("gm"); //GraphicsMagick for node.js
var passport = require("passport");
require("../config/passport")(passport);
var jwt = require("jsonwebtoken");
var settings = require("../config/settings"); // get settings file;

//Where can search by Postal Address, landmark or IP Address:
var where = require("node-where");

//Get your ip address, compare ip addresses, validate ip addresses, etc.
var ip = require("ip");

// Example retrieve IP from request
var satelize = require("satelize");
var async = require("async");



/** Auther	: Rajiv Kumar
 *  Date	: Nov 5, 2018
 *	Description : Function to list the available mudule setting
 **/
const getModulesSetting = (req, res) => {  
    SettingModules.find({}, (err, result) => {
      if (err) {
        return res.send({
          code: httpResponseCode.BAD_REQUEST,
          message: httpResponseMessage.INTERNAL_SERVER_ERROR
        });
      } else {
        if (!result) {
          res.json({
            message: httpResponseMessage.USER_NOT_FOUND,
            code: httpResponseMessage.BAD_REQUEST
          });
        } else {
          return res.json({
            code: httpResponseCode.EVERYTHING_IS_OK,
            message: httpResponseMessage.SUCCESSFULLY_DONE,
            result: result
          });
        }
      }
    }); 
};

/** Auther	: Rajiv Kumar
 *  Date	: Nov 5, 2018
 *	Description : Function to update the site module of home page.
 **/
const updateModuleSetting = (req, res) => {
	console.log("BOIDY",req.body.name,req.body.value,req.body.moduleSettingId);  
	let fName = req.body.name;	
	 var updateObj = {};
              updateObj[fName] = req.body.value;
              
	 if(req.body.moduleSettingId && req.body.moduleSettingId !==''){
		SettingModules.update({_id:req.body.moduleSettingId}, { "$set":updateObj}, { new: true }, function (err, result) {
		  if (err) {
			  return res.send({
			  code: httpResponseCode.BAD_REQUEST,
			  message: httpResponseMessage.INTERNAL_SERVER_ERROR,
			  Errors: err
			});
		  }else{
			return res.json({
					code: httpResponseCode.EVERYTHING_IS_OK,
					message: httpResponseMessage.SUCCESSFULLY_DONE,
					result: result
			});
		 }
		});   
	 }else{		  
           var settingModules = new SettingModules();         
         settingModules.set({ fName: req.body.value });
		  settingModules.save(function (err, updatedModule) {
			if (err){
				return res.json({
						code: httpResponseCode.BAD_REQUEST,
						message: httpResponseMessage.INTERNAL_SERVER_ERROR,
						result: err
				});
			}else{
				return res.json({
						code: httpResponseCode.EVERYTHING_IS_OK,
						message: httpResponseMessage.SUCCESSFULLY_DONE,
						result: updatedModule
				});
			} 
				
		  });     
              
	 }
	 
           
	//~ SettingModules.update({}, { $set: { updateObj }}, { new: true }, function (err, result) {
	  //~ if (err) {
		  //~ return res.send({
          //~ code: httpResponseCode.BAD_REQUEST,
          //~ message: httpResponseMessage.INTERNAL_SERVER_ERROR,
          //~ Errors: err
        //~ });
	  //~ }else{
		//~ return res.json({
				//~ code: httpResponseCode.EVERYTHING_IS_OK,
				//~ message: httpResponseMessage.SUCCESSFULLY_DONE,
				//~ result: result
		//~ });
	 //~ }
	//~ });   
};


/** Auther	: Rajiv Kumar
 *  Date	: Nov 5, 2018
 *	Description : Function to list the available mudule setting
 **/
const getSocialMediaSetting = (req, res) => {  
	
    SettingSocialMedia.find({}, (err, result) => {
      if (err) {
        return res.send({
          code: httpResponseCode.BAD_REQUEST,
          message: httpResponseMessage.INTERNAL_SERVER_ERROR
        });
      } else {
        if (!result) {
          res.json({
            message: httpResponseMessage.USER_NOT_FOUND,
            code: httpResponseMessage.BAD_REQUEST
          });
        } else {
          return res.json({
            code: httpResponseCode.EVERYTHING_IS_OK,
            message: httpResponseMessage.SUCCESSFULLY_DONE,
            result: result
          });
        }
      }
    }); 
};

/** Auther	: Rajiv Kumar
 *  Date	: Nov 5, 2018
 *	Description : Function to update the site module of home page.
 **/
const updateSocialMediaSetting = (req, res) => {
	console.log("BOIDY",req.body.name,req.body.value,req.body.moduleSettingId);  
	let fName = req.body.name;	
	 var updateObj = {};
              updateObj[fName] = req.body.value;
              
	 if(req.body.moduleSettingId && req.body.moduleSettingId !==''){
		SettingSocialMedia.update({_id:req.body.moduleSettingId}, { "$set":updateObj}, { new: true }, function (err, result) {
		  if (err) {
			  return res.send({
			  code: httpResponseCode.BAD_REQUEST,
			  message: httpResponseMessage.INTERNAL_SERVER_ERROR,
			  Errors: err
			});
		  }else{
			return res.json({
					code: httpResponseCode.EVERYTHING_IS_OK,
					message: httpResponseMessage.SUCCESSFULLY_DONE,
					result: result
			});
		 }
		});   
	 }else{		  
           var settingSocialMedia = new SettingSocialMedia();         
         settingSocialMedia.set({ fName: req.body.value });
		  settingSocialMedia.save(function (err, updatedSetting) {
			if (err){
				return res.json({
						code: httpResponseCode.BAD_REQUEST,
						message: httpResponseMessage.INTERNAL_SERVER_ERROR,
						result: err
				});
			}else{
				return res.json({
						code: httpResponseCode.EVERYTHING_IS_OK,
						message: httpResponseMessage.SUCCESSFULLY_DONE,
						result: updatedSetting
				});
			} 
				
		  });     
              
	 }
};


/** Auther	: Rajiv Kumar
 *  Date	: July 6, 2018
 *	Description : Function to send the email of user from contact us page
 **/
const getContactSetting = (req, res) => {
  	 SettingContact.find({}, (err, result) => {
      if (err) {
        return res.send({
          code: httpResponseCode.BAD_REQUEST,
          message: httpResponseMessage.INTERNAL_SERVER_ERROR
        });
      } else {
        if (!result) {
          res.json({
            message: httpResponseMessage.USER_NOT_FOUND,
            code: httpResponseMessage.BAD_REQUEST
          });
        } else {
          return res.json({
            code: httpResponseCode.EVERYTHING_IS_OK,
            message: httpResponseMessage.SUCCESSFULLY_DONE,
            result: result
          });
        }
      }
    }); 

};


/** Auther	: Rajiv Kumar
 *  Date	: Nov 5, 2018
 *	Description : Function to update the site contact of home page.
 **/
const updateContactSetting = (req, res) => {
	var form = new multiparty.Form();
	form.parse(req, function(err, data, files) {		
	updateData = {};
	updateData.email = data.email[0];
	updateData.fromEmail = data.fromEmail[0];
	updateData.contactNumber = data.contactNumber[0];
	updateData.address = data.address[0];
	updateData.zipCode = data.zipCode[0];
	//console.log("updateData",updateData); return;
	if(data._id[0] && (data._id[0] !=='' || data._id[0] !== undefined)){ 
		console.log(data.email[0]) 
		SettingContact.findOneAndUpdate({ _id:data._id[0] }, updateData, { new:true },(err,result) => {
		if(err){
			return res.send({
				code: httpResponseCode.BAD_REQUEST,
				message: httpResponseMessage.INTERNAL_SERVER_ERROR,
				err:err
			  });
		}else {
			   return res.send({
				code: httpResponseCode.EVERYTHING_IS_OK,
				message: httpResponseMessage.SUCCESSFULLY_DONE,
				result:result
			  });
			}
		});
	}else{
		  SettingContact.create(updateData, (err, result1) => {			
			if (err) {
			  return res.send({
				errr : err,
				code: httpResponseCode.BAD_REQUEST,
				message: httpResponseMessage.INTERNAL_SERVER_ERROR
			  })
			} else {
				 return res.send({
					code: httpResponseCode.EVERYTHING_IS_OK,
					message: httpResponseMessage.SUCCESSFULLY_DONE,
					result:result1
				});
			}
		  });
	}
});

};


module.exports = {
  getModulesSetting,
  updateModuleSetting,
  getSocialMediaSetting,
  updateSocialMediaSetting,
  getContactSetting,
  updateContactSetting
  
  
};
