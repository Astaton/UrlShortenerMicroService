const express = require('express');
const mongoose = require('mongoose');
const dbUrl = "mongodb://usmsu1:Tg4Msmun9amk1@ds123919.mlab.com:23919/usms";
const bodyParser = require('body-parser');
const port =process.env.PORT || 3000;

const app = express();

//ES6 Promises
mongoose.Promise = global.Promise;

//tell mongoose to connect to the db
mongoose.connect(dbUrl);
mongoose.connection.once('open', ()=>{
	console.log('Connection to the db has succeded');
}).on('error', (error)=>{
	console.error("Connection error: ", error.message);
});

app.use(bodyParser.urlencoded({extended: false}));
//send style sheets
app.use('/static',express.static('public'));

//sets the template engine that is being used, by default it looks for the template engine in the views folder.
app.set('view engine', 'pug');

//set routes
const mainRoutes = require('./routes');
const addRoutes = require('./routes/add.js');
const rdRoutes = require('./routes/rd.js');
const apiRoutes = require('./routes/api.js');
app.use('/home', mainRoutes);
app.use(addRoutes);
app.use('/rd', rdRoutes);
app.use('/api', apiRoutes);

//redirect to home from root
app.get('/', (req, res)=>{
	res.redirect('/home');
});


app.use((req, res, next) => {
 	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next)=>{
	res.locals.error = err;
	res.status(err.status);
	res.render('error', err);
});



app.listen(port, ()=>{
	console.log("Starting Server on port "+port+"!!")
});