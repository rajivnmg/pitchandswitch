const Trade = require('../models/trade')
const OfferTrade = require('../models/offerTrade')
const Product = require('../models/product')
const User = require('../models/User')
const TradeReturn = require('../models/tradeReturn')
const TradePitchProduct = require('../models/tradePitchProduct')
const Transaction = require('../models/transaction')
const SwitchProductShipping = require('../models/switchProductShipping');
const PitchProductShipping = require('../models/pitchProductShipping');
const httpResponseCode = require('../helpers/httpResponseCode')
const httpResponseMessage = require('../helpers/httpResponseMessage')
const validation = require('../middlewares/validation')
const constant = require("../../common/constant");
const commonFunction = require("../../common/commonFunction");
const moment = require('moment-timezone');
const md5 = require('md5')
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const Notification = require('../models/notification');
const UserTradeRating = require('../models/userTradeRating');
var settings = require('../config/settings'); // get settings file
var passport = require('passport');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const multiparty = require('multiparty');
const easyPostComponent = require('../components/EasyPostComponent');
var async = require('async');

const keyPublishable = constant.StripeKeyPublic;
const keySecret = constant.StripeKeySecret;
const stripe = require("stripe")(keySecret);



getToken = function (headers) {
  if(headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length) {
      return parted[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

  const listTrades = (req, res) => {
    var perPage = constant.PER_PAGE_RECORD
    var page = req.params.page || 1;
    Trade.find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .sort({createdAt:-1})
      .populate('sellerId')
      .populate('receiverId')
      .populate('sellerProductId')
      .populate('receiverProductId')
      .exec(function(err, trades) {
          Trade.count().exec(function(err, count) {
            if (err) return next(err)
              return res.json({
                  code: httpResponseCode.EVERYTHING_IS_OK,
                  message: httpResponseMessage.SUCCESSFULLY_DONE,
                  result: trades,
                  total : count,
                  current: page,
                  perPage: perPage,
                  pages: Math.ceil(count / perPage)
              });
            })
        });
    }


/** Auther	: Rajiv kumar
 *  Date	: July 2, 2018
 */
///function to save new Trade in the list
const newTrades = (req, res) => {
  const data = req.body;
      let now = new Date();
        Trade.create(req.body, (err, result) => {
		 // console.log('RES-Trade',err, result);
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
            result: result
          })
        }
    })
}

/*
    *Author: Saurabh Agarwal
    *Date  : July 17, 2017
*/
//Function to view all Trades
const viewTrades = (req, res) => {
	const id = req.params.id;
	Trade.findById({_id:id}, (err, result) => {
    if (err) {
      return res.send({
        code: httpResponseCode.BAD_REQUEST,
        message: httpResponseMessage.INTERNAL_SERVER_ERROR
      })
    } else {
      if (!result) {
        res.json({
          message: httpResponseMessage.USER_NOT_FOUND,
          code: httpResponseMessage.BAD_REQUEST
        });
      } else {
        return res.json({
             code: httpResponseCode.EVERYTHING_IS_OK,
             result: result
         });
      }
    }
  })
}

/** Author	: Rajiv Kumar
 *  Date	: July 17, 2018
 **/
//Function to update the Trades status.
const updateStatus = (req, res) => {

  Trade.update({ _id:req.body._id },  { "$set": { "status": req.body.status } }, { new:true }, (err,result) => {
    if(err){
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
              message: httpResponseMessage.CHANGE_STATUS_SUCCESSFULLY,
             result: result
        });
      }
    }
  })
}
/** Author	: Rajiv Kumar
 *  Date	: July 17, 2018
 **/
//Function to update the Trades updateShippingStatus.
const updateShippingStatus = (req, res) => {
 var form = new multiparty.Form();
   form.parse(req, function(err, data, files) {
	   //console.log('fields value',data.field,data.value)
	   if(data.field[0] =='shippingStatus' && data.value[0] =="4"){
		   Trade.update({ _id:data._id },  { "$set": { "status": 2 } }, { new:true }, (err,result) => {
			  console.log("trad status updated")
		  })
	   }
	   var update={};
		update[data.field[0]]=data.value[0];
		//console.log("update",update)
        Trade.update({ _id:data._id },  { "$set": update}, { new:true }, (err,result) => {
			if(err){
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
				message: httpResponseMessage.CHANGE_STATUS_SUCCESSFULLY,
				result: result
				});
			 }
		   }
	    })
    });

}


/** Author	: KS
 *  Date	: August 07, 2018
 **/
//Function to update the Trades status.
const returnraised = (req, res) => {
	Trade.findById({_id:req.body._id}, (err, result) => {
    if (err) {
      return res.send({
        code: httpResponseCode.BAD_REQUEST,
        message: httpResponseMessage.INTERNAL_SERVER_ERROR
      })
    } else {
      if (!result) {
        res.json({
          message: httpResponseMessage.USER_NOT_FOUND,
          code: httpResponseMessage.BAD_REQUEST
        });
      } else {
		    //Trade.sendReturnStatus = 1
            var notification = new Notification({ notificationTypeId:1,fromUserId:result.receiverId,toUserId:1});
				notification.save(function (err) {
				if(err){
					return res.json({
					  code: httpResponseCode.BAD_REQUEST,
					  message: httpResponseMessage.NOTIFICATION_ERROR
					});
				  }
			});
			return res.json({
				 code: httpResponseCode.EVERYTHING_IS_OK,
                 message: httpResponseMessage.CHANGE_STATUS_SUCCESSFULLY,
                 result: result
           });
        }
     }
  })
}

