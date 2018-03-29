const express = require('express');
const urlData = require('../modules/models/urlSchema.js');
const shortUrlStub = "https://usms.herokuapp.com/rd/";
const router = express.Router();

router.use('/static',express.static('public'));

router.get('/:id', (req, res)=>{
	const urlId = req.params.id;
	console.log("urlId is: "+ urlId); 
	urlData.findOne({shortUrl: shortUrlStub+urlId}, (err, record)=>{
		if (err){
			console.error(err);
		}
		//if the record cannot be found redirect to invalid
		if(!record){
			res.redirect('/home/invalid?url='+shortUrlStub+urlId);
		}
	})
	.then((record)=>{
		res.redirect(record.longUrl);
	})
	.catch((err)=>{
		console.error(err);
	})
});

module.exports = router;