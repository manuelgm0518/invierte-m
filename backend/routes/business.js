const express = require('express');
const router = express.Router();

const Business = require('../models/Business');

router.post('/', (req, res) => {
    Business.create(req.body, (err, doc) => {
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
    Business.countDocuments({}, (err, c) => {
        if(err){
            res.status(400).send(err);
            return;
        }
        else{
            res.json({count:c});
        }
    });
});

router.post('/interval', (req, res) => {
    Business.find({}).skip(req.body.min).limit(req.body.max).sort([req.body.order]).exec((err, data) => {
        if(err){
            res.status(400).json(err);
            return;
        }
        else{
            res.json(data);
        }
    });
});

router.get('/:id', (req, res) => {
    Business.findOne({_id:req.params.id},(err, data) => {
        if(err){
            res.json(err);
            return;
        }
        else{
            res.json(data);
        }
    });
});

module.exports = router;