/* #################  functions related to offers trade write in this block ################### */


/** Auther	: Rajiv kumar
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const offerTrade = (req, res) => {
  const data = req.body;
      let now = new Date();
        OfferTrade.create(req.body, (err, result) => {
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
            result: result
          })
        }
    })
}



/** Auther	: Rajiv kumar
 *  Date	: September 13, 2018
 */
///function to list offer trade in the offerTrade collections
const offerTrades = (req, res) => {
  var perPage = constant.PER_PAGE_RECORD
  var page = req.params.page || 1;
  var token = commonFunction.getToken(req.headers);
   if (token) {
    decoded = jwt.verify(token,settings.secret);
    var userId = decoded._id;
    //~ OfferTrade.find({'ditchCount': {$ne : "4"}}).or([{ 'status':0  }, { 'status': 3 }]).or([{ 'pitchUserId':userId  }, { 'SwitchUserId': userId }])
    
     OfferTrade.find({'status': 0}).or([{ 'pitchUserId':userId  }, { 'SwitchUserId': userId }])
    
    
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({createdAt:-1})
    .populate('pitchUserId')
    .populate('SwitchUserId')
    .populate('SwitchUserProductId')
    .exec(function(err, offerTrades) {
        OfferTrade.count().exec(function(err, count) {
          if (err) return next(err)
            return res.json({
                code: httpResponseCode.EVERYTHING_IS_OK,
                message: httpResponseMessage.SUCCESSFULLY_DONE,
                result: offerTrades,
                currentUser:userId,
                total : count,
                current: page,
                perPage: perPage,
                pages: Math.ceil(count / perPage)
            });
          })
      });
    } else {
      return res.status(403).send({code: 403, message: 'Unauthorized.'});
    }
}


/** Auther	: Rajiv kumar
 *  Date	: September 29, 2018
 */
///function to cancel self offer trade by user offerTrade collections
const cancelOfferTrade = (req, res) => {
  const data = req.body;
      let now = new Date();
        OfferTrade.update({ _id:req.body._id },  { "$set": { "status":"3"} }, { new:true }, (err,result) => {
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
            result: result
          })
        }
    })
}


/** Auther	: Rajiv kumar
 *  Date	: September 29, 2018
 */
///function to ditch requested offer trade collections
const ditchOfferTrade = (req, res) => {
  //console.log("ditchOfferTrade req.body",req.body)
  const data = req.body;
      let now = new Date();
      var status = 2;
      if(req.body.ditchCount == 3 ){
		  var status = 5;
	   }

       OfferTrade.update({ _id:req.body._id },  { "$set": { "status":status,"ditchCount":req.body.ditchCount} }, { new:true }, (err,result) => {

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
            result: result
          })
        }
    })
}


/** Auther	: Rajiv kumar
 *  Date	: September 17, 2018
 */
///function to save switch offer trade in the Trade collections
const switchTrade = (req, res) => {
  const data = req.body;
      let now = new Date();
        Trade.create(req.body, (err, result) => {
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
            result: result
          })
        }
    })
}



/** Auther	: Rajiv kumar
 *  Date	: September 17, 2018
 */
///function to list the switch details collections
const switchTrades = (req, res) => {
  var perPage = constant.PER_PAGE_RECORD
  var page = req.params.page || 1;
  var token = commonFunction.getToken(req.headers);
  if (token) {
         decoded = jwt.verify(token,settings.secret);
         var userId = decoded._id;
         var criteria = {}
          criteria = {'status': 1}
          OfferTrade.distinct('_id',criteria).or([{ 'pitchUserId':userId  }, { 'SwitchUserId': userId }])
          .exec(function(err, switchTradesIds) {
              if (err) return next(err);
              Trade.find({offerTradeId: {$in: switchTradesIds},'status': 1}).populate({path:'offerTradeId',model:'offerTrade',populate:[{path:"pitchUserId",model:"User"},{path:"SwitchUserId",model:"User"},{path:"SwitchUserProductId",model:"Product"}]}).exec(function(err, switchedTrades) {
                  if (err)
                      return next(err)
                      //ok to send the array of mongoose model, will be stringified, each toJSON is called
                      var newSwitchedTrades = [];
                      for(var i in switchedTrades) {
                        //var mycat = Object.assign({}, categories[i]);
                        var mycat = Object.assign({}, switchedTrades[i]);
                        var cat = mycat._doc;
                        cat.trackStatus = 0;
                        cat.messageShow = 0;
                        newSwitchedTrades.push(cat);
                      }

                      return res.json({
						 code: httpResponseCode.EVERYTHING_IS_OK,
						 message: httpResponseMessage.SUCCESSFULLY_DONE,
						 result: newSwitchedTrades,
						 currentUser:userId
                     });
              })
          })
    } else {
       return res.status(403).send({code: 403, message: 'Unauthorized.'});
    }
}



/** Auther	: Rajiv kumar
 *  Date	: September 17, 2018
 */
