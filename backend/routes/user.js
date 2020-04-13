const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/', async (req, res) => { //Agregar usuario
  await User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(!user){
      User.create(req.body, (err, doc) => {
        if (err) {
            res.status(400).json(err);
            return;
        } res.json(doc);
      });
    }
    else{
      res.json({
        status: 'error',
        error: 'User already exists'
      });
    }
  });
});

module.exports = router;