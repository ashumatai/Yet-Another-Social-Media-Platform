const userRoutes = require('./users');
const postsRoutes= require('./posts');
const savedPosts= require('./savedPosts');
const commentRoutes= require('./comments');
const multer = require("multer");
const path = require('path');
var fs = require('fs');

var storage = multer.diskStorage({
  destination : function(req, file, callBack){
    callBack(null, "./public/uploads");
  },
  filename: function(req, file, callBack){
    callBack( null, file.originalname);
  },
});
var uploadImage = multer({storage:storage}).single("postContent");
const constructorMethod = async (app) => {
  app.use('/users', userRoutes);
  app.use('/posts', postsRoutes);
  app.use('/savedposts', savedPosts);
  app.use('/comments', commentRoutes);

  app.post("/uploadImage", (req, res) => {
    uploadImage(req, res, function (e) {
      console.log(req.file.destination);
      if (e) {
        console.log(e);
        return res.status(500).json("Failed to upload image");
      }
      let path = req.file.destination + "/" + req.file.filename;
      console.log(path);
      path = path.substring(1);
      return res.json(path);
    });
  });

  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;