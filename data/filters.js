/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const posts = mongoCollections.posts;
const {ObjectId} = require('mongodb');




  const getMostLikes = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followingtData = user_data.followings;
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
    return postData.sort( (a,b) => b.noOfLikes - a.noOfLikes );
  };
  const getOldest = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followingtData = user_data.followings;
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
    let sortedData = postData.sort( (a,b) => {
        let [month, day, year] = a.date.split('/');

        const aDate = new Date(+year, month - 1, +day);
        const atimestamp = aDate.getTime();
        let [mm, dd, yyyy] = b.date.split('/');

        const bDate = new Date(+yyyy, mm - 1, +dd);
        const btimestamp = bDate.getTime();
        return atimestamp - btimestamp;
    });
    return  sortedData
  };
  const getNewest = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followingtData = user_data.followings;
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
    let sortedData = postData.sort( (a,b) => {
        let [month, day, year] = a.date.split('/');

        const aDate = new Date(+year, month - 1, +day);
        const atimestamp = aDate.getTime();
        let [mm, dd, yyyy] = b.date.split('/');

        const bDate = new Date(+yyyy, mm - 1, +dd);
        const btimestamp = bDate.getTime();
        return btimestamp - atimestamp;
    });
    return  sortedData
  };
  const getTag = async (tag,userId) => {
    if(validatiion.validString(tag,"Tag"));
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    tag = tag.trim();
    tag =tag.toLowerCase();
    const userscollection = await users();
    const postscollection = await posts();
    let postData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const sessionUser_savedPosts = user_data.savedPosts;
    const allpost = await postscollection.find({"tags": tag }).toArray();
    if(allpost === null) throw {error:'No posts found '};
    for (const data of allpost) {
      const postsUser = await userscollection.findOne({"userPosts": data._id.toString() });
      if(postsUser === null) throw {error:'No user found with this post'};
      data.userName = postsUser.userName;
      data.profilePicture = postsUser.profilePicture;
      if(sessionUser_savedPosts.includes(data)){
        data.savedPosts = true;
      }
      else{
        //do nothing
      }
      if(data.likes.includes(userId)){
          data.hasLiked = true;
      } 
      else{
        //do nothing
      }
      data.noOfLikes = data.likes.length;
      postData.push(data);
    }
    
    if(postData.length===0) throw {error:'No posts found '};
    return postData
  };
  module.exports = {
    
    getMostLikes:getMostLikes,
    getOldest:getOldest,
    getNewest:getNewest,
    getTag:getTag
  };