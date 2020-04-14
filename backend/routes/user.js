const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require('../models/User');

process.env.SECRET_KEY = 'secret';

router.post('/', (req, res) => {
    console.log(req.body)
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

router.post('/logIn', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emai: user.email
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
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

router.get('/', (req, res) => {
    let token = req.headers.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            res.status(401).json({
                error: 'unauthorized'
            });
            return;
        }
        else {
            res.json({
                _id: decode._id,
                firstName: decode.firstName,
                lastName: decode.lastName,
                emai: decode.email
            });
        }
    });
});

module.exports = router;