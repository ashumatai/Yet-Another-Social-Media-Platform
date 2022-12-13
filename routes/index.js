const userRoutes = require('./users');
const postsRoutes= require('./posts');
const savedPosts= require('./savedPosts');
const authRoutes = require("./authRoutes");

const constructorMethod = (app) => {
  app.use('/', authRoutes);
  // app.use('/', userRoutes);
  // app.use('/', postsRoutes);
  // app.use('/', savedPosts);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;