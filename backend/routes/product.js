const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

router.post('/', (req, res) => {
    Product.create(req.body, (err, doc) => {
        if(err){
            res.status(400).json(err);
            return;
        }
        else{
            res.json(doc);
        }
    });
});

router.get('/count', (req, res) => {
    Product.countDocuments({}, (err, c) => {
        if(err){
            res.status(400).json(err);
            return;
        }
        else{
            res.json({count:c});
        }
    });
});

router.post('/interval', (req, res) => {
    Product.find({}).skip(req.body.min).limit(req.body.limit).sort([req.body.order]).exec((err, data) => {
        if(err){
            res.status(400).json(err);
            return;
        }
        else{
            res.json(data);
        }
    });
});

module.exports = router;