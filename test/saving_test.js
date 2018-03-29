const assert = require('assert');
const urlData = require('../modules/models/urlSchema.js');

//Describe tests
describe("Saving records", ()=>{
	//Create tests

	//it block defines one test to perform
	it("save a record to the database", (done)=>{
		var url = new urlData({
			longUrl: "http://www.google.com",
			shorturl: "https://usms.herokuapp.com/"
		});
			//assert should return true
		url.save().then(()=>{
			//returns true when the url is created locally but not saved to the db
			// returns false when the url is created locally and has been saved to the db
			assert(url.isNew === false);
			//done needed to end test
			done();
		});		
	});
});