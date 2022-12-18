/**
 * @author Deepali Nagwade <dnagwade@stevens.edu>
 * */

const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');

const postComment = async (postId, userId, commentContent) => {

  try{
    helper.validString(postId);
    helper.validObjectId(postId); 
    helper.validString(userId);
    helper.validObjectId(userId); 
    helper.validString(commentContent);
    commentContent= commentContent.trim().toLowerCase();
    if(commentContent.length>20){
      throw [400,'Comments length can not exceed 20 characters'];
  }

  }
  catch(e){
    console.log(e);
    throw e;
  }
  
  const postCollection = await posts();
  const postD = await postCollection.findOne({ _id: ObjectId(postId)});
  console.log(postD);

  if(postD === null)
    throw [400,"Post does not exists"];

  const newComment = {
    _id: new ObjectId(),
    postId: postId,
    userId: userId,
    commentContent
  };

  console.log(newComment);

  let commentArray=[];
  const addComment = await postCollection.updateOne(
    {_id: ObjectId(postId)},
    {$push: {comments: newComment}}
  )
  if(!addComment.matchedCount && !addComment.modifiedCount)
    throw [500,"Comment has not been posted!"];

    const postedComment= await postCollection.findOne({ _id: ObjectId(postId)});
    if(postedComment===null){
      throw [404,"please try again. this id doesn't exists"];
    }

  commentArray.push(postedComment);

  const post1 = await postCollection.findOne({ _id: ObjectId(postId)});    
  
  if (post1 === null)
    throw [400,"No Post found with that id"];

  post1._id = post1._id.toString();   

  for(let key in post1) {
    if(typeof post1[key] === 'object' && key === "comments") {
      if(Array.isArray(post1[key])) {
        for(let i = 0; i < post1[key].length; i++) {
          post1[key][i]._id = post1[key][i]._id.toString();
        }
      }
    }
  }
  return post1;
};

const getCommentsByPostId = async (postId) => {
  try{
    helper.validString(postId);
    helper.validObjectId(postId); 
  }
  catch(e){
    throw e;
  }
  
  const postCollection = await posts();
  const post = await postCollection.findOne({ _id: ObjectId(postId)});

  if (post === null)
      throw [404,"No Post found with that id"];

  post.comments.forEach(element => {
      element._id = element._id.toString();
  })
  if(post.comments.length===0){
    throw [404,"No Comments found with this post"];
  }
  return post.comments;
};

module.exports = {
  postComment,
  getCommentsByPostId
};