///function to list the completed pitch details details collections
const completedTrades = (req, res) => {
  var token = commonFunction.getToken(req.headers);
   if (token) {
     decoded = jwt.verify(token,settings.secret);
     var userId = decoded._id;
     var criteria = {}
     var userTrades  = '';
      criteria = {'status': 1}
      OfferTrade.distinct('_id',criteria).or([{ 'pitchUserId':userId  }, { 'SwitchUserId': userId }])
      .exec(function(err, switchTradesIds) {
      //  console.log("switchTradesIds-userId",switchTradesIds,userId)
          if(err) return next(err);
          Trade.find({offerTradeId: {$in: switchTradesIds},'status': 2}).populate({path:'offerTradeId',model:'offerTrade',populate:[{path:"pitchUserId",model:"User"},{path:"SwitchUserId",model:"User"},{path:"SwitchUserProductId",model:"Product"}]}).exec(function(err, switchedTrades) {
              if(err)
                  return next(err)
                  //ok to send the array of mongoose model, will be stringified, each toJSON is called
                  var newCompletedTrades = [];
                  for(var i in switchedTrades) {
                    //var mycat = Object.assign({}, categories[i]);
                    var mycat = Object.assign({}, switchedTrades[i]);
                    var cat = mycat._doc;
                    cat.trackStatus = 0;
                    cat.messageShow = 0;
                    newCompletedTrades.push(cat);
                  }
                  return res.json({
                       code: httpResponseCode.EVERYTHING_IS_OK,
                       message: httpResponseMessage.SUCCESSFULLY_DONE,
                       result: newCompletedTrades,
                       currentUser:userId,
                       userTrades : userTrades
                  });
            })
       })
    } else {
      return res.status(403).send({code: 403, message: 'Unauthorized.'});
    }
}

const completedTrades = (req, res) => {
  var token = commonFunction.getToken(req.headers);
   if (token) {
     decoded = jwt.verify(token,settings.secret);
     var userId = decoded._id;
     var criteria = {}
      criteria = {'status': 1}
      OfferTrade.distinct('_id',criteria).or([{ 'pitchUserId':userId  }, { 'SwitchUserId': userId }])
      .exec(function(err, switchTradesIds) {
          if(err) return next(err);
          Trade.find({offerTradeId: {$in: switchTradesIds},'status': 2}).populate({path:'offerTradeId',model:'offerTrade',populate:[{path:"pitchUserId",model:"User"},{path:"SwitchUserId",model:"User"},{path:"SwitchUserProductId",model:"Product"}]}).exec(function(err, switchedTrades) {
              if(err)
                  return next(err)
                  //ok to send the array of mongoose model, will be stringified, each toJSON is called
                  var newCompletedTrades = [];
                  for(var i in switchedTrades) {
                    //var mycat = Object.assign({}, categories[i]);
                    var mycat = Object.assign({}, switchedTrades[i]);
                    var cat = mycat._doc;
                    cat.trackStatus = 0;
                    cat.messageShow = 0;
                     UserTradeRating.find({'userId':userId}).populate({path:'userId',model:'User').exec(function(err, tradeRating) {
					  if (tradeRating){
					     tradeRatings = tradeRating;    	  
					  } else{
						  var tradeRatings = '';  
					  }
                    
                    newCompletedTrades.push(cat);
                  }
                  return res.json({
                       code: httpResponseCode.EVERYTHING_IS_OK,
                       message: httpResponseMessage.SUCCESSFULLY_DONE,
                       result: newCompletedTrades,
                       currentUser:userId,
                       tradeRatings :tradeRating
                  });
            })
       })
    } else {
      return res.status(403).send({code: 403, message: 'Unauthorized.'});
    }
}


/** Auther	: Rajiv kumar
 *  Date	: September 20, 2018
 */
///function to save new offer trade in the ditchTrades collections
const ditchTrade = (req, res) => {
  const data = req.body;
      let now = new Date();
        OfferTrade.create(req.body, (err, result) => {
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
            result: result
          })
        }
    })
}

/** Auther	: Rajiv kumar
 *  Date	: September 20, 2018
 */
///function to get all ditched trades from the ditchTrades collections
const ditchTrades = (req, res) => {
  var perPage = constant.PER_PAGE_RECORD
  var page = req.params.page || 1;
  var token = commonFunction.getToken(req.headers);
   if (token) {
    decoded = jwt.verify(token,settings.secret);
    var userId = decoded._id;
    //~ OfferTrade.find({'status': {$ne : "0"}}).or([{ 'status':3  }, { 'status': 2 }]).or([{ 'pitchUserId':userId  },{ 'SwitchUserId': userId }])
    //~ .and([
	  //~ { $or: [{ 'pitchUserId':userId  },{ 'SwitchUserId': userId }] }
  //~ ])
    OfferTrade.find(
			{'status': {$ne : "0"},
			 $and: [
				  { $or: [{ 'pitchUserId':userId  },{ 'SwitchUserId': userId }] },
				  { $or: [{ 'status':3  }, { 'status': 2 }]}
				  
			 ]
		 }
    )
    .where('ditchCount').gt(0).lt(4)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort({createdAt:-1})
    .populate('pitchUserId')
    .populate('SwitchUserId')
    .populate('SwitchUserProductId')
    .exec(function(err, offerTrades) {
	  //console.log('offerTrades',offerTrades)
        OfferTrade.count().exec(function(err, count) {
          if (err) return next(err)
            return res.json({
                code: httpResponseCode.EVERYTHING_IS_OK,
                message: httpResponseMessage.SUCCESSFULLY_DONE,
                result: offerTrades,
                currentUser:userId,
                total : count,
                current: page,
                perPage: perPage,
                pages: Math.ceil(count / perPage)
            });
          })
      });
    } else {
      return res.status(403).send({code: 403, message: 'Unauthorized.'});
    }
}

