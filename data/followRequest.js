/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');


  const getFollowRequest = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    let requestData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const data = user_data.followRequests;
    for (const x of data) {
        requestData.push(await userscollection.findOne({_id: ObjectId(x)}));
    }
    
    if(requestData.length === 0) {
        return false;
    }
    else{
        return requestData; 
    }
    
  };

  const acceptFollowRequest = async (userId,acceptedId) => {
    if(validatiion.validObjectId(userId,"ID"));
    if(validatiion.validObjectId(acceptedId,"ID"));
    userId = userId.trim();
    acceptedId = acceptedId.trim();
    const userscollection = await users();
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    const acceptedUser = await userscollection.findOne({_id: ObjectId(acceptedId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    if(acceptedUser === null) return false;
    const removedFromFolloweRequest = await userscollection.updateOne({_id: ObjectId(userId)},{$pull:{"followRequests":acceptedId}});
    if(removedFromFolloweRequest.modifiedCount === 0){
        throw 'Could not remove user from followeRequest List successfully';
    }
    const addedToFollowers = await userscollection.updateOne({_id: ObjectId(userId)},{$push:{"followers":acceptedId}});
    if(addedToFollowers.modifiedCount === 0){
        throw 1;
    }
    return true;
    
  };
  const deleteFollowRequest = async (userId,declinedId) => {
    if(validatiion.validObjectId(userId,"ID"));
    if(validatiion.validObjectId(declinedId,"ID"));
    userId = userId.trim();
    declinedId = declinedId.trim();
    const userscollection = await users();
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    const declinedUser = await userscollection.findOne({_id: ObjectId(declinedId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    if(declinedUser === null) return false;
    const removedFromFolloweRequest = await userscollection.updateOne({_id: ObjectId(userId)},{$pull:{"followRequests":declinedId}});
    if(removedFromFolloweRequest.modifiedCount === 0){
        throw 1;
    }
    return true;
    
  };
 
  module.exports = {
   getFollowRequest:getFollowRequest,
   acceptFollowRequest:acceptFollowRequest,
   deleteFollowRequest:deleteFollowRequest
  };