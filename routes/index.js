const userRoutes = require('./users');
const postsRoutes= require('./posts');
const savedPostsRoutes= require('./savedPosts');
const homeRoutes= require('./home');
const likesRoutes = require('./likes');
const filtersRoutes = require('./filters');
const commentsRoutes = require('./comments');
const followRequestRoutes = require('./followRequest'); 
const followersRoutes = require('./followers'); 
const followingsRoutes = require('./followings'); 
const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/posts', postsRoutes);
  app.use('/savedPosts', savedPostsRoutes);
  app.use('/home', homeRoutes);
  app.use('/likes', likesRoutes);
  app.use('/filters', filtersRoutes);
  app.use('/comments', commentsRoutes);
  app.use('/followRequest', followRequestRoutes);
  app.use('/followers', followersRoutes);
  app.use('/followings', followingsRoutes);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;

// const userRoutes = require('./users');
// const postsRoutes= require('./posts');
// // const authRoutes = require("./authRoutes");
// const savedPostsRoutes= require('./savedPosts');
// const homeRoutes= require('./home');
// const likesRoutes = require('./likes');
// const followerRoutes = require("./followers");
// const followingRoutes = require("./followings");
// const comments= require("./comments");
// const conversations= require("./conversations");
// const multer = require("multer");
// const path = require('path');
// var fs = require('fs');

// var storage = multer.diskStorage({
//   destination : function(req, file, callBack){
//     callBack(null, "./public/uploads");
//   },
//   filename: function(req, file, callBack){
//     callBack( null, file.originalname);
//   },
// });
// var uploadImage = multer({storage:storage}).single("postContent");
// const constructorMethod = (app) => {
//   // app.use('/', authRoutes);
//   app.use('/users', userRoutes);
//   app.use('/posts', postsRoutes);
//   app.use('/followers', followerRoutes);
//   app.use('/followings', followingRoutes);
//   app.use('/savedPosts', savedPostsRoutes);
//   app.use('/conversations', conversations);
//   app.use('/home', homeRoutes);
//   app.use('/likes', likesRoutes);
//   app.use('/comments', comments);
//   // app.use('/conversations', conversations);

//   app.post("/uploadImage", (req, res) => {
//     uploadImage(req, res, function (e) {
//       if(e)
//         return res.status(500).json("Failed to upload image");
//       let path = req.file.destination + "/" + req.file.filename;
//       console.log(path);
//       path = path.substring(1);
//       return res.json(path);
//     });
//   });

//   app.use('*', (req, res) => {
//     res.status(404).send("Page not found");
//   });
// };
// module.exports = constructorMethod;