/*################### functions related to tradePitchProduct write in this block ############ */
/** Auther	: Rajiv kumar
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const tradePitchProducts = (req, res) => {
  const data = req.body;
      let now = new Date();
        TradePitchProduct.create(req.body, (err, result) => {
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
            result: result
          })
        }
    })
}
/** Auther	: Rajiv kumar
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const offerTradeProduct = (req, res) => {
	const id =  mongoose.mongo.ObjectId(req.params.id);
	  // TradePitchProduct.find({})
      TradePitchProduct.find({offerTradeId:req.params.id})
        .populate({path:'products',model:'Product',populate:[{path:"productCategory",model:"Category"}]})
         .exec(function(err, offerTradeProduct) {
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
            result: offerTradeProduct
          })
        }
    })
}
/** Auther	: KS
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const tradingProduct = (req, res) => {
  const id =  mongoose.mongo.ObjectId(req.params.id);
  	 var result = [];
        TradePitchProduct.findOne({offerTradeId:id})
         .populate({path:'products',model:'Product',populate:[{path:"productCategory",model:"Category"}]})
         .sort({_id:-1})
         .limit(1)
         .exec(function(err, result){			 
		     if (err) {
					return res.send({
					code: httpResponseCode.BAD_REQUEST,
					message: httpResponseMessage.INTERNAL_SERVER_ERROR
					})
				} else {
				if (!result) {
					res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
					});
				} else {
					return res.json({
					code: httpResponseCode.EVERYTHING_IS_OK,
					result: result
					});
				}
			}
    })
}




/** Auther	: KS
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const getAllProduct = (req, res) => {
	var token = commonFunction.getToken(req.headers);
     if(token) {
		decoded = jwt.verify(token,settings.secret);
		var userId = decoded._id;
		Product.find({userId:userId,productStatus:1})
		.populate('userId')
		.populate('userId',['firstName','lastName'])
		.populate('productCategory',['title'])
		.populate('brand',['brandName'])
		.populate('size',['size'])
		.exec(function(err, productData){
		if (err) {
			return res.send({
			code: httpResponseCode.BAD_REQUEST,
			message: httpResponseMessage.INTERNAL_SERVER_ERROR
			})
		} else {
			if (!productData) {
			res.json({
				message: httpResponseMessage.USER_NOT_FOUND,
				code: httpResponseMessage.BAD_REQUEST
			});
			} else {
				return res.json({
				code: httpResponseCode.EVERYTHING_IS_OK,
				result: productData
				});
			}
		}
		});
	 }
}
/** Auther	: KS
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const getProductByCategory = (req, res) => {
	const id = req.params.id;
	var token = commonFunction.getToken(req.headers);
     if(token) {
		decoded = jwt.verify(token,settings.secret);
		var userId = decoded._id;
		Product.find({productCategory:id,userId:userId})
		.populate('userId')
		.populate('userId',['firstName','lastName'])
		.populate('productCategory',['title'])
		.populate('brand',['brandName'])
		.populate('size',['size'])
	    .exec(function(err,productData){
			if (err) {
			 return res.send({
				code: httpResponseCode.BAD_REQUEST,
				message: httpResponseMessage.INTERNAL_SERVER_ERROR
			 })
			} else {
			if (!productData) {
				res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
				});
			} else {
			 return res.json({
				code: httpResponseCode.EVERYTHING_IS_OK,
				result: productData
			  });
			}
		  }
	    });
	 }
}
/** Auther	: KS
 *  Date	: July 2, 2018
 */

const submitPitchProduct = (req, res) => {
	var form = new multiparty.Form();
	  form.parse(req, function(err, data, files) {
		const sentences = data;
		var token = commonFunction.getToken(req.headers);
		const dataTrade = {};
		const pitchTradepro = {};
		if(token){
		   decoded = jwt.verify(token,settings.secret);
		   var userId = decoded._id;
		}
		Product.findById({_id:data.switchProId})
		  .exec(function(err,result){
				dataTrade.ditchCount = 0;
				dataTrade.status = 0;
				dataTrade.pitchUserId = userId;
				dataTrade.SwitchUserId = result.userId
				dataTrade.SwitchUserProductId = data.switchProId;
				OfferTrade.create(dataTrade, (err,offerResult) => {
				     pitchTradepro.offerTradeId = offerResult._id;
					 pitchTradepro.status = 0;
					 var proIDS = data.productIDS;
					 var myArray = proIDS[0].split(',');
					 pitchTradepro.products = myArray;
			         TradePitchProduct.create(pitchTradepro,(err,pitchResult) => {
						if(err){
								return res.json({
								  message: httpResponseMessage.USER_NOT_FOUND,
								  code: httpResponseMessage.BAD_REQUEST
								});
							}
							return res.json({
								code: httpResponseCode.EVERYTHING_IS_OK,
								message: httpResponseMessage.SUCCESSFULLY_DONE,
								result: offerResult
							});
					  })
				 })

		   });

	});
}

/** Auther	: KS
 *  Date	: July 2, 2018
 */

