const comments = require("./comments");
const conversations = require("./conversations");
const followers = require("./followers");
const followings = require("./followings");
const home = require("./home");
const likes = require("./likes");
const posts = require("./posts");
const savedPost = require("./savedPosts");
const users = require("./users");

module.exports = {
    comments,
    conversations,
    followers,
    followings,
    home,
    likes,
    posts,
    savedPost,
    users: users,
};
