/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const express = require('express');
const router = express.Router();
const likesData = require('../data/likes');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');

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
      // trim user id
      const addedLikes = await likesData.addLikes(userId,req.body.postId);
      // const savedPost = req.body.postId;
      res.json(addedLikes);
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else if(typeof(e)==='number'){
        res.status(500).send("Cannot like the post");
      }
      else{
        // console.log(e);
        res.status(400).send(e);
      }
    } 
  });
  router
  .route('/')
  .delete(async (req, res) => {
    try {
    
      let userId = req.session.user._id.toString();
      userId = userId.trim();
      if(validatiion.validString(userId,"ID"));
      if(validatiion.validObjectId(userId,"ID"));
      if(validatiion.validObjectId(req.body.postId,"ID"));
      req.body.postId = req.body.postId.trim();
      req.body.postId = req.body.postId.trim();
      // trim user id
      const deletedLikes = await likesData.deleteLikes(userId,req.body.postId);
      // const savedPost = req.body.postId;
      res.json(deletedLikes);
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else if(typeof(e)==='number'){
        res.status(500).send("Cannot unlike the post");
      }
      else{
        // console.log(e);
        res.status(400).send(e);
      }
    } 
  });
  module.exports = router;