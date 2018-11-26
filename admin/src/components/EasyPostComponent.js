const Easypost = require('@easypost/api');
const constant = require("../../common/constant");
const api = new Easypost(constant.EasyPostApiKey);

/**
*function createShipment to create a shipment
*@param toAddress : the address infromation of the user who is receiving the consignment
*@param fromAddress : the address infromation of the user who is sending the consignment
*toAddress & fromAddress example
*{
    "city": "Redondo Beach",
    "company": null,
    "country": "US",
    //"created_at": "2013-11-08T15:49:58Z",
    "email": "dr_steve_brule@gmail.com",
    //"id": "adr_EyDCpoii",
    "mode": "test",
    "name": "Dr. Steve Brule",
    "object": "Address",
    "phone": null,
    "state": "CA",
    "street1": "179 N Harbor Dr",
    "street2": null,
    //"updated_at": "2013-11-08T15:49:58Z",
    "zip": "90277"
  }
*@param parcel  : the parcel information in the format
*{
    //"id": "prcl_SI55pjx8",
    //"object": "Parcel",
    "length": 20.2,
    "width": 10.9,
    "height": 5.0,
    //"predefined_package": null,
    "weight": 140.8,
    //"created_at": "2013-04-22T05:39:57Z",
    //"updated_at": "2013-04-22T05:39:57Z"
}
*
*@returns the information as written below:
*
{
  "id": "shp_vN9h7XLn",
  "object": "Shipment",
  "mode": "test",
  "options": {"address_validation_level": "0"},
  "to_address": {
    "city": "Redondo Beach",
    "company": null,
    "country": "US",
    "created_at": "2013-11-08T15:49:58Z",
    "email": "dr_steve_brule@gmail.com",
    "id": "adr_EyDCpoii",
    "mode": "test",
    "name": "Dr. Steve Brule",
    "object": "Address",
    "phone": null,
    "state": "CA",
    "street1": "179 N Harbor Dr",
    "street2": null,
    "updated_at": "2013-11-08T15:49:58Z",
    "zip": "90277"
  },
  "from_address": {
    "city": "San Francisco",
    "company": null,
    "country": "US",
    "created_at": "2013-11-08T15:49:59Z",
    "email": null,
    "id": "adr_faGeob9S",
    "mode": "test",
    "name": "EasyPost",
    "object": "Address",
    "phone": "415-379-7678",
    "state": "CA",
    "street1": "417 Montgomery Street",
    "street2": "5th Floor",
    "updated_at": "2013-11-08T15:49:59Z",
    "zip": "94104"
  },
  "parcel": {
    "id": "prcl_SI55pjx8",
    "object": "Parcel",
    "length": 20.2,
    "width": 10.9,
    "height": 5.0,
    "predefined_package": null,
    "weight": 140.8,
    "created_at": "2013-04-22T05:39:57Z",
    "updated_at": "2013-04-22T05:39:57Z"
  },
  "customs_info": {
    "id": "cstinfo_iNAizey5",
    "object": "CustomsInfo",
    "created_at": "2013-04-22T05:39:57Z",
    "updated_at": "2013-04-22T05:39:57Z",
    "contents_explanation": null,
    "contents_type": "merchandise",
    "customs_certify": false,
    "customs_signer": null,
    "eel_pfc": null,
    "non_delivery_option": "return",
    "restriction_comments": null,
    "restriction_type": "none",
    "customs_items": [
      {
        "id": "cstitem_9eDIbaDR",
        "object": "CustomsItem",
        "description": "Many, many EasyPost stickers.",
        "hs_tariff_number": "123456",
        "origin_country": "US",
        "quantity": 1,
        "value": 879,
        "weight": 140,
        "created_at": "2013-04-22T05:39:57Z",
        "updated_at": "2013-04-22T05:39:57Z"
      }
    ]
  },
  "rates": [
    {
      "id": "rate_nyCb6ubX",
      "object": "Rate",
      "service": "FirstClassPackageInternationalService",
      "rate": "9.50",
      "carrier": "USPS",
      "shipment_id": "shp_vN9h7XLn",
      "delivery_days": 4,
      "delivery_date": "2013-04-26T05:40:57Z",
      "delivery_date_guaranteed": false,
      "created_at": "2013-04-22T05:40:57Z",
      "updated_at": "2013-04-22T05:40:57Z"
    }
    ...
  ],
  "scan_form": null,
  "selected_rate": null,
  "postage_label": null,
  "tracking_code": null,
  "refund_status": null,
  "insurance": null,
  "created_at": "2013-04-22T05:40:57Z",
  "updated_at": "2013-04-22T05:40:57Z"
}
*/

