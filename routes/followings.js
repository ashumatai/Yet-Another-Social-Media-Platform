const express = require("express");
const router = express.Router();
const followingsData = require('../data/followings');
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
      const followings = await followingsData.getFollowings(userId);
      res.json(followings);
    } 
    catch (e) {
      console.log(e);
      if(typeof(e)==='object'){
          res.status(404).send(e);       
      }
      else{
        res.status(400).send(e);
      }
    } 
  });

router.route("/unfollow").delete(async (req, res) => {
  try {
    const toBeDeleted = req.body;
    const deleted = await followingsData.unfollow("639518baec8160da0010d848", toBeDeleted.id);

    res.send(deleted);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;