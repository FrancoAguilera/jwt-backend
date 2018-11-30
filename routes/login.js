const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();

const env = require('../env.json');
const users = require('../utils/users.json');

router.get('/', (req, res) => {
  res.json({ response: 'Login page' });
});

// login as user
router.post('/', (req, res) => {
  const user = _.find(users, req.body);
  delete user.password;
  
  if (user) {
    jwt.sign({user}, env.secret, { expiresIn: '2m' }, (err, token) => {
      res.json({ token });
    });
  } else {
    res.json({ response: 'User does not exists' });
  }
});

module.exports = router;