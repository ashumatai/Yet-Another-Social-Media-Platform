const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const {ObjectId} = require('mongodb');

router
  .route('/').get(async (req, res) => {

  });

router
  .route('/:userId').get(async (req, res) => {
   
});

router
  .route('/:userId').delete(async (req, res) => {
     
  });
  
  router
  .route('/:userId').put(async (req, res) => {

});
  module.exports = router;