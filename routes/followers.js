/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const express = require('express');
const router = express.Router();
const followersData = require('../data/followers');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
  router
  .route('/:userId')
  .get(async (req, res) => {
    try {
    
      if(validatiion.validObjectId(req.params.userId,"ID"));
      req.params.userId = req.params.userId.trim();
      const followers = await followersData.getFollowers(req.params.userId);
      res.json(followers);
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
 
  module.exports = router;