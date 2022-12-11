const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');

//get all posts of a user
const getAllPosts = async (userId) => {
  if (!userId)
    throw [400,"You must provide an ID"];
  
  if (typeof userId !== 'string' || userId.trim().length===0)
    throw [400,"Please provide a valid ID"];
  
  if(!ObjectId.isValid(userId))
    throw [400,"The ID is not a valid Object ID"];

  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(userId)});

  if (user === null)
      throw [404,"No User found with that ID"];

  if(user.userPosts.length===0){
    throw [404,"No Posts found for this user"];
  }

  const postCollection = await posts();
  let postData=[];
  console.log(user.userPosts);
  for (const post of user.userPosts) {
    postData.push(await postCollection.findOne({_id: ObjectId(post)}));
  }
  console.log(postData);
  return postData;
};

//get post by postId
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


const createPost = async ( postContent, caption, tags, email, comments, likes) => {

  const postCollection = await posts();
  let newPost = {
    postContent: postContent,
    caption: caption,
    tags: tags,
    email: email,
    comments: comments,
    likes:likes
  }

  const insertInfo = await postCollection.insertOne(newPost);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw [500,"Could not add new movie"];

  const newId = insertInfo.insertedId.toString();
  const post = await getPostById(newId.toString());
  return post;
};



//delete a post by postId
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

module.exports = {
  getAllPosts,
  getPostById,
  deletePost  ,
  createPost
};