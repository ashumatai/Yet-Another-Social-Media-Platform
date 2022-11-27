const userRoutes = require('./users');
const postsROutes= require('./posts')

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('*', (req, res) => {
    res.status(404).send("Page not found");
  });
};
module.exports = constructorMethod;