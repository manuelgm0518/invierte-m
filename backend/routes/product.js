const express = require('express');
const router = express.Router();
const fs = require('fs');

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
    Product.countDocuments({}).exec((err, data) => {
        if(err){
            res.status(400).json(err);
            console.log(err);
            return;
        }
        else{
            res.json(data);
        }
    });
});

router.post('/interval', (req, res) => {
    Product.find({}).skip(req.body.min).limit(req.body.max).sort([req.body.order]).exec((err, data) => {
        if(err){
            res.status(400).json(err);
            return;
        }
        else{
            res.json(data);
        }
    });
});

router.post('/file/:id', (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        Product.findOneAndUpdate({ "_id": req.params.id},{ "$set": { "imageURL":  'http://localhost:3000/img/' + filename} }, (err, data) => {
            if(err)
                res.status(400).json(err);
        });
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.status(200).json({});
        });
    });
});

router.get('/business/:id', (req, res) => {
    Product.find({business:req.params.id}).exec((err, data) => {
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
    Product.findOne({_id:req.params.id}).populate('business').exec((err, data) => {
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