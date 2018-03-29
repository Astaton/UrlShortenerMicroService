const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create schema and model

const urlDataSchema = new schema({
	longUrl: String,
	shortUrl: String
});

const urlData = mongoose.model('urls', urlDataSchema);

module.exports = urlData;