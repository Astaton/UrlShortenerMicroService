const express = require('express');
const validUrl = require('valid-url');
const urlData = require('../modules/models/urlSchema.js');
const shortUrlStub = "https://usms.herokuapp.com/rd/";
const router = express.Router();

router.use('/static',express.static('public'));

router.get('/', (req, res)=>{
    res.render('index');
});


//route used when a url is submited from the text input box
router.post('/', (req, res)=>{
    console.log("starting post");
    const reqUrl = req.body.urlInput;
    const templateData = {originalUrl: reqUrl};
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
                templateData.urlIsValid = record.longUrl
                templateData.shortUrl = record.shortUrl;                   
                console.log("rendering data");
                res.render('../views/convertUrl', templateData);
            }else{
                //if the url is not already in the db the browser is redirected to enter it into the db
                console.log("url "+reqUrl+" is not in db redirecting to add");
                res.redirect('/home/add?url='+reqUrl);
            }

        })
        .catch((err)=>{
            console.error(err);
        })
    }
    //if the url that was entered is invalid redirect to invalid
    else{
        console.log(reqUrl+ " is an invalid format, redirecting to invalid");
        res.redirect('/home/invalid?url='+reqUrl);
    }

});

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

router.get('/invalid', (req, res)=>{
    const reqUrl = req.query.url;
    templateData = { originalUrl: reqUrl};
    res.render('../views/convertUrl', templateData);
});

module.exports = router;