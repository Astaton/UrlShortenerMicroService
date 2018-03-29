const express = require('express');
const validUrl = require('valid-url');
const urlData = require('../modules/models/urlSchema.js');
const shortUrlStub = "https://usms.herokuapp.com/rd/";
const router = express.Router();


router.get('/', (req, res)=>{
	const reqUrl = req.query.url;
    const urlIsValid = validUrl.isUri(reqUrl);

    if (urlIsValid){
        console.log("urlIsValid");
        urlData.findOne({longUrl: reqUrl}, (err, record)=>{
            console.log("starting search of db");
            if(err){ console.error(err); }
        })
        .then((record)=>{
            if(record){
                console.log("url "+record.longUrl+" is already exists in the db");
                const jsonData ={
                	longUrl: record.longUrl,
    				shortUrl: record.shortUrl
                }
                console.log("rendering data");
                res.json(jsonData);
            }else{
                //if the url is not already in the db the browser is redirected to enter it into the db
                console.log("url "+reqUrl+" is not in db redirecting to add");
                res.redirect('/api/add?url='+reqUrl);
            }

        })
        .catch((err)=>{
            console.error(err);
        })
    }
    //if the url that was entered is invalid redirect to invalid
    else{
        console.log(reqUrl+ " is an invalid format, redirecting to invalid");
        res.redirect('/api/invalid?url='+reqUrl);
	}

});

router.get('/add', (req, res)=>{
	console.log("Starting api add route");
    const reqUrl = req.query.url;
	
    urlData.count( (err, count)=>{

        if(err){
            console.error(err);
        }else{
            let newEntry = new urlData({
                longUrl: reqUrl,
                shortUrl: shortUrlStub+count.toString(16)
            });
            newEntry.save()
            .then(()=>{
                console.log("shortUrl is: "+newEntry+"saved to the db");
                res.redirect('/api?url='+reqUrl);
            })
            .catch((err)=>{
                console.error(err);
            });

        }
    
    });
});

router.get('/invalid', (req, res)=>{
    const reqUrl = req.query.url;
    jsonData = { 
    	longUrl: reqUrl,
    	shortUrl: "Invalid Url"
    };
    res.json(jsonData);
});

module.exports = router;