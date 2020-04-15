const express = require('express');
const cors = require('cors');
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/business', require('./routes/business'));
app.use('/api/product', require('./routes/product'));
app.use('/api/vacant', require('./routes/vacant'));

app.listen(app.get('port'), () => { console.log("Server on port " + app.get('port')); });