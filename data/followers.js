const validatiion = require('../helpers/validations');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');


  const getFollowers = async (userId) => {
    if(validatiion.validObjectId(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    let followersAllData = [];
    const user_data = await userscollection.findOne({_id: ObjectId(userId)});
    if(user_data === null) throw {error:'No user found with '+userId};
    const followerstData = user_data.followers;
    for (const fdata of followerstData) {
        followersAllData.push(await userscollection.findOne({_id: ObjectId(fdata)}));
    }
    
    if(followersAllData.length === 0) throw {error:'No Followers found for  '+userId};
    return followersAllData; 
  };

  const follow = async (senderId, receiverId) => {
    validatiion.validObjectId(senderId, "ID");
    validatiion.validObjectId(receiverId, "ID");
  
    const userCollection = await users();
    const updatedInfo = await userCollection.updateOne(
      { _id: ObjectId(receiverId) },
      { $push: { followRequests: senderId } }
    );
    if (updatedInfo.modifiedCount === 0) return false;
    return { senderId: senderId, inserted: true };
  };
 
  module.exports = {
   getFollowers,
   follow,
  };