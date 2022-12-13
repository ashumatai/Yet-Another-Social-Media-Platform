const express = require('express');
const router = express.Router();
const userData = require('../data/users');
const savedPostData = require('../data/savedPosts');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
router
  .route('/:userId')
  .get(async (req, res) => {
    try {
    
      if(validatiion.validObjectId(req.params.userId,"ID"));
      req.params.userId = req.params.userId.trim();
      const savedPost = await savedPostData.getsavedPost(req.params.userId);
      res.json(savedPost);
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
  router
  .route('/')
  .post(async (req, res) => {
    try {
    
      if(validatiion.validObjectId(req.body.postId,"ID"));
      if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
      req.body.postId = req.body.postId.trim();
      // trim user id
      const savedPost = await savedPostData.addsavedPost("63963928ac02e3a9db204155",req.body.postId);
      // const savedPost = req.body.postId;
      res.json(savedPost);
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else{
        console.log(e);
        res.status(400).send(e);
      }
    } 
  });
  router
  .route('/')
  .delete(async (req, res) => {
    try {
    
      if(validatiion.validObjectId(req.body.postId,"ID"));
      if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
      req.body.postId = req.body.postId.trim();
      // trim user id
      const savedPost = await savedPostData.deletesavedPost("63963928ac02e3a9db204155",req.body.postId);
      // const savedPost = req.body.postId;
      res.json(savedPost);
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else{
        console.log(e);
        res.status(400).send(e);
      }
    } 
  });
  module.exports = router;