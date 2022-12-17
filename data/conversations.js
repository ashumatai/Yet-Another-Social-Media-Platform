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

const getAllConversations = async (userId) => {

  helper.validString(userId);
  helper.validObjectId(userId);

  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(userId)});
  
  if (!user)
    throw [404, "No User found with that ID"];

  if(user.directMessageIds.length===0){
    throw [404, "No Conversations found"];
  }

  const convoCollection = await conversations();
  let conversationObject={}, conversationData=[]
  // console.log(user.directMessageIds);
  for (const convo of user.directMessageIds) {
     console.log(convo);
    //conversationObject.push(await convoCollection.findOne({_id: ObjectId(convo._id)}));
    conversationObject.userName=convo.userName;
    conversationObject.profilePicture=convo.profilePicture;
    
  }
  console.log(conversationObject);
  return conversationObject;
}

const getCovnversationsByUserId = async (userId, otherUserId) => {
  if(userId===otherUserId){
    throw [400, 'Can not chat with yourself'];
  }
  try {
    helper.validString(userId);
    helper.validObjectId(userId);
    helper.validString(otherUserId);
    helper.validObjectId(otherUserId);
    helper.validString(message);
    
  } catch (e) {
      throw e;
  }
  userId = utils.parseObjectId(userId);
  otherUserId = utils.parseObjectId(otherUserId);

  const userCollection = await users();
  const user = await userCollection.findOne(
    { $and: [{ _id: userId }, { "directMessageIds.userId": otherUserId }]},
    { projection: { _id: 0, "directMessageIds.$": 1 }} 
  );
  console.log(user);

  if (!user || !user.directMessageIds || !user.directMessageIds.length) {
    await startConversation(userId.toString(), otherUserId.toString());
    return await getCovnversationsByUserId(userId.toString(), otherUserId.toString());
  }

  //need to check this
  user.directMessageIds[0] = addMessage(user.directMessageIds[0]);
  return user.directMessageIds[0];
}

const startConversation = async (userId, otherUserId) => {
  if(userId===otherUserId){
    throw [400, 'You can not chat with yourself!!!'];
  }
  try {
    helper.validString(userId);
    helper.validObjectId(userId);
    helper.validString(otherUserId);
    helper.validObjectId(otherUserId);
  } catch (e) {
      throw e;
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
    throw [500, 'Could not start Conversation'];
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
    throw [500, 'Could not start Conversation'];
  }
}

const addMessage = async (userId, otherUserId, message) => {

  if(userId===otherUserId){
    throw [400, 'You can not chat with yourself!!!'];
  }
  try {
    helper.validString(userId);
    helper.validObjectId(userId);
    helper.validString(otherUserId);
    helper.validObjectId(otherUserId);
    helper.validString(message);   
  } catch (e) {
      throw e;
  }

  console.log(message);
  if(ObjectId.isValid(message)){
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectId(message)});
    if(post){
      message=post.postContent;
      console.log(message);
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
      throw [500, 'Could not add messages!!'];
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
      throw [500, 'Could not add messages!!'];
    }
  } catch(e){
    // console.log(userData);
    // console.log(data);
    const userCollection = await users();
    const sender = await userCollection.findOne({_id: ObjectId(userId)});
    const receiver = await userCollection.findOne({_id: ObjectId(otherUserId)});
    //const receiver = await userData.getUserById(otherUserId);
    //check with error code
    if(1){
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
      // console.log(senderConvo);
      // console.log(userId);
      updateInfo = await userCollection.updateOne(
        {_id: ObjectId(userId) },
        { $push: { directMessageIds: senderConvo } }
      );
      // console.log(updateInfo);
      if (updateInfo.matchedCount === 0 && updateInfo.modifiedCount === 0) {
        throw [500, 'Could not add messages!!'];
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
        throw [500, 'Could not send messages!!'];
      }
    } else{
      throw "oops!!! something is wrong."
    }
    return "message sent successfully!!!!"
  }
}

module.exports = {
  startConversation,
  getAllConversations,
  getCovnversationsByUserId,
  addMessage,
};
