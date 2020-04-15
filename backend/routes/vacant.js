const express = require('express');
const router = express.Router();

const Vacant = require('../models/Vacant');

router.post('/', (req, res) => {
    Vacant.create(req.body, (err, doc) => {
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
    Vacant.countDocuments({}, (err, c) => {
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
    Vacant.find({}).populate('business').skip(req.body.min).limit(req.body.max).sort([req.body.order]).exec((err, data) => {
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