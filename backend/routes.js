const express = require('express');
const router = express.Router();

//Users API
const User = require('./models/User');
router.get('/user', async (req, res) => { res.json(await User.find()); });
router.get('/user/:id', async (req, res) => { res.json(await User.findById(req.params.id)); });
router.post('/user', (req, res) => {
    User.create(req.body, (err, doc) => {
        if (err) {
            res.status(400).json(err);
            return;
        } res.json(doc);
    });
});
router.put('/user/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if(err) {
            res.status(400).json(err);
            return;
        } res.json(doc);
    });
});


module.exports = router;