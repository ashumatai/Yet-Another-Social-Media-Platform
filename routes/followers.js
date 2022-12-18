/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const express = require('express');
const router = express.Router();
const followersData = require('../data/followers');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
  // router
  // .route('/')
  // .get(async (req, res) => {
  //   try {
    
  //     let userId = req.session.user._id.toString();
  //     userId = userId.trim();
  //     if(validatiion.validString(userId,"ID"));
  //     if(validatiion.validObjectId(userId,"ID"));
  //     const followers = await followersData.getFollowers(userId);
      
  //     res.json(followers);
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
  .route('/')
  .get(async (req, res) => {
    try {
    
      let userId = req.session.user._id.toString();
      userId = userId.trim();
      if(validatiion.validString(userId,"ID"));
      if(validatiion.validObjectId(userId,"ID"));
      const followers = await followersData.getFollowersAndFollowing(userId);
      // console.log(followers);
      res.json(followers);
    } 
    catch (e) {
      // console.log(e);
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else{
        res.status(400).send(e);
      }
    } 
  });
 
  module.exports = router;