const submitTradeProduct = (req, res) => {
	var form = new multiparty.Form();
	  form.parse(req, function(err, data, files) {
		const dataTrade = {};
		dataTrade.offerTradeId = data.offerTradeId;
		dataTrade.tradePitchProductId = data.tradePitchProductId;
		dataTrade.tradeSwitchProductId = data.tradeSwitchProductId;
		dataTrade.switchDate = data.switchDate;
		dataTrade.status = 2;
		Trade.create(dataTrade, (err,offerResult) => {
		if(err){
			return res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
			   });
		    }
			 OfferTrade.update({ _id:data.offerTradeId },{ "$set": { "status": 1 } }, { new:true }, (err,statusUpdate) => {
			   if(err){
					return res.send({
						code: httpResponseCode.BAD_REQUEST,
						message: httpResponseMessage.FILE_UPLOAD_ERROR
					});
				} else {
				    OfferTrade.findOne({_id:data.offerTradeId})
					.populate('pitchUserId')
					.populate('SwitchUserId')
					.populate('SwitchUserProductId')
					.exec(function(err, offerTrades) {
						
						var pitchUserEmail = offerTrades.pitchUserId.email;				
						var SwitchUserEmail = offerTrades.SwitchUserId.email;
										
					 let transporter = nodemailer.createTransport({
						  host: constant.SMTP_HOST,
						  port: constant.SMTP_PORT,
						  secure: false, 
						  auth: {
							user: constant.SMTP_USERNAME, 
							pass: constant.SMTP_PASSWORD 
						  }
						});
					   const outputPitchUser =` <table width="100%" cellpadding="0" cellspacing="0" align="center" style="background-color: #efefef;">
						<tr>
							<td style="text-align:center">
								<table width="600" cellpadding="0" cellspacing="0" align="center"  style="text-align:left">
								<tr>
								 <td>
								<img src="%PUBLIC_URL%/emailer-header.png" alt="PitchAndSwitch" style="display:block;" />
								</td>
								</tr>
								
								<tr>
								<td style="padding:40px; background-color: #ffffff;">
								<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
								
								<td style="padding:0 0 36px">
								<h3 style="color: #d0a518;font-size: 22px;font-weight: 400; font-family: Arial; margin: 0; padding:0">Hello `+offerTrades.pitchUserId.userName.toUpperCase()+`,</h3>
								</td>
								</tr>
								<tr>
								<td style="padding:0 0 36px">
								<p style="color: #414141;font-size: 18px;font-weight: 400; font-family: Arial; margin: 0; padding:0">One pitch has been confirmed.</p>
								<p>Product name :+offerTrades.SwitchUserProductId.productName</p>
								</td>
								</tr>
								<tr>
								<td style="padding:0 0 34px">
								  Pitch Confirmed User Details :
								  <p>offerTrades.SwitchUserId.userName</p>
								  <p>offerTrades.SwitchUserId.email</p>
								  <p>offerTrades.SwitchUserId.address+','+offerTrades.SwitchUserId.address</p>
								</td>
								</tr>
								<tr>
								<td style="padding:0 0 55px">
								<p style="color: #414141;font-size: 18px;font-weight: 400; font-family: Arial; margin: 0; padding:0">Thank you,<br/> Team Pitch and Switch</p>
								</td>
								</tr>
								<tr><td style="padding:0">&nbsp;</td></tr>
								</table>
								</td>
								</tr>
								</table>
							</td>
						</tr>
					</table>`;
					 const outputSwitchUser =` <table width="100%" cellpadding="0" cellspacing="0" align="center" style="background-color: #efefef;">
						<tr>
							<td style="text-align:center">
								<table width="600" cellpadding="0" cellspacing="0" align="center"  style="text-align:left">
								<tr>
								 <td>
								<img src="%PUBLIC_URL%/emailer-header.png" alt="PitchAndSwitch" style="display:block;" />
								</td>
								</tr>
								
								<tr>
								<td style="padding:40px; background-color: #ffffff;">
								<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
								
								<td style="padding:0 0 36px">
								<h3 style="color: #d0a518;font-size: 22px;font-weight: 400; font-family: Arial; margin: 0; padding:0">Hello `+offerTrades.SwitchUserId.userName.toUpperCase()+`,</h3>
								</td>
								</tr>
								<tr>
								<td style="padding:0 0 36px">
								<p style="color: #414141;font-size: 18px;font-weight: 400; font-family: Arial; margin: 0; padding:0">One pitch has been confirmed.</p>
								<p>Product name :+offerTrades.SwitchUserProductId.productName</p>
								</td>
								</tr>
								<tr>
								<td style="padding:0 0 34px">
								  Pitch Confirmed User Details :
								  <p>offerTrades.pitchUserId.userName</p>
								  <p>offerTrades.pitchUserId.email</p>
								  <p>offerTrades.pitchUserId.address+','+offerTrades.pitchUserId.address</p>
								</td>
								</tr>
								<tr>
								<td style="padding:0 0 55px">
								<p style="color: #414141;font-size: 18px;font-weight: 400; font-family: Arial; margin: 0; padding:0">Thank you,<br/> Team Pitch and Switch</p>
								</td>
								</tr>
								<tr><td style="padding:0">&nbsp;</td></tr>
								</table>
								</td>
								</tr>
								</table>
							</td>
						</tr>
					</table>`;

					
					let mailOptions1 = {
					  from: constant.SMTP_FROM_EMAIL, 
					  to: SwitchUserEmail, 
					  subject: 'Meeting Confirmation',
					  text: 'Meeting Confirmation', 
					  html : outputSwitchUser
					};

					transporter.sendMail(mailOptions1, (error, info) => {						
					  if (error) {
						return console.log(error);
					  }       
					 });
					 return res.send({
						code: httpResponseCode.EVERYTHING_IS_OK,
						message: httpResponseMessage.SUCCESSFULLY_DONE,
						result: statusUpdate
				      }); 
					 
				  });					
					
			   }
		    })
		})
	});
}


