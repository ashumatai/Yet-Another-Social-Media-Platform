const express = require('express');
const router = express.Router();
const filtersData = require('../data/filters');
const {ObjectId} = require('mongodb');
const validatiion = require('../helpers/validations');
const xss = require('xss');
router
  .route('/mostlikes')
  .get(async (req, res) => {
    try {
      
          let userId = req.session.user._id.toString();
          userId = userId.trim();
          if(validatiion.validString(userId,"ID"));
          if(validatiion.validObjectId(userId,"ID"));
          const MostLikes = await filtersData.getMostLikes(userId);
          return res
          .status(200)
          .render('home/feedPage',{
          partial: "home-script",
          css: "home-css",
          title:"Feed",
          postData:MostLikes,
        });
         
        } 
        catch (e) {
          if(typeof(e)==='object'){
            return res
              .status(404)
              .render('home/error',{
              partial: "home-script",
              css: "home-css",
              title:"Error",
              error:e});
              // res.status(404).send(e);       
          }
          else{
            return res
              .status(400)
              .render('home/error',{
              partial: "home-script",
              css: "home-css",
              title:"Error",
              error:e});
            // res.status(400).send(e);
          }
        
      }
  });
  router
  .route('/oldest')
  .get(async (req, res) => {
    try {
          let userId = req.session.user._id.toString();
          userId = userId.trim();
          if(validatiion.validString(userId,"ID"));
          if(validatiion.validObjectId(userId,"ID"));
          const oldest = await filtersData.getOldest(userId);
          return res
          .status(200)
          .render('home/feedPage',{
          partial: "home-script",
          css: "home-css",
          title:"Feed",
          postData:oldest,
        });
        
        } 
        catch (e) {
          if(typeof(e)==='object'){
            return res
              .status(404)
              .render('home/error',{
              partial: "home-script",
              css: "home-css",
              title:"Error",
              error:e});
              // res.status(404).send(e);       
          }
          else{
            return res
              .status(400)
              .render('home/error',{
              partial: "home-script",
              css: "home-css",
              title:"Error",
              error:e});
            // res.status(400).send(e);
          }
        } 
  });
  router
  .route('/newest')
  .get(async (req, res) => {
    try {
          let userId = req.session.user._id.toString();
          userId = userId.trim();
          if(validatiion.validString(userId,"ID"));
          if(validatiion.validObjectId(userId,"ID"));
          const newest = await filtersData.getNewest(userId);
          return res
          .status(200)
          .render('home/feedPage',{
          partial: "home-script",
          css: "home-css",
          title:"Feed",
          postData:newest,
        });
          
        } 
        catch (e) {
          if(typeof(e)==='object'){
            return res
              .status(404)
              .render('home/error',{
              partial: "home-script",
              css: "home-css",
              title:"Error",
              error:e});
              // res.status(404).send(e);       
          }
          else{
            return res
              .status(400)
              .render('home/error',{
              partial: "home-script",
              css: "home-css",
              title:"Error",
              error:e});
            // res.status(400).send(e);
          }
        } 
  });
  router
  .route('/tags')
  .post(async (req, res) => {
    try {
      
          let userId = req.session.user._id.toString();
          userId = userId.trim();
          if(validatiion.validString(userId,"ID"));
          if(validatiion.validObjectId(userId,"ID")); 
          if(validatiion.validString(xss(req.body.tag).trim(),"Tag"));
          const tag = await filtersData.getTag( xss(req.body.tag).trim(),userId);
          return res
          .status(200)
          .render('home/tagPage',{
          partial: "home-script",
          css: "home-css",
          title:"Tag",
          postData:tag,
        });
        } 
        catch (e) {
          if(typeof(e)==='object'){
            // return res
            //   .status(404)
            //   .render('home/error',{
            //   partial: "home-script",
            //   css: "home-css",
            //   title:"Error",
            //   error:e});
              return res.status(404).send(e);       
          }
          else{
            // return res
            //   .status(400)
            //   .render('home/error',{
            //   partial: "home-script",
            //   css: "home-css",
            //   title:"Error",
            //   error:e});
            return res.status(400).send(e);
          }
        } 
  });
  module.exports = router;