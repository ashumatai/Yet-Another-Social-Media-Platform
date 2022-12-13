const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');
const { posts } = require('../config/mongoCollections');

const getAllPosts = async () => {

  const postsCollection= await posts();
  const postsList = await postsCollection.find().toArray();
  if (!postsList) 
    throw 'Could not get all posts';
  resultArray=[];
  postsList.forEach(post => {
    resultObject={}
    post['_id'] = post['_id'].toString();
    resultObject._id=post['_id']
    // resultObject.title=post.title;
    resultArray.push(resultObject);
  }); 

  return resultArray;
};

const getPostById = async (postId) => {
  if (!postId)
    throw [400,"You must provide an ID"];
  if (typeof postId !== 'string' || postId.trim().length===0)
    throw [400,"Please provide a valid ID"];
  if(!ObjectId.isValid(postId))
    throw [400,"The ID is not a valid Object ID"];

  const postsCollection = await posts();
  const post = await postsCollection.findOne({ _id: ObjectId(postId) });
  if (post === null)
      throw [404,"No post exists with this ID"];
  
  post._id = post._id.toString();
  return post;
};

const deletePost = async (postId) => {
  if (!postId)
    throw [400,"provide an ID to search for"];

  if(typeof postId !== 'string' || postId.trim().length===0)
    throw [400,"Please provide a valid ID"];

  if(!ObjectId.isValid(postId))
    throw [400,"The ID is not a valid Object ID"];

let resultData = {};
const postsCollection = await posts();
const post = await postsCollection.findOne({ _id: ObjectId(postId) });

if (post === null)
  throw [404,"No post present with that ID"];

const deletionInfo = await postsCollection.deleteOne({ _id: ObjectId(postId) });

if(deletionInfo.deletedCount === 0) { 
  throw [400,"Could not delete post"];
}
resultData = {"postid": postId, "deleted": true};
return resultData;
};