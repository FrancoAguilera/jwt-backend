const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();

const env = require('../env.json');

let postsDB = require('../utils/posts.json');

// view posts
router.get('/', verifyToken, (req, res) => {
  const { user } = req.result;
  const posts = _.filter(postsDB, { userId: user._id });

  res.json({ posts });
});

// create post
router.post('/new', verifyToken, (req, res) => {
  const { user } = req.result;
  
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
router.delete('/delete', verifyToken, (req,res) => {
  const { user } = req.result;
  const removedPost = _.remove(postsDB, (post) => {
    return parseInt(req.body.id, 10) === post.id && post.userId === user._id;
  });

  let status = removedPost.length > 0 ? 'Post deleted.' : 'Post does not exists.';
  res.json({ status })
});

// verify token validation
function verifyToken(req, res, next) {
  jwt.verify(req.token, env.secret, (err, result) => {
    if(err) {
      res.status(403).send({ err });
    } else {
      req.result = result;
      next();
    }
  });
}

module.exports = router;
