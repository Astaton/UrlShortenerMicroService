module.exports = function(dbUrl, longUrl) {

console.log("Starting dbCheck");
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(dbUrl, (err, dbData)=>{
	if(err){
		console.error(err.message);
		return
	}else{
		const urlDB = dbData.db('usms').collection('urls');
		urlDB.find({"longUrl": longUrl}).project({"longUrl": 0, "_id": 0}).toArray((err, record)=>{
			if(err){
				console.error("Error retrieving record from "+err.message);
				return
			} else{
				console.log("finishing dbCheck");
				return record
			}
		});
	}
});
}