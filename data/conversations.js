/**
 * @author Deepali Nagwade <dnagwade@stevens.edu>
 * */
const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');
const data = require('../data');
const userData = data.users;
const posts = mongoCollections.posts;
const users = mongoCollections.users;
const conversations = mongoCollections.conversations;
const moment = require("moment");


/**
* Function to get all followers of a user to start a chat
 * @param {string} userId - ID of the signedIn user.
 */
const getFollowers = async (userId) => {

  if(helper.validObjectId(userId, "ID"));
  userId = userId.trim();
  const usercollection = await users();
  let followersAllData = [];
  const userData = await usercollection.findOne( {_id: ObjectId(userId)} );

  if(!userData) 
    throw {error: 'No user found with '+ userId};
      
  const followersData = userData.followers;
  for (const fdata of followersData) {
    followersAllData.push(await usercollection.findOne({_id: ObjectId(fdata)}));
  }
  
  if(followersAllData.length === 0)
    throw {error:'No Followers found for  '+ userId};

  return followersAllData; 
};


/**
* Function to get all conversations of a user
 * @param {string} userId - ID of the signedIn user.
 */
const getAllConversations = async (userId) => {

  if (helper.validString(userId, "ID"));
  if (helper.validObjectId(userId, "ID"));

  userId=userId.trim();
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(userId)});
  
  if (!user)
    throw {statusCode: 404, error: 'No user found with '+ userId};

  if(user.directMessageIds.length===0){
    throw {statusCode: 404, error: 'No conversations found for user '+ userId};
  }

  let conversationObject={};
  for (const convo of user.directMessageIds) {
    conversationObject.userName=convo.userName;
    conversationObject.profilePicture=convo.profilePicture; 
  }
  return conversationObject;
}

/**
* Function to get conversations of a user with a particular user
 * @param {string} userId - ID of the signedIn user.
 * @param {string} otherUserId - ID of the other user.
 */
const getCovnversationsByUserId = async (userId, otherUserId) => {
  if (helper.validObjectId(userId, "ID"));
  if (helper.validObjectId(otherUserId, "ID"));
  if (helper.validString(otherUserId));
  if (helper.validString(otherUserId));

  userId=userId.trim();
  otherUserId=otherUserId.trim();

  if(userId === otherUserId){
    throw {statusCode: 400, error: 'You Can not chat with yourself!'};
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(userId)});
  
  let resultData={};
  const objectData= user.directMessageIds;
  if(objectData.length>0){
    objectData.forEach(element => {
      if(element.userId===otherUserId)
        resultData=element.message;
      });
    }
  return resultData;
}

/**
* Function to start a conversations with a user for first time
 * @param {string} userId - ID of the signedIn user.
 * @param {string} otherUserId - ID of the other user.
 */
const startConversation = async (userId, otherUserId) => {

  if (helper.validObjectId(userId, "ID"));
  if (helper.validObjectId(otherUserId, "ID"));
  if (helper.validString(otherUserId));
  if (helper.validString(otherUserId));

  userId=userId.trim();
  otherUserId=otherUserId.trim();

  if(userId===otherUserId){
    throw {statusCode: 400, error: 'You Can not chat with yourself!'};
  }
    
  const userCollection = await users();
  const sender = await userData.getUserById(userId);
  const receiver = await userData.getUserById(otherUserId);

  const myNewConvo = {
    _id: ObjectId(),
    userId: otherUserId,
    userName: receiver.userName,
    profilePicture: receiver.profilePicture,
    message: [],
  };

  let updateInfo = await userCollection.updateOne(
    { _id: userId },
    { $push: { directMessageIds: myNewConvo } }
  );

  if (updateInfo.matchedCount == 0 && updateInfo.modifiedCount == 0) {
    throw {statusCode: 500, error: 'Could not start Conversation!!'};
  }

  const ReceiverNewConvo = {
    _id: ObjectId(),
    userId: userId,
    userName: sender.userName,
    profilePicture: sender.profilePicture,
    message: [],
  };

  updateInfo = await userCollection.updateOne(
    { _id: userId },
    { $push: { directMessageIds: ReceiverNewConvo } }
  );
  if (updateInfo.matchedCount === 0 && updateInfo.modifiedCount === 0) {
    throw {statusCode: 500, error: 'Could not start Conversation!!'};
  }
}

/**
* Function to add message into conversations to both sender and receiver's database
 * @param {string} userId - ID of the signedIn user.
 * @param {string} otherUserId - ID of the other user.
 * @param {string} message - content of the message.
 */
