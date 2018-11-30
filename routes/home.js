const express = require('express');
const router = express.Router();

// Access base url
router.get('/', (req, res) => {
  res.json({ response: 'Home page' });
});

module.exports = router;