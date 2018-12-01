const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const verifyToken = (req, res, next) => {
  if ( req.path === '/' || req.path === '/login') return next();
  
  // Authorization: Bearer <access_token>
  const bearerHeader = req.headers['authorization'];

  if(bearerHeader) {
    req.token = bearerHeader.split(' ')[1];
    next();
  } else {
    res.sendStatus(403);
  }
}

app.use(verifyToken);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);

app.listen('3000', () => {
  console.log('Server running on port 3000');
});