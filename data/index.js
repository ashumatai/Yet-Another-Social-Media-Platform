const userData = require('./users');
const postData = require('./posts');
const savedPostsData= require('./savedPosts');

module.exports = {
  users: userData,
  posts: postData,
  savedPosts: savedPostsData
};