const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../models/User');

process.env.SECRET_KEY = 'secret';

router.post('/', (req, res) => {
    const userData = req.body;
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                User.create(userData, (err, doc) => {
                    if (err) {
                        res.status(400).json(err);
                        return;
                    }
                    res.json(doc);
                });
            });

        }
        else {
            res.json({ error: 'User already exists' });
        }
    });
});

router.get('/', (req, res) => {
    let token = req.headers.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            res.json({unauthorized:true});
        }
        else {
            User.findOne({_id:decode._id})
            .then(data => {
                res.json(data);
            });
        }
    });
});

router.post('/logIn', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY);
                    res.send(token);
                }
                else {
                    res.json({ error: 'User does not exist' });
                }
            }
            else {
                res.json({ error: 'User does not exist' });
            }
        })
        .catch(err => {
            res.json({ error: 'User does not exist', log: err });
        });
});

router.post('/removeShoppingCart', (req, res) => {
    User.update({ "_id": req.body.user },{ "$pull": { "shoppingCart": {"_id":req.body.product} } }, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.put('/addShoppingCart/:id', (req, res) => {
    User.findOneAndUpdate({ "_id": req.params.id},{ "$push": { "shoppingCart": req.body } }, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/clearShoppingCart/:id', (req, res) => {
    User.findOneAndUpdate({ "_id": req.params.id},{ "$set": { "shoppingCart": [] } }, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({'_id':req.params.id}).populate('shoppingCart.product').exec((err, data) => {
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