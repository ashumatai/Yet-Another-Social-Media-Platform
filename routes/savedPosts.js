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
  })
  module.exports = router;