//require express and express router as shown in lecture code
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helper = require('../helpers');
const { posts } = require('./posts');

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
    resultArray.push(resultObject)
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