const express = require('express');
const router = express.Router();
const followingsData = require('../data/followings');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
  router
  .route('/')
  .get(async (req, res) => {
    try {
    
      if(validatiion.validObjectId("639518baec8160da0010d848","ID"));
      // req.params.userId = req.params.userId.trim();
      const followings = await followingsData.getFollowings("639518baec8160da0010d848");
      res.json(followings);
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