const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const {ObjectId} = require('mongodb');


router
  .route('/').get(async (req, res) => {
    
  });

router
  .route('/:postId').post(async (req, res) => {
   
});

router
  .route('/:postId').delete(async (req, res) => {
     
  });
  
  router
  .route('/:postId').put(async (req, res) => {

});
  module.exports = router;