const express = require('express');
const db = require('./database');
const router = express.Router();

const User = require('./models/User');

const Joaco = new User({
    firstName: 'Joaquín Emiliano',
    lastName: 'Pedroza Gutiérrez',
    email: 'c la come'
});

router.get('/', (req, res) => {
    res.send(Joaco);
});

module.exports = router;