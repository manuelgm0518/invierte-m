const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const mongodb_uri = "mongodb+srv://adminxd:adminxd@cluster0-skxxg.mongodb.net/inviertem-db?retryWrites=true&w=majority";
mongoose.connect(mongodb_uri, { 
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('DB Connected');
});

module.exports = db;