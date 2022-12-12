const express = require('express');
const { getAllUsers } = require('../data/users');
const router = express.Router();

router
  .route('/').get(async (req, res) => {
    try {
      const allUsers = await getAllUsers();
      res.json(allUsers);
    }
    catch(error) {
      res.status(error.code).send(error.error);
    }
  });

router
  .route('/:userId').get(async (req, res) => {
   res.send("Get by id working!")
});

router
  .route('/:userId').delete(async (req, res) => {
     res.send("Delete working!")
  });
  
  router
  .route('/:userId').put(async (req, res) => {
    res.send("Put working!")
});
  module.exports = router;