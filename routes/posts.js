const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
const userData = data.users;
const {ObjectId} = require('mongodb');

router
  .route('/:userId').get(async (req, res) => {

    if (!req.params.userId) {
      res.status(400).json({ error: 'You must provide an ID' });
      return;
    }
  
    if (!req.params.userId.trim().length) {
      res.status(400).json({ error: 'ID provided only contains blank spaces' });
      return;
    }
  
    if(!ObjectId.isValid(req.params.userId)) {
      res.status(400).json({ error: 'The ID is not a valid Object ID' });
      return;
    }
    try {
      await userData.getUserById(req.params.userId);
    } catch (e) {
      res.status(404).json({ error: 'User not found' });
      return;
    }  
    try {
      let post = await postData.getAllPosts(req.params.userId);
      console.log(post);
      res.json(post);
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: e });
    }
  });

router
  .route('/post/:postId').get(async (req, res) => {
    console.log(req.params.postId);
    if (!req.params.postId) {
      res.status(400).json({error: 'You must provide an ID'});
      return;
    }
  
    if (!req.params.postId.trim().length===0) {
      res.status(400).json({error: 'ID contains only empty spaces'});
      return;
    }

    if(!ObjectId.isValid(req.params.postId)) {
      res.status(400).json({ error: 'The ID provided is not a valid Object ID' });
      return;
    }
  
    try {
      let post = await postData.getPostById(req.params.postId);
      res.json(post);
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: 'Post not found' });
    } 
});

router
  .route('posts/:postId').delete(async (req, res) => {

    if (!req.params.postId) {
      res.status(400).json({ error: 'You must provide an ID' });
      return;
    }
    if (!req.params.postId.trim().length) {
      res.status(400).json({ error: 'ID provided only contains blank spaces' });
      return;
    }
    if(!ObjectId.isValid(req.params.postId)) {
      res.status(400).json({ error: 'The ID is not a valid Object ID' });
      return;
    }

    try {
      await postData.getPostById(req.params.postId);
    } catch (e) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
      
    try {
      const deletedPost = await postData.deletePost(req.params.postId);
      res.json(deletedPost);
    } catch (e) {
      res.status(500).json({ error: 'Post cannot be deleted' });
    }
});

module.exports = router;