/** Auther	: Rajiv Kumar
 *  Date	: October 23, 2018
 *	Description : Function to wsitch offer trade
**/
const switchedTrades = (req,res) => {
	var perPage = constant.PER_PAGE_RECORD
	var page = req.params.page || 1;
		Trade.find({})
	    .populate({ path: "tradePitchProductId",populate:{path:"productCategory"}})
	    .populate({ path: "tradeSwitchProductId", model: "Product",populate:{path:"productCategory"}})
	    .populate({ path: "productImages", model: "Product"})
	    .populate({ path: "offerTradeId",populate:(["pitchUserId","SwitchUserId"]), model: "offerTrade"})
	    .skip((perPage * page) - perPage)
		.limit(perPage)
		.sort({createdAt:-1})
	    .exec(function(err,result){
			if (err) {
			 return res.send({
				code: httpResponseCode.BAD_REQUEST,
				message: httpResponseMessage.INTERNAL_SERVER_ERROR
			 })
			} else {
			if (!result) {
				res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
				});
			} else {
			 return res.json({
				code: httpResponseCode.EVERYTHING_IS_OK,
				result: result,
				currentUser:'0',
                total : 10,
                current: page,
                perPage: perPage,
                pages: Math.ceil(10 / perPage)
			  });
			}
		 }
	 });
}

/** Auther	: KS
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const pitchedProductList = (req, res) => {
  const id =  mongoose.mongo.ObjectId(req.params.id);
	 var result = [];
        TradePitchProduct.findOne({offerTradeId:id})
         .populate({path:'products',model:'Product',populate:[{path:"productCategory",model:"Category"}]})
         .sort({_id:-1})
         .limit(1)
         .exec(function(err, result){
			        //console.log('result',result);
		     if (err) {
					return res.send({
					code: httpResponseCode.BAD_REQUEST,
					message: httpResponseMessage.INTERNAL_SERVER_ERROR
					})
				} else {
				if (!result) {
					res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
					});
				} else {
					return res.json({
					code: httpResponseCode.EVERYTHING_IS_OK,
					result: result
					});
				}
			}
    })
}
/** Auther	: KS
 *  Date	: September 13, 2018
 */
///function to save new offer trade in the offerTrade collections
const submitReview = (req, res) => {
   var form = new multiparty.Form();
	form.parse(req, function(err, data, files) {
	     UserTradeRating.create(data, (err, result) => {
			 if (err) {
					return res.send({
					code: httpResponseCode.BAD_REQUEST,
					message: httpResponseMessage.INTERNAL_SERVER_ERROR
					})
				} else {
				if (!result) {
					res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
					});
				} else {
					return res.json({
					code: httpResponseCode.EVERYTHING_IS_OK,
					result: result
					});
				  }
			  }
          })
     })
}

/** Auther	: KS
 *  Date	: September 13, 2018
 */

///function to save new offer trade in the offerTrade collections
const returnTrade = (req, res) => {
   var form = new multiparty.Form();
	form.parse(req, function(err, data, files) {
		TradeReturn.create(data, (err, result) => {
			if (err) {
					return res.send({
					code: httpResponseCode.BAD_REQUEST,
					message: httpResponseMessage.INTERNAL_SERVER_ERROR
					})
				} else {
				if (!result) {
					res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
					});
				} else {
					return res.json({
					code: httpResponseCode.EVERYTHING_IS_OK,
					result: result
					});
				 }
			  }
          })
     });
}

/** Auther	: KS
 *  Date	: September 13, 2018
 */
///function to save return trade feedback from user side.
// const switchedProduct = (req, res) => {
//  const id =  mongoose.mongo.ObjectId(req.params.id);
// 	 //var result = [];
//         Trade.findOne({_id:id})
//         .populate({path:'tradePitchProductId',model:'Product',populate:[{path:"userId",model:"User"}]})
//         //.populate({path:'userId',model:'User'})
//          .exec(function(err, tradeProresult){
			 //console.log('rrrrllllllllllllllllllllllllll',tradeProresult)
const switchedProduct = (req, res) => {
 const id =  mongoose.mongo.ObjectId(req.params.id);
     TradePitchProduct.find({offerTradeId:id}).select('_id')
         .populate({path:'products',model:'Product',populate:[{path:"productCategory",model:"Category"}]})
         .exec(function(err, result){
		     if (err) {
					return res.send({
					code: httpResponseCode.BAD_REQUEST,
					message: httpResponseMessage.INTERNAL_SERVER_ERROR
					})
				} else {
				if (!result) {
					res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
					});
				} else {
				   return res.json({
					 code: httpResponseCode.EVERYTHING_IS_OK,
					 result: result
				   });
			}
		     }
    })
}

/** Auther	: KS
 *  Date	: July 2, 2018
 */

