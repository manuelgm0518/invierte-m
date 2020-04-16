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

router.get('/user/:id', (req, res) => {
    Investment.find({investor:req.params.id}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;