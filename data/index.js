const conversations = require("./conversations");
const posts = require("./posts");
const users = require("./users");
const savedPost = require("./savedPosts");
const home = require("./home");
const likes = require("./likes")
module.exports = {
    posts,
    users,
    savedPost,
    conversations,
    home,
    likes
};
