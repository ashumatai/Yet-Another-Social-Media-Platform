const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const posts = mongoCollections.posts;
const {ObjectId} = require('mongodb');



const getAllPost = async () => {
    const postscollection = await posts();
   
    const post_data = await postscollection.find({}).toArray();
    if(post_data.length===0) throw {error:'No posts found '};
    return post_data; 
  };
  const getFollowersPost = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followerstData = user_data.followers;
    for (const fdata of followerstData) {
        const follower_data = await userscollection.findOne({_id: ObjectId(fdata)});
        const follower_post = follower_data.userPosts;
        for (const data of follower_post) {
            postData.push(await postscollection.findOne({_id: ObjectId(data)}));
          }
    }
    
    if(postData.length===0) throw {error:'No posts found '};
    
    return postData; 

    
  };
  const getFollowingPost = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followingtData = user_data.followings;
    for (const fdata of followingtData) {
        const following_data = await userscollection.findOne({_id: ObjectId(fdata)});
        const following_post = following_data.userPosts;
        for (const data of following_post) {
            postData.push(await postscollection.findOne({_id: ObjectId(data)}));
          }
    }
    
    if(postData.length===0) throw {error:'No posts found '};
    return postData; 
  };
  module.exports = {
    getAllPost:getAllPost,
    getFollowersPost:getFollowersPost,
    getFollowingPost
  };