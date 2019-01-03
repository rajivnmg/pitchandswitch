var fs = require("fs");
//function to get the actual distance between two points
const distance = function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  //var radlon1 = Math.PI * lon1/180
  //var radlon2 = Math.PI * lon2/180
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === "K") {
    dist = dist * 1.609344;
  }
  if (unit === "N") {
    dist = dist * 0.8684;
  }
  return dist.toFixed(2);
};


//function to Capitalize the first letter of the string
const letterCaps = (str) =>  {
 if (typeof str !== 'string' || str === null || str === '') return '';
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

// function to check file exist
const fsExistsSync = (file)=>{
  try {
    fs.accessSync(file);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
	distance,
	letterCaps,
	fsExistsSync
}