const addMessage = async (userId, otherUserId, message) => {

  if (helper.validObjectId(userId, "ID"));
  if (helper.validObjectId(otherUserId, "ID"));
  if (helper.validString(otherUserId));
  if (helper.validString(otherUserId));

  userId=userId.trim();
  otherUserId=otherUserId.trim();

  if(userId===otherUserId){
    throw {statusCode: 400, error: 'You Can not chat with yourself!'};
  }

  //to check if shared content is a post
  if(ObjectId.isValid(message)){
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectId(message)});
    if(post){
      message=post.postContent;
    }
  }

  //logic for updating messages here
  try {
    const senderConvo = await getCovnversationsByUserId(userId, otherUserId);
    const receiverConvo = await getCovnversationsByUserId(otherUserId, userId);

    const userCollection = await users();
    let time= moment().format('LLLL');

    const senderNewMsg= {
      _id: ObjectId(),
      message: message,
      isSent: true,
      time: time,
    };

    if(!senderConvo.message && !Array.isArray(senderConvo.message)){
      senderConvo.message = [senderNewMsg];
    } else{
      senderConvo.push(senderNewMsg);
    }

    let updateInfo = await userCollection.updateOne(
      { $and: [{ _id: userId }, { "directMessageIds.userId": otherUserId }] },
      { $set: { "directMessageIds.$": senderConvo } }
    );
    if (updateInfo.matchedCount === 0 && updateInfo.modifiedCount === 0) {
      throw {statusCode: 500, error: 'Could not update messages!!'};
    }

    const receiverNewMsg= {
      _id: ObjectId(),
      message: message,
      isSent: false,
      time: time,
    };

    if(!receiverConvo.message && !Array.isArray(receiverConvo.message)){
      receiverConvo.message = [receiverNewMsg];
    } else{
      receiverConvo.push(receiverNewMsg);
    }

    updateInfo = await userCollection.updateOne(
      { $and: [{ _id: userId }, { "directMessageIds.userId": userId }] },
      { $set: { "directMessageIds.$": receiverConvo } }
    );
    if (updateInfo.matchedCount === 0 && updateInfo.modifiedCount === 0) {
     throw {statusCode: 500, error: 'Could not update messages!!'};
    }
  } catch(e){
    const userCollection = await users();
    const sender = await userCollection.findOne({_id: ObjectId(userId)});
    const receiver = await userCollection.findOne({_id: ObjectId(otherUserId)});
    //check with error code type
    if((1)){
      const userCollection = await users();
      const senderConvo = {
        _id: ObjectId(),
        userId: otherUserId,
        userName: receiver.userName,
        profilePicture: receiver.profilePicture,
        message: [{
          _id: ObjectId(),
          message: message,
          isSent: true,
          time: new Date(),
        }],
      };
      updateInfo = await userCollection.updateOne(
        {_id: ObjectId(userId) },
        { $push: { directMessageIds: senderConvo } }
      );
      if (updateInfo.matchedCount === 0 && updateInfo.modifiedCount === 0) {
        throw {statusCode: 500, error: 'Could not update messages!!'};
      }
      const receiverConvo = {
        _id: ObjectId(),
        userId: userId,
        userName: sender.userName,
        profilePicture: sender.profilePicture,
        message: [{
          _id: ObjectId(),
          message: message,
          isSent: false,
          time: senderConvo.message[0].time
        }],
      };
      updateInfo = await userCollection.updateOne(
        {_id: ObjectId(otherUserId) },
        { $push: { directMessageIds: receiverConvo } }
      );
      if (updateInfo.matchedCount === 0 && updateInfo.modifiedCount === 0) {
        throw {statusCode: 500, error: 'Could not update messages!!'};
      }
    } else{
      throw {statusCode: 400, error: 'oops!!! something is wrong.'};
    }
    return "message sent successfully!!!!"
  }
}


// const deleteConversation = async (directMessageIds) => { 

  
//   const userCollection = await users();
//   const user = await userCollection.find({}).toArray();
//   //console.log(user);
//   if(user=== null)
//     throw [400,"This user ID does not exists"];
  
//   movie.forEach(element => {
//     element.reviews.forEach(data => {
//       if(data._id.toString() === reviewId) {
//         movieID = element._id;
//         console.log(movieID)
//       }
//     })
//   });
//   const removeReview = await movieCollection.updateMany({}, {$pull: {reviews: {_id: ObjectId(reviewId)}}});   
//   console.log(removeReview);
//   if(!removeReview.matchedCount && !removeReview.modifiedCount)
//     throw [500,"Can't remove this Review"];
        
//   const movieReview = await movieCollection.find({}).toArray();
//   console.log("this is movieReview");
//   //console.log(movieReview);
//   if(movieReview === null)
//     throw [404,"No review present with that Id"];

//   movieReview.forEach(element => {
//     if(element._id.toString() === movieID.toString()) {
//       element.reviews.forEach(data => {
//         avgRating += data.rating;
//     })
//     avgRating = (avgRating/element.reviews.length);
//     }
//   });

//   if(isNaN(avgRating)){
//     avgRating=0;
//   }

//   avgRating= Math.round(avgRating * 10) / 10; 
//   const reviewUpdate = await movieCollection.updateOne(
//       {_id: ObjectId(movieID)},
//       {$set: {overallRating: avgRating}}
//   )

//   if(!reviewUpdate.matchedCount && !reviewUpdate.modifiedCount)
//       throw [500,"Update of the rating has been failed"];

//   // resultData = {"reviewId": reviewId, "deleted": true};  
//   // return resultData;

//   const movieReturned= await movieCollection.findOne({ _id: ObjectId(movieID)});
//   return movieReturned;
  
// }

module.exports = {
  startConversation,
  getAllConversations,
  getCovnversationsByUserId,
  addMessage,
  getFollowers
};