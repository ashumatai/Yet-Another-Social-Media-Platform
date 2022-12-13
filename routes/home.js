const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const savedPostData = require('../data/savedPosts');
const postData = require('../data/posts');
const homeData = require('../data/home');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
router
  .route('/')
  .get(async (req, res) => {
    try {
      // take user id 
      const posts = await homeData.getAllPost("63963928ac02e3a9db204155");
      // res.json(posts);
      return res.render('home/homePage',{title:"Home",postData:posts});
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else{
        res.status(400).send(e);
      }
    } 
  });
  // router
  // .route('/followersPost/:userId')
  // .get(async (req, res) => {
  //   try {
    
  //     if(validatiion.validObjectId(req.params.userId,"ID"));
  //     req.params.userId = req.params.userId.trim();
  //     const followersPost = await homeData.getFollowersPost(req.params.userId);
  //     res.json(followersPost);
  //   } 
  //   catch (e) {
  //     if(typeof(e)==='object'){
  //         res.status(404).send(e);       
  //     }
  //     else{
  //       res.status(400).send(e);
  //     }
  //   } 
  // });
  router
  .route('/feed/:userId')
  .get(async (req, res) => {
    try {
    
      if(validatiion.validObjectId(req.params.userId,"ID"));
      req.params.userId = req.params.userId.trim();
      const followingPost = await homeData.getFollowingPost(req.params.userId);
      // res.json(followingPost);
      return res.render('home/feedPage',{title:"Feed",postData:followingPost});
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else{
        res.status(400).send(e);
      }
    } 
  })
  module.exports = router;