const submitPitchAgain = (req, res) => {
	var form = new multiparty.Form();
	  form.parse(req, function(err, data, files) {
		 const pitchTradepro = {};
		 pitchTradepro.offerTradeId = data.offerTradeId;
		 pitchTradepro.status = 0;
		 var proIDS = data.productIDS;
		 var myArray = proIDS[0].split(',');
		 pitchTradepro.products = myArray;
		 TradePitchProduct.create(pitchTradepro, (err,offerResult) => {
		 if(err){
			return res.json({
					message: httpResponseMessage.USER_NOT_FOUND,
					code: httpResponseMessage.BAD_REQUEST
			   });
		    }
			 OfferTrade.update({ _id:data.offerTradeId }, { "$set": { "status": 0 } }, { new:true }, (err,statusUpdate) => {
			   if(err){
					return res.send({
						code: httpResponseCode.BAD_REQUEST,
						message: httpResponseMessage.FILE_UPLOAD_ERROR
					});
				} else {
					return res.send({
						code: httpResponseCode.EVERYTHING_IS_OK,
						message: httpResponseMessage.SUCCESSFULLY_DONE,
						result: statusUpdate
				  });
			   }
		    })
		})
	});
}

/** Auther	: Rajiv kumar
 *  Date	: Oct 28, 2018
 */
/// function to list all status
const tradeStatus = (req, res) => {
	resultAdd = constant.tradeStatus;
	return res.json({
		code: httpResponseCode.EVERYTHING_IS_OK,
		message: httpResponseMessage.SUCCESSFULLY_DONE,
		result: resultAdd
	});
}
/** Auther	: Rajiv kumar
 *  Date	: November 17, 2018
 */
/// function to get the trade product shipping cost
const getShippingCost = (req, res) => {
	//console.log("getShippingCost param",req.params.tradeid,req.params.productid)	
	Product.find({_id:req.params.productid}).then( product => {
		//console.log("product",product)
		 OfferTrade.find({_id:req.params.tradeid})		
		.populate({path:'pitchUserId',model:'User',populate:[{path:"city",model:"City"},{path:"state",model:"State"},{	path:"country",model:"Country"}]})		
		.populate({path:'SwitchUserId',model:'User',populate:[{path:"city",model:"City"},{path:"state",model:"State"},{path:"country",model:"Country"}]})		
		.exec(function(err,result){			
			const parcelAttribute = easyPostComponent.createParcel(product[0]);
			const toAddressAttribute = easyPostComponent.createAddress(result[0].pitchUserId);
			const fromAddressAttribute = easyPostComponent.createAddress(result[0].SwitchUserId);
			//console.log("parcelAttribute",parcelAttribute);
			//console.log("toAddressAttribute",toAddressAttribute);
			//console.log("fromAddressAttribute",fromAddressAttribute);
			const shipment = easyPostComponent.createShipment(toAddressAttribute,fromAddressAttribute,parcelAttribute);
				shipment.then(resultShippment => {					
					return res.json({
						code: httpResponseCode.EVERYTHING_IS_OK,
						message: httpResponseMessage.SUCCESSFULLY_DONE,
						result: resultShippment.rates
					});					
			})
			.catch((error) => {
				return res.json({
						code: httpResponseCode.BAD_REQUEST,
						message: httpResponseMessage.INTERNAL_SERVER_ERROR,
						result: error
					});
				//console.log("ErrorInShipment",error)
			});			
		})
	});
}


/** Auther	: Rajiv Kumar
 *  Date	: November 24, 2018
 *	Description : Function to pay the shipment cost beforw switch the product
 **/
