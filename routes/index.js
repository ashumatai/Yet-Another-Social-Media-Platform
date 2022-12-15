const userRoutes = require('./users');
const postsRoutes= require('./posts');
const authRoutes = require("./authRoutes");
const savedPostsRoutes= require('./savedPosts');
const homeRoutes= require('./home');
const likesRoutes = require('./likes');
const followerRoutes = require("./followers");
const followingRoutes = require("./followings");

const constructorMethod = (app) => {
  app.use('/', authRoutes);
  app.use('/users', userRoutes);
  app.use('/posts', postsRoutes);
  app.use('/followers', followerRoutes);
  app.use('/followings', followingRoutes);
  app.use('/savedPosts', savedPostsRoutes);
  app.use('/home', homeRoutes);
  app.use('/likes', likesRoutes);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;