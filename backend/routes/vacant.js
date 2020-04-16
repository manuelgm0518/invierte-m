const express = require('express');
const router = express.Router();
var fs = require('fs');

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

router.post('/file/:ids', (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        var ids = req.params.ids.split('$');
        Vacant.findOneAndUpdate({ "_id": ids[1]},{ "$push": { "requests": {user:ids[0], fileURL:__dirname + '/files/' + filename} } }, (err, data) => {
            if(err)
                console.log(err);
        });
        fstream = fs.createWriteStream(__dirname + '\\files\\' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.status(200).json({});
        });
    });
});

router.get('/:id', (req, res) => {
    Vacant.findOne({'_id':req.params.id}).populate('business').exec((err, data) => {
        if(err){
            res.status(400).json(err);
            return;
        }
        else{
            res.json(data);
        }
    });
    res.status(200);
});


router.get('/business/:id', (req, res) => {
    Vacant.find({business:req.params.id}).exec((err, data) => {
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