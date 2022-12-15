/**
 * @author Kajol Rajesh Shah <kajol.shsh@gmail.com>
 * */
const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');


  const getFollowings = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    let followingsAllData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followingstData = user_data.followings;
    for (const fdata of followingstData) {
        followingsAllData.push(await userscollection.findOne({_id: ObjectId(fdata)}));
    }
    
    if(followingsAllData.length === 0) throw {error:'No Followings found for  '+userId};
    return followingsAllData; 
  };
 
  module.exports = {
   getFollowings:getFollowings
  };