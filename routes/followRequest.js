/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const express = require('express');
const router = express.Router();
const followRequestData = require('../data/followRequest');
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
      const followRequest = await followRequestData.getFollowRequest(userId);
      res.json(followRequest);
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
      let userId = req.session.user._id.toString();
      userId = userId.trim();
      if(validatiion.validString(userId,"ID"));
      if(validatiion.validObjectId(userId,"ID"));
      if(validatiion.validString(req.body.id,"ID"));
      if(validatiion.validObjectId(req.body.id,"ID"));
      req.body.id = req.body.id.trim();
      const followRequest = await followRequestData.acceptFollowRequest(userId,req.body.id);
      res.json(followRequest);
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else if(typeof(e)==='number'){
        res.status(500).send("Cannot accept the request");
      }
      else{
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
      if(validatiion.validString(req.body.id,"ID"));
      if(validatiion.validObjectId(req.body.id,"ID"));
      req.body.id = req.body.id.trim();
      const followRequest = await followRequestData.deleteFollowRequest(userId,req.body.id);
      res.json(followRequest);
    } 
    catch (e) {
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else if(typeof(e)==='number'){
        res.status(500).send("Cannot decline the request");
      }
      else{
        res.status(400).send(e);
      }
    } 
  });
  module.exports = router;