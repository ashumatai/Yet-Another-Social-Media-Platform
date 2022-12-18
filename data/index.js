conversations = require("./conversations");
posts = require("./posts");
users = require("./users");
savedPost = require("./savedPosts");
home = require("./home");
likes = require("./likes");
filters = require("./filters");
comments = require("./comments");
followRequest = require("./followRequest");
followers = require("./followers");
followings = require("./followings");
module.exports = {
    posts:posts,
    users:users,
    savedPost:savedPost,
    conversations:conversations,
    home:home,
    likes:likes,
    filters:filters,
    comments:comments,
    followRequest:followRequest,
    followers:followers
};
