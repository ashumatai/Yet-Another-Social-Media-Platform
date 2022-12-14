/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const posts = mongoCollections.posts;
const {ObjectId} = require('mongodb');
const e = require('express');



const getAllPost = async (userId) => {
    if(validatiion.validString(userId,"ID"));
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const postscollection = await posts();
    const userscollection = await users();
    let postData = [];
    const user_data = await userscollection.find({}).toArray();
    const sessionUser = await userscollection.findOne({_id: ObjectId(userId)});
    const sessionUser_savedPosts = sessionUser.savedPosts;
    
    if(user_data.length===0) throw {error:'No user found '};
  
    for (const alldata of user_data) {
        const userPosts = alldata.userPosts;
        // const user_id = alldata._id;
      for (const udata of userPosts) {
        
       
          let post_data = await postscollection.findOne({_id: ObjectId(udata)});
          if(post_data !=null){
            if(sessionUser_savedPosts.length===0){
            }
            else{
              if(sessionUser_savedPosts.includes(udata)){
                post_data.savedPosts = true;
              }
            }
  
            if(post_data.likes.length===0){
            }
            else{
              post_data.noOfLikes = post_data.likes.length;
              if(post_data.likes.includes(userId)){
                post_data.hasLiked = true;
              }
            }
            post_data.userName = alldata.userName;
            post_data.profilePicture = alldata.profilePicture;
            postData.push(post_data);
          }
          
       
       
      }
  }
    if(postData.length===0) throw {error:'No posts found '};
    return postData; 
  };
  // const getFollowersPost = async (userId) => {
  //   if(validatiion.validObjectId(userId,"ID"));
  //   userId = userId.trim();
  //   const userscollection = await users();
  //   const postscollection = await posts();
  //   let postData = [];
  //   const user_data = await userscollection.findOne({_id: ObjectId(userId)});
  //   if(user_data === null) throw {error:'No user found with '+userId};
  //   const followerstData = user_data.followers;
  //   for (const fdata of followerstData) {
  //       const follower_data = await userscollection.findOne({_id: ObjectId(fdata)});
  //       const follower_post = follower_data.userPosts;
  //       for (const data of follower_post) {
  //           postData.push(await postscollection.findOne({_id: ObjectId(data)}));
  //         }
  //   }
    
  //   if(postData.length===0) throw {error:'No posts found '};
    
  //   return postData; 

    
  // };
  const getFollowingPost = async (userId) => {
    if(validatiion.validString(userId,"ID"));
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followingtData = user_data.followings;
    // console.log(followingtData);
    // console.log(typeof(followingtData));
    if(followingtData === undefined || followingtData===null){
      throw {error:'No followings found to show feed '};
    }
    const sessionUser_savedPosts = user_data.savedPosts;
    for (const fdata of followingtData) {
        const following_data = await userscollection.findOne({_id: ObjectId(fdata)});
        const following_post = following_data.userPosts;
        for (const data of following_post) {
            let pdata = await postscollection.findOne({_id: ObjectId(data)});
            if(pdata!=null){
                // console.log(sessionUser_savedPosts);
                if(sessionUser_savedPosts.includes(data)){
                  pdata.savedPosts = true;
              }
              else{
                //do nothing
              }
              if(pdata.likes.includes(userId)){
                  pdata.hasLiked = true;
              }
              else{
                //do nothing
              }
                pdata.userName = following_data.userName;
                pdata.profilePicture = following_data.profilePicture;
                pdata.noOfLikes = pdata.likes.length;
                postData.push(pdata);
            }
            
          }
    }
    
    if(postData.length===0) throw {error:'No posts found '};
    return postData; 
  };
  module.exports = {
    getAllPost:getAllPost,
    // getFollowersPost:getFollowersPost,
    getFollowingPost:getFollowingPost
  };