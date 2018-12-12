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
	 
     return;         
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

// User helf or contact us email
/** Auther	: Rajiv Kumar
 *  Date	: July 6, 2018
 *	Description : Function to send the email of user from contact us page
 **/
const contactUsSetting = (req, res) => {
  	return res.json({
	  code: httpResponseCode.EVERYTHING_IS_OK,
	  message: httpResponseMessage.PASSWORD_CHANGE_SUCCESSFULLY,
	  result: result
	});

};

module.exports = {
  getModulesSetting,
  updateModuleSetting,
  contactUsSetting
  
};
