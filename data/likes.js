/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const posts = mongoCollections.posts;
const {ObjectId} = require('mongodb');


  const addLikes = async (userId,postId) => {
    if(validatiion.validObjectId(userId,"ID"));
    if(validatiion.validObjectId(postId,"ID"));
    userId = userId.trim();
    postId = postId.trim();
    const postscollection = await posts();
    const post_data = await postscollection.updateOne({_id: ObjectId(postId)},{$push:{"likes":userId}});
    if(post_data.modifiedCount === 0){
      throw 'Could not like the post successfully';
    }
    return true; 
  };
  const deleteLikes = async (userId,postId) => {
    if(validatiion.validObjectId(userId,"ID"));
    if(validatiion.validObjectId(postId,"ID"));
    userId = userId.trim();
    postId = postId.trim();
    const postscollection = await posts();
    const post_data = await postscollection.updateOne({_id: ObjectId(postId)},{$pull:{"likes":userId}});
    if(post_data.modifiedCount === 0){
      throw 'Could not delete liked post successfully';
    }
    return true; 
  };


  module.exports = {
    
    addLikes:addLikes,
    deleteLikes:deleteLikes
  };