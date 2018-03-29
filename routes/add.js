const express = require('express');
const urlData = require('../modules/models/urlSchema.js');
const shortUrlStub = "https://usms.herokuapp.com/rd/";
const router = express.Router();

router.use('/static',express.static('public'));

router.get('/add', (req, res)=>{
    console.log("Starting add route");
    const originalUrl = req.query.url;
    templateData = { 
        originalUrl: originalUrl,
        urlIsValid: originalUrl 
    };
    urlData.count( (err, count)=>{

        if(err){
            console.error(err);
        }else{

            templateData.shortUrl = shortUrlStub+count.toString(16);
            let newEntry = new urlData({
                longUrl: templateData.originalUrl,
                shortUrl: shortUrlStub+count.toString(16)
            });
            newEntry.save()
            .then(()=>{
                console.log("shortUrl is: "+templateData.shortUrl);
                res.render('convertUrl', templateData);
            })
            .catch((err)=>{
                console.error(err);
            });

        }
    
    });
});

module.exports = router;