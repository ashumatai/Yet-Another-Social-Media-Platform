const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const posts = mongoCollections.posts;
const {ObjectId} = require('mongodb');



const getsavedPost = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const savedPostData = user_data.savedPosts;
    for (const data of savedPostData) {
      postData.push(await postscollection.findOne({_id: ObjectId(data)}));
    }
    if(postData.length===0) throw {error:'No saved posts found  '+userId};
    return postData; 
  };

  module.exports = {
    getsavedPost:getsavedPost,
  };