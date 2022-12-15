const express = require('express');
const router = express.Router();
const filtersData = require('../data/filters');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
router
  .route('/1')
  .get(async (req, res) => {
    try {
        //user from req session remove from home.js
          if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
        //   req.params.userId = req.params.userId.trim();
          const MostLikes = await filtersData.getMostLikes("63963928ac02e3a9db204155");
        //   console.log(MostLikes);
        //   res.json(MostLikes);
          return res.render('home/feedPage',{title:"Feed",postData:MostLikes});
        } 
        catch (e) {
          if(typeof(e)==='object'){
            console.log(e);
              res.status(404).send(e);       
          }
          else{
            console.log(e);
            res.status(400).send(e);
          }
        } 
  });
  router
  .route('/2')
  .get(async (req, res) => {
    try {
        //user from req session remove from home.js
          if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
        //   req.params.userId = req.params.userId.trim();
          const oldest = await filtersData.getOldest("63963928ac02e3a9db204155");
        //   console.log(MostLikes);
        //   res.json(MostLikes);
          return res.render('home/feedPage',{title:"Feed",postData:oldest});
        } 
        catch (e) {
          if(typeof(e)==='object'){
            console.log(e);
              res.status(404).send(e);       
          }
          else{
            console.log(e);
            res.status(400).send(e);
          }
        } 
  });
  router
  .route('/3')
  .get(async (req, res) => {
    try {
        //user from req session remove from home.js
          if(validatiion.validObjectId("63963928ac02e3a9db204155","ID"));
        //   req.params.userId = req.params.userId.trim();
          const newest = await filtersData.getNewest("63963928ac02e3a9db204155");
        //   console.log(MostLikes);
        //   res.json(MostLikes);
          return res.render('home/feedPage',{title:"Feed",postData:newest});
        } 
        catch (e) {
          if(typeof(e)==='object'){
            console.log(e);
              res.status(404).send(e);       
          }
          else{
            console.log(e);
            res.status(400).send(e);
          }
        } 
  });
  module.exports = router;