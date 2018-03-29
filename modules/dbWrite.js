const mongoose = require('mongoose');
const urlData = require('./models/urlSchema.js');
//const urlDb = dbData.db('usms').collection('urls');

module.exports = function(key, value){


//const MongoClient = require('mongodb').MongoClient;

console.log("Starting dbWrite");

urls.findOne({key: value}, (err, url)=>{

});

// var url = new urlData({
// 			longUrl: "http://www.google.com",
// 			shorturl: "https://usms.herokuapp.com/"
// 		});
// 		url.save().then(()=>{
// 			console.log("Finishing dbWrite");
// 			//done();
// 		});	

//MongoClient.connect(dbUrl, (err, dbData)=>{	
		// }catch(err)
		// 	console.error("Error updating urlCount "+err.message);	
	// if(err){
	// 	console.error("Error reaching the Mongo Database "+ err.message);
	// }else{
	// 	const urlDb = dbData.db('usms').collection('urls');
	// 	try{
	// 		console.log("Starting urlCounter update");
	// 		const count = urlDb.findAndModify({
	// 			query: {"name": "urlCounter"},
	// 			update: {$inc: {"urlCount": 1}},
	// 			upsert: true,
	// 			new: true
	// 		});
	// 		console.log("count is set to "+count.urlCount);
	// 	}catch(err){
	// 		console.error("Error updating urlCount "+err.message);
	// 	}
	// 	try{
	// 		urlDb.insertOne({"longUrl": longUrl, "shortUrl": "https://usms.herokuapp.com/"+count.urlCount});
	// 		console.log("Finishing dbWrite");
	// 		return "https://usms.herokuapp.com/"+count.urlCount;
	// 	}catch(err){
	// 		console.error("Error adding entry to Database "+err.message);
	// 	}
	// }
// });	
}