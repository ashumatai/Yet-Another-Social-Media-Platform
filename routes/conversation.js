/**
 * @author Deepali Nagwade <dnagwade@stevens.edu>
 * */
const express = require('express');
const router = express.Router();
const helper = require('../helpers/validations');
const data = require('../data');
const convoData = data.conversations;
const {ObjectId} = require('mongodb');

/**
* Function to get all conversations of a user
 */
router.route('/').get(async (req, res) => {
  try {
    //const userId= req.session.userId;
    let userId = "639518baec8160da0010d848";
    if(helper.validObjectId(userId, "ID"));
    userId = userId.trim();

    const convo  = await convoData.getAllConversations(userId);
    if(convo.length){
      res.json(convo);
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json(e);
  }
});


/**
* Function to get conversations of a user with a particular User
 * @param {string} userId - ID of the other user.
 */
router.route('/:userId').get(async (req, res) => {
  try {
  //const userId= req.session.userId;
  let userId= '639518baec8160da0010d848';
  let otherUserId = req.params.userId;

  if(helper.validObjectId(userId, "ID"));
  if(helper.validObjectId(otherUserId, "ID"));
  userId = userId.trim();
  otherUserId = otherUserId.trim();

  let currentConvo= await convoData.getCovnversationsByUserId(userId, otherUserId);
  return res.status(200).json(currentConvo);
} catch(e){
  return res.status(404).json(e);
}
});

/**
* Function to start a conversations with a user for first time
* @param {string} userId - ID of the signedIn user.
 * @param {string} otherUserId - ID of the other user.
 * @param {string} message - content of the message.
 */
router.route('/:startConvo').post(async (req, res) => {
  try {
    //const userId = req.session.user.userId;
    let userId= "639518baec8160da0010d848";
    let messageInfo= req.body;

    if(helper.validObjectId(userId, "ID"));
    if(helper.validObjectId(messageInfo.otherUserId, "ID"));
    if(helper.validString(messageInfo.message, "Message"));

    userId = userId.trim();
    messageInfo.otherUserId = messageInfo.otherUserId.trim();
    messageInfo.message = messageInfo.message.trim();

    const addMessage= await convoData.addMessage(userId, messageInfo.otherUserId, messageInfo.message);
    return res.json("Message sent successfully!!!!");
  } catch (e) {
    console.log(e);
    return res.status(404).json(e); 
  }
});

router.route('/:userId').delete(async (req, res) => {


});

module.exports = router;