const payShipment = (req, res) => {
  console.log("payOnStripe", req.body); 
  stripe.customers.create({
      email: req.body.userEmail,
      source: {
        object: 'card',
        exp_month: req.body.expiryMonth,
        exp_year: req.body.expiryYear,
        number: req.body.cardNumber,
        cvc: req.body.cardCVV
      }
    }).then(function(customer) {
      //console.log("customer",customer)
      return stripe.charges.create({
        amount: req.body.amount*100,
        currency: 'usd',
        customer: customer.id
      });
    }).then(function(charge) {
     //console.log("charge",charge); return;       
	// const shipment = easyPostComponent.retrieveShipment(req.body.shipmentId);
	Promise.all([
	   easyPostComponent.retrieveShipment(req.body.shipmentId)	   
	]).then((shipment) => {	
	//console.log("req.body.shipmentTypeId",req.body.shipmentTypeId)
	//console.log("shipment",shipment[0].lowestRate(['USPS'], ['First']))
	shipment[0].buy(req.body.shipmentTypeId).then(shippingRateResp => {
		//console.log("shippingRateResp",shippingRateResp); return;
			  let data = {}
			  data.userId = req.body.userId
			  data.status = 1
			  data.transactionId = charge.id
			  data.transactionStatus = (charge.status === 'succeeded')?1:0
			  data.transactionResponceMessage = charge.status
			  data.transactionAmount = (charge.amount/100)
			  data.addonId =req.body.planTypeId
			  data.userSubscriptionId =req.body.planTypeId	
			  data.pitchUserPaymentStatus =0	
			  data.pitchUserPaymentStatus =1
			  data.shippingStatus = 1
			  data.offerTradeId = req.body.tradeId
			  data.tradePitchProductId = req.body.pitchProductId
			  data.tradeSwitchProductId = req.body.switchProductId
			  query = new Trade(data);
				//console.log("query",query) 
				//Saving it to the database.    
			  query.save(function (err, responceData){		  
				if(err){
				  return res.send({
					code: httpResponseCode.BAD_REQUEST,
					message: httpResponseMessage.INTERNAL_SERVER_ERROR
				  });
				}else{
					
					//update product and offerTrade status					
					console.log("responceData",responceData) ; 
					let TransactionData = {};
						TransactionData.transactionId = charge.id
						TransactionData.transactionType = 'Shipment'										
						TransactionData.userId = req.body.userId
						TransactionData.paymentId = charge.id
						TransactionData.transactionAmount = (charge.amount/100)
						TransactionData.status = (charge.status === 'succeeded')?1:0
						TransactionData.transactionDate = new Date();
						Transaction.create(TransactionData, (err, transactionResp) => {
							console.log("transactionResp",transactionResp)
						});	
						let shippingData = {}
						shippingData.TradeId = 	responceData._id				
						shippingData.comments = "Processed"
						shippingData.status = 1
						shippingDatatrackingCode = shippingRateResp.tracking_code
						if(req.body.type ==='Switch'){
						    shippingData.switchUserId = req.body.userId
							shippingQuery = new SwitchProductShipping(shippingData);
						}else{
							 shippingData.pitchUserId = req.body.userId 
							 shippingQuery = new PitchProductShipping(shippingData);
						}
						shippingQuery.save().then( shippingResult =>{							
							console.log("shippingResult",shippingResult)
							OfferTrade.update({ _id:req.body.tradeId },{ "$set": { "status": 0 } }, { new:true }, (err,statusUpdate) => {
								console.log("Trade Update as Switched",req.body.tradeId)						  
							});							
							var criteria = {
							 _id:{ $in:  [req.body.pitchProductId,req.body.switchProductId]}
							};							
							Product.update(criteria,{ "$set": { "productStatus": 2 } }, { multi: true }, (err,productUpdate) => {
								console.log("product Updated as Switched",productUpdate,criteria)						  
							});						
						});
						
						Promise.all([
								 Product.find({_id:req.body.pitchProductId})
									.populate('userId', ['firstName', 'lastName', 'profilePic','userName'])
									.populate('productCategory', ['title']),								
								Product.find({_id:req.body.switchProductId})
									.populate('userId', ['firstName', 'lastName', 'profilePic','userName'])
									.populate('productCategory', ['title'])									
							]).then((products) => {
								let productSwitch  = products[0];
								let productPitch  = products[1];							
								
							// console.log("productPitch",productPitch[0].userId.)						
							// setup email data with unicode symbols
							commonFunction.readHTMLFile('src/views/emailTemplate/switchUserConfirmationEmail.html', function(err, html) {
							  var template = handlebars.compile(html);
							  var replacements = {
								   trnxId:charge.id,
								   switchProduct:productSwitch[0].productName,
								   pitchProduct:productPitch[0].productName,
								   pitchUser:productPitch[0].userId,
								   switchUser:productSwitch[0].userId
							  };
							  var htmlToSend = template(replacements);
							  let mailOptions = {
								from: constant.SMTP_FROM_EMAIL, // sender address
								to: req.body.userEmail+',rajiv.kumar@newmediaguru.net', // list of receivers
								subject: 'Switch successfully ✔', // Subject line
								html : htmlToSend
							  };
							  commonFunction.transporter.sendMail(mailOptions, function (error, response) {
								  if (error) {
									  console.log(error);
								  }else{
									console.log('Message sent: %s', info.messageId);
												// Preview only available when sending through an Ethereal account
												console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
								  }
							  });
							})
												
							if(req.body.type === 'Switch'){ 
								 console.log("req.body.type",req.body.type)
								// setup email data with unicode symbols
								commonFunction.readHTMLFile('src/views/emailTemplate/pitchUserConfirmationEmail.html', function(err, html) {
								  var template = handlebars.compile(html);
								  var replacements = {
									   trnxId:charge.id,
									   switchProduct:productSwitch[0].productName,
									   pitchProduct:productPitch[0].productName,
									   pitchUser:productPitch[0].userId,
									   switchUser:productSwitch[0].userId
								  };
								  var htmlToSend = template(replacements);
								  let mailOptions = {
									from: constant.SMTP_FROM_EMAIL, // sender address
									to: req.body.userEmail+',rajiv.kumar@newmediaguru.net', // list of receivers
									subject: 'Switched Product  ✔', // Subject line
									html : htmlToSend
								  };
								  commonFunction.transporter.sendMail(mailOptions, function (error, response) {
									  if (error) {
										  console.log(error);
									  }else{
										console.log('Message sent: %s', info.messageId);
													// Preview only available when sending through an Ethereal account
													console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
									  }
								  });
								})
							}
					})	
							
						
						
						
					return res.json({
						code: httpResponseCode.EVERYTHING_IS_OK,
						message: httpResponseMessage.CHANGE_STATUS_SUCCESSFULLY,
					   result: responceData
					  });
				  }
			})
	})
	.catch(function(errorInBuy) {
		console.log("error buy",errorInBuy);
	});
})
.catch(function(error) {
  console.log("error",error);
});		
    

}).catch(function(err) {
  // Deal with an error
  return res.json({
      code: httpResponseCode.BAD_REQUEST,
      message: err,
     result: err
    });
});
}

module.exports = {
  listTrades,
  newTrades,
  viewTrades,
  updateStatus,
  returnraised,
  offerTrade,
  offerTrades,
  tradePitchProducts,
  switchTrade,
  switchTrades,
  completedTrades,
  ditchTrade,
  ditchTrades,
  cancelOfferTrade,
  ditchOfferTrade,
  offerTradeProduct,
  tradingProduct,
  getAllProduct,
  getProductByCategory,
  submitPitchProduct,
  switchedTrades,
  submitTradeProduct,
  pitchedProductList,
  submitReview,
  returnTrade,
  switchedProduct,
  submitPitchAgain,
  tradeStatus,
  updateShippingStatus,
  getShippingCost,
  payShipment
  
}
