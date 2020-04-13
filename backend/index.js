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
app.use(require('./routes'));
app.use('/api/user', require('./routes/user'));

app.listen(app.get('port'), () => { console.log("Server on port " + app.get('port')); });