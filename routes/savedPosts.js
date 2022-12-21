const express = require('express');
const router = express.Router();
const savedPostData = require('../data/savedPosts');
const validatiion = require('../helpers/validations');
router
  .route('/')
  .get(async (req, res) => {
    try {
    
      let userId = req.session.user._id.toString();
      userId = userId.trim();
      if(validatiion.validString(userId,"ID"));
      if(validatiion.validObjectId(userId,"ID"));
      const savedPost = await savedPostData.getsavedPost("639f83be3d672fdc29373608");
      return res
          .status(200)
          .render('home/homePage',{
          partial: "home-script",
          css: "home-css",
          title:"Home",
          postData:savedPost,
        });
      
    } 
    catch (e) {
      if(typeof(e)==='object'){
          // console.log(e);
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
  .route('/')
  .post(async (req, res) => {
    try {

      let userId = req.session.user._id.toString();
      userId = userId.trim();
      if(validatiion.validString(userId,"ID"));
      if(validatiion.validObjectId(userId,"ID"));
      if(validatiion.validObjectId(req.body.postId,"ID"));
      req.body.postId = req.body.postId.trim();
      const savedPost = await savedPostData.addsavedPost("639f83be3d672fdc29373608",req.body.postId);
      // const savedPost = req.body.postId;
      res.json(savedPost);
   
    } 
    catch (e) {
      if(typeof(e)==='object'){
        // console.log(e);
        return  res.status(404).send(e);       
      }
      else if(typeof(e)==='number'){
       return  res.status(500).send("Cannot save the post");
      }
      else{
        
       return res.status(400).send(e);
      }
    } 
  });
  router
  .route('/')
  .delete(async (req, res) => {
    try {
      // let userId = req.session.user._id.toString();
      // userId = userId.trim();
      // if(validatiion.validString(userId,"ID"));
      // if(validatiion.validObjectId(userId,"ID"));
      // if(validatiion.validObjectId(req.body.postId,"ID"));
      // req.body.postId = req.body.postId.trim();
      // trim user id
      const savedPost = await savedPostData.deletesavedPost("639f83be3d672fdc29373608",req.body.postId);
      // const savedPost = req.body.postId;
      res.json(savedPost);
    } 
    catch (e) {
      if(typeof(e)==='object'){
         return res.status(404).send(e);       
      }
      else if(typeof(e)==='number'){
       return res.status(500).send("Cannot unsave the post");
      }
      else{
        return res.status(400).send(e);
      }
    } 
  });
  module.exports = router;
