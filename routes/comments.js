const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
const userData = data.users;
const commentData = data.comments;
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');

router.route('/:postId').get(async (req, res) => {
  try {
    helper.validString(req.params.postId);
    helper.validObjectId(req.params.postId); 
  } catch(e){
      throw e;
  } 
  try {
    console.log(req.params.postId);
    await postData.getPostById(req.params.postId);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: 'Post not found' });
    return;
  }  
  try {
    let comment = await commentData.getCommentsByPostId(req.params.postId);
    res.json(comment);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
})
  
router.route('/:postId').post(async (req, res) => {

  let commentInfo = req.body;
  console.log(commentInfo);
  console.log(req.params.postId);
  try {
    helper.validString(req.params.postId);
    helper.validObjectId('639518baec8160da0010d848'); 
    helper.validString(req.params.postId);
    helper.validObjectId('639518baec8160da0010d848'); 
    helper.validString(commentInfo.commentContent);
    commentInfo.commentContent= commentInfo.commentContent.trim().toLowerCase();
    if(commentInfo.commentContent.length>20){
      throw [400,'Comments length can not exceed 20 characters'];
  }
  } catch(e){
      console.log(e);
      throw e;
  } 
  if (!commentInfo) {
    res.status(400).json({ error: 'Comment can not be empty' });
    return;
  }
  try {
    await postData.getPostById(req.params.postId);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  try {
    const newComment = await commentData.postComment(
      req.params.postId,
      '639518baec8160da0010d848',
      commentInfo.commentContent.trim()
    );
    res.json(newComment);
  } catch (e) {
    res.status(400).json({ error: e });
    }
})

module.exports = router;