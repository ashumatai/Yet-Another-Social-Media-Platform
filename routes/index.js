const userRoutes = require('./users');
const postsRoutes= require('./posts')

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/', postsRoutes);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;