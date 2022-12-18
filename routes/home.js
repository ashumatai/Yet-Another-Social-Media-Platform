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
      if (!req.session.user || !req.session.user.verified) 
      {
          return res
          .status(200)
          .render("auth/signup", {
            title: "Sign-up",
            partial: "auth-script",
            css: "auth-css",
          });
      }
      else{
          let userId = req.session.user._id.toString();
          userId = userId.trim();
          if(validatiion.validString(userId,"ID"));
          if(validatiion.validObjectId(userId,"ID"));
          const posts = await homeData.getAllPost(userId);
          // res.json(posts);
          // console.log(posts);
          return res
          .status(200)
          .render('home/homePage',{
          partial: "home-script",
          css: "home-css",
          title:"Home",
          postData:posts,
          userId:"63963928ac02e3a9db204155"
        });
      }
      
    } 
    catch (e) {
      if(typeof(e)==='object'){
        return res
          .status(404)
          .render('home/error',{
          partial: "home-script",
          css: "home-css",
          title:"Error",
          error:e});
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
      if (!req.session.user || !req.session.user.verified) 
      {
          return res
          .status(200)
          .render("auth/signup", {
            title: "Sign-up",
            partial: "auth-script",
            css: "auth-css",
          });
      }
       else{
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
        } 
    catch (e) {
      if(typeof(e)==='object'){
          // res.status(404).send(e);
          return res
          .status(404)
          .render('home/error',{
          partial: "home-script",
          css: "home-css",
          title:"Error",
          error:e});       
      }
      else{
        // console.log(e);
        // res.status(400).send(e);
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