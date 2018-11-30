const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();

const env = require('../env.json');

let postsDB = require('../utils/posts.json');

// view posts
router.get('/', (req, res) => {
  const { user } = jwt.verify(req.token, env.secret);
  const posts = _.filter(postsDB, { userId: user._id });

  res.json({ posts });
});

// create post
router.post('/new', (req, res) => {
  const { user } = jwt.verify(req.token, env.secret);
  
  postsDB.push({
    title: req.body.title,
    body: req.body.body,
    userId: user._id
  });

  res.json({ 
    status: 'new post created!',
    payload: postsDB.slice(-1).pop()
  });
});

// delete post
router.delete('/delete', (req,res) => {
  _.remove(postsDB, (post) => parseInt(req.body.id, 10) === post.id);
  
  res.json({ status: 'Post deleted.' })
})

module.exports = router;
