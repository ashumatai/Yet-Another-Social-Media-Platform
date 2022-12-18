/**
 * @author Deepali Nagwade <dnagwade@stevens.edu>
 * */
const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
const userData = data.users;
const helper = require('../helpers/validations');
const {ObjectId} = require('mongodb');


/**
* Function to get all posts of a user
 */
router.route('/:userId').get(async (req, res) => {
  if(helper.validString(userId, "ID"));
  if(helper.validObjectId(userId, "ID"));
  userId=userId.trim();
  try {
    await userData.getUserById(req.params.userId);
  } catch (e) {
    res.status(404).json({ error: e });
    return;
  }  
  try {
    let post = await postData.getAllPosts(req.params.userId);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.route('/post/:postId').get(async (req, res) => {
  if(helper.validString(postId, "ID"));
  if(helper.validObjectId(postId, "ID"));
  postId=postId.trim();

  try {
    let post = await postData.getPostById(req.params.postId);
    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  } 
});

router.route('posts/:postId').delete(async (req, res) => {
  if(helper.validString(postId, "ID"));
  if(helper.validObjectId(postId, "ID"));
  postId=postId.trim();

  try {
    await postData.getPostById(req.params.postId);
  } catch (e) {
    res.status(404).json({ error: e });
    return;
  }    
  try {
    const deletedPost = await postData.deletePost(req.params.postId);
    res.json(deletedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.route('/').post(async (req, res) => {
  const postInfo = req.body;
  if(helper.validString(postInfo.postId, "ID"));
  if(helper.validString(postInfo.postContent, "ID"));
  if(helper.validString(postInfo.tags, "ID"));
  if(helper.validObjectId(postId, "ID"));
  postInfo.postId=postInfo.postId.trim();
  postInfo.postContent=postInfo.postContent.trim();
  postInfo.tags=postInfo.tags.trim();

  try {
    const newPost = await postData.createPost(
      postInfo.postContent,
      postInfo.caption,
      postInfo.tags,
      //req.session.user
      '639518baec8160da0010d848'
    );
    res.json(newPost);
  } catch (e) {
    res.status(400).json({ error: e });
    }
})

module.exports = router;