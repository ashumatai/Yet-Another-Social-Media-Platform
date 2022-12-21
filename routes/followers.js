/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const express = require("express");
const router = express.Router();

const followersData = require('../data/followers');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
const followingsData = require("../data/followings");

  router
  .route('/')
  .get(async (req, res) => {
    try {
    
      let userId = req.session.user._id.toString();
      userId = userId.trim();
      if(validatiion.validString(userId,"ID"));
      if(validatiion.validObjectId(userId,"ID"));
      const followers = await followersData.getFollowers(userId);
      
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
  router
  .route('/followersandfollowing')
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

// router.route("/").get(async (req, res) => {
//   try {
//     let userId = req.session.user._id.toString();
//     userId = userId.trim();
//     if(validatiion.validString(userId,"ID"));
//     if(validatiion.validObjectId(userId,"ID"));
//     const followers = await followersData.getFollowersAndFollowing(userId);
//     // req.params.userId = req.params.userId.trim();
   
//     res.json(followers);
//   } catch (e) {
//     if (typeof e === "object") {
//       res.status(404).send(e);
//     } else {
//       res.status(400).send(e);
//     }
//   }
// });






router.route("/follow").post(async (req, res) => {
  const ids = req.body;
  
  try {
    validatiion.validObjectId(req.session.user._id, "ID");
    validatiion.validObjectId(req.session.user._id, "ID");

    const follow = await followersData.follow(req.session.user._id, ids.id);
    res.send(follow);
  } catch (e) {
    console.log(e)
    res.status(404).send(e);
  }
});

router.route("/unfollow").delete(async (req, res) => {
  try {
    const toBeDeleted = req.body;
    const deleted = await followingsData.unfollow(
      toBeDeleted.senderId,
      toBeDeleted.receiverId
    );

    res.send(deleted);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;