const express = require('express');
const router = express.Router();

const Investment = require('../models/Investment.js');

router.post('/', (req, res) => {
    Investment.create(req.body, (err, doc) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(doc);
    });
});

module.exports = router;