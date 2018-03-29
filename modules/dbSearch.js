const mongoose = require('mongoose');
const urlData = require('../modules/models/urlSchema.js')
//const urlDb = dbData.db('usms').collection('urls');

module.exports = function(key, value){
	console.log("Starting dbSearch key is: "+key+", value is: "+value);
	seachObj = {};
	seachObj[key] = value;

	urlData.findOne(seachObj, (err, url)=>{
		if(err){ console.log("An error occoured while trying to search the database "+err.message); }
		console.log("returning url: "+url);
		return url
	});

}