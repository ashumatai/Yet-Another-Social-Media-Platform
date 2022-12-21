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
      
      
          let userId = req.session.user._id.toString();
          userId = userId.trim();
          if(validatiion.validString(userId,"ID"));
          if(validatiion.validObjectId(userId,"ID"));
          const posts = await homeData.getAllPost("639f83be3d672fdc29373608");
          // res.json(posts);
          // console.log(posts);
          return res
          .status(200)
          .render('home/homePage',{
          partial: "home-script",
          css: "home-css",
          title:"Home",
          postData:posts,
        });
      
      
    } 
    catch (e) {
      if(typeof(e)==='object'){
        return res
          .status(404)
          .render('home/error',{
          partial: "home-script",
          css: "home-css",
          title:"Error",
          error:e.error});
          // res.status(404).send(e);       
      }
      else{
        return res
          .status(400)
          .render('home/error',{
          partial: "home-script",
          css: "home-css",
          title:"Error",
          error:e});
        // res.status(400).send(e);
      }
    } 
  });
  router
  .route('/feed')
  .get(async (req, res) => {
    try {
    
     
              let userId = req.session.user._id.toString();
              userId = userId.trim();
              if(validatiion.validString(userId,"ID"));
              if(validatiion.validObjectId(userId,"ID"));
              const followingPost = await homeData.getFollowingPost(userId);
              return res
              .status(200)
              .render('home/feedPage',{
              partial: "home-script",
              css: "home-css",
              title:"Feed",
              postData:followingPost});
              
            }
        
    catch (e) {
      if(typeof(e)==='object'){
          // res.status(404).send(e);
          console.log(e)
          return res
          .status(404)
          .render('home/error',{
          partial: "home-script",
          css: "home-css",
          title:"Error",
          error:e.error});       
      }
      else{
        // console.log(e);
        // res.status(400).send(e);
        console.log(e);
        return res
        .status(400)
        .render('home/error',{
        partial: "home-script",
        css: "home-css",
        title:"Error",
        error:e});
      }
    } 
  })
  module.exports = router;