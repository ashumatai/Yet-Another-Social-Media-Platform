const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
const userData = data.users;
const commentData = data.comments;
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');

router.route('/').post(async (req, res) => {
  try {
    helper.validString(req.body.postId);
    helper.validObjectId(req.body.postId); 
  } catch(e){
      throw e;
  } 
  try {
    console.log(req.body.postId);
    await postData.getPostById(req.body.postId);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: 'Post not found' });
    return;
  }  
  try {
    let comment = await commentData.getCommentsByPostId(req.body.postId);
    // console.log(comment);
    res.json(comment);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
})
  
router.route('/content').post(async (req, res) => {

  let commentInfo = req.body.comment;
//   console.log(commentInfo);
//   console.log(req.params.postId);
  try {
    helper.validString(req.body.postId,"PostId");
    helper.validObjectId(req.body.postId); 
    helper.validString(req.session.user._id,"UserId");
    helper.validObjectId(req.session.user._id); 
    helper.validString(commentInfo,"comment");
    commentInfo= commentInfo.trim().toLowerCase();
    if(commentInfo.length>20){
      throw [400,'Comments length can not exceed 20 characters'];
  }
  } catch(e){
    //   console.log(e);
      throw e;
  } 
  if (!commentInfo) {
    res.status(400).json({ error: 'Comment can not be empty' });
    return;
  }
  try {
    await postData.getPostById(req.body.postId);
  } catch (e) {
    // console.log(e);
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  try {
    const newComment = await commentData.postComment(
      req.body.postId,
      req.session.user._id,
      commentInfo.trim()
    );
    res.json(newComment);
  } catch (e) {
    res.status(400).json({ error: e });
    }
})

module.exports = router;