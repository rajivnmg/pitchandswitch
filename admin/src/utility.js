//function to Capitalize the first letter of the string
const letterCaps = (str) =>  {  
 if (typeof str !== 'string' || str === null || str === '') return ''; 
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

module.exports = {
	letterCaps
}
