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
    
      if(validatiion.validObjectId(req.body.postId,"ID"));
      if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
      req.body.postId = req.body.postId.trim();
      // trim user id
      const addedLikes = await likesData.addLikes("63963928ac02e3a9db204155",req.body.postId);
      // const savedPost = req.body.postId;
      res.json(addedLikes);
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
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
    
      if(validatiion.validObjectId(req.body.postId,"ID"));
      if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
      req.body.postId = req.body.postId.trim();
      // trim user id
      const deletedLikes = await likesData.deleteLikes("63963928ac02e3a9db204155",req.body.postId);
      // const savedPost = req.body.postId;
      res.json(deletedLikes);
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