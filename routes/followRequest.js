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
    //take user from session
      if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
    //   req.params.userId = req.params.userId.trim();
      const followRequest = await followRequestData.getFollowRequest("63963928ac02e3a9db204155");
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
    //take user from session
      if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
      if(validatiion.validObjectId(req.body.id,"ID"));
    //   req.params.userId = req.params.userId.trim();
      const followRequest = await followRequestData.acceptFollowRequest("63963928ac02e3a9db204155",req.body.id);
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
  .delete(async (req, res) => {
    try {
    //take user from session
      if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
      if(validatiion.validObjectId(req.body.id,"ID"));
    //   req.params.userId = req.params.userId.trim();
      const followRequest = await followRequestData.deleteFollowRequest("63963928ac02e3a9db204155",req.body.id);
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
  module.exports = router;