const express = require('express');
const router = express.Router();

const User = require('./models/User');

router.get('/user', async (req, res) => {
    res.json(await User.find());
});

module.exports = router;