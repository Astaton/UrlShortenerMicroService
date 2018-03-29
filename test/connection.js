const mongoose = require('mongoose');

//ES6 Promise
mongoose.Promise = global.Promise;

//runs code in brackets before the tests are run
before((done)=>{
//connect to mongodb
	mongoose.connect('mongodb://usmsu1:Tg4Msmun9amk1@ds123919.mlab.com:23919/usms');

	mongoose.connection.once('open', ()=>{
		console.log("Connection has been made, now magicking!");
		done();
	}).on('error', (error)=>{
		console.error("Oh noes... connection error: "+error.message);
	});
});

//Drop the db collection clear the collection before each test
beforeEach((done)=>{
	mongoose.connection.collections.urls.drop(()=>{
		done();
	});
});

after((done)=>{

	console.log("Clearing the database")
	mongoose.connection.collections.urls.drop(()=>{
		console.log("Closing connection, Oom.");
		mongoose.disconnect();
		done();	
	});
	
});