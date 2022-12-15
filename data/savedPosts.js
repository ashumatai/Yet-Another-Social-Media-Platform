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

  const addsavedPost = async (userId,postId) => {
    if(validatiion.validObjectId(userId,"ID"));
    if(validatiion.validObjectId(postId,"ID"));
    userId = userId.trim();
    postId = postId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    const postExists = await postscollection.findOne({_id: ObjectId(postId)});
    if(postExists === null){
      return false;
    }
    else{
      const user_data = await userscollection.updateOne({_id: ObjectId(userId)},{$push:{"savedPosts":postId}});
      if(user_data.modifiedCount === 0){
        throw 'Could not save the post successfully';
      }
      return true; 
    }
   
  };
  const deletesavedPost = async (userId,postId) => {
    if(validatiion.validObjectId(userId,"ID"));
    if(validatiion.validObjectId(postId,"ID"));
    userId = userId.trim();
    postId = postId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    const postExists = await postscollection.findOne({_id: ObjectId(postId)});
    if(postExists === null){
      return false;
    }
    else{
      const user_data = await userscollection.updateOne({_id: ObjectId(userId)},{$pull:{"savedPosts":postId}});
      if(user_data.modifiedCount === 0){
        throw 'Could not delete saved post successfully';
      }
      return true;
    }
     
  };


  module.exports = {
    getsavedPost:getsavedPost,
    addsavedPost:addsavedPost,
    deletesavedPost:deletesavedPost
  };