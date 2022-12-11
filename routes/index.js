const userRoutes = require('./users');
const postsRoutes= require('./posts');
const savedPostsRoutes= require('./savedPosts');
const homeRoutes= require('./home');
const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/posts', postsRoutes);
  app.use('/savedPosts', savedPostsRoutes);
  app.use('/home', homeRoutes);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;