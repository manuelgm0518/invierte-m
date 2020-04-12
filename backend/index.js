const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes
app.use(require('./routes'));
app.listen(app.get('port'), () => { console.log("Server on port " + app.get('port')); });