/***
//function to create Form & To Address for the parcel 
//toAddress & fromAddress example
createAddress = (address) => {
	return  new api.Address({
		"city": "Rajiv",
		"company": null,
		"country": "US",		
		"email": "rajiv.kumar@nmgtechnologies.com",
		"mode": "test",
		"name": "Dr. Steve Brule",
		"object": "Address",
		"phone": null,
		"state": "CA",
		"street1": "179 N Harbor Dr",
		"street2": null,
		//"updated_at": "2013-11-08T15:49:58Z",
		"zip": "90277"
	});
}
 
//Function createParcel to Create parcel a new parcel for shippment
createParcel = (length,width, height,weight) => {
	return new api.Parcel({
	  length:length,
	  width: width,
	  height:height,
	  weight:weight
	});
}
***/

//function to create Form & To Address for the parcel 
//toAddress & fromAddress example
createAddress = (user) => {		
	return ({
		"city": (user.city && user.city.cityName)?user.city.cityName:null,
		"company": null,
		"country": (user.country && user.country.countryCode)?user.country.countryCode:'US',		
		"email": (user.email && user.email !='')?user.email:null,
		"mode": "test",
		"name": (user.firstName && user.firstName !='')?user.firstName:null +' '+(user.lastName && user.lastName !='')?user.lastName:null,
		"object": "Address",		
		"phone": (user.phoneNumber && user.phoneNumber !='')?user.phoneNumber:null,
		"state": (user.state && user.state.stateName)?user.state.stateName:null,
		"street1": (user.address && user.address !='')?user.address:null,
		"street2": null,
		//"updated_at": "2013-11-08T15:49:58Z",
		"zip": (user.zipCode && user.zipCode !='')?user.zipCode:null
	});
}

//Function createParcel to Create parcel a new parcel for shippment from product
createParcel = (product) => {	
	return ({
		"length":(product.length)?parseInt(product.length):0,
		"width": (product.width)?parseInt(product.width):0,
		"height":(product.height)?parseInt(product.height):0,
		"weight":(product.weight !== null && product.weight !== '0')?product.weight:1
	});
};





//Function createShippment is to  create the new shippment in between address for the give n parcel
createShipment = (toAddr,fromAddr, prcel) => {
  const toAddress = new api.Address(toAddr);
  const fromAddress = new api.Address(fromAddr);
  const parcel = new api.Parcel(prcel);
  return new api.Shipment({
    parcel,
    to_address: toAddress,
    from_address: fromAddress,
    options: {
      address_validation_level: 0
    }
  }).save();
  
}

/**
*function refundShipment to refund a shipment
*
*/
refundShipment = (shipmentId) => {
  return api.Shipment.retrieve(shipmentId).then(s => {
    s.refund();//.then(() => console.log(s));
  });
}

// function to retrive the shippment
retrieveShipment = (shippmentId) => {
	console.log("shippmentId",shippmentId);
	return api.Shipment.retrieve(shippmentId).then(shipmentObj => {
		//console.log("shipmentObj",shipmentObj)	;
		return shipmentObj;
	});
    //return api.shipment.retrieve(shippmentId);
}



module.exports = {
	createParcel,
	createAddress,	
	createShipment,
	refundShipment,
	retrieveShipment
};
