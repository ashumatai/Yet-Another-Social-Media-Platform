const userRoutes = require('./users');
const postsRoutes= require('./posts');
const savedPosts= require('./savedPosts');

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/posts', postsRoutes);
  app.use('/savedPosts', savedPosts);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;