const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');
const { posts, users } = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');

//get all posts of a user
const getAllPosts = async (userId) => {
  // if (!userId)
  //   throw [400,"You must provide an ID"];
  
  // if (typeof userId !== 'string' || userId.trim().length===0)
  //   throw [400,"Please provide a valid ID"];
  
  // if(!ObjectId.isValid(userId))
  //   throw [400,"The ID is not a valid Object ID"];
  try{
    helper.validString(userId);
    helper.validObjectId(userId);  
  }
  catch(e){
    throw e;
  }
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
  // if (!postId)
  //   throw [400,"You must provide an ID"];
  // if (typeof postId !== 'string' || postId.trim().length===0)
  //   throw [400,"Please provide a valid ID"];
  // if(!ObjectId.isValid(postId))
  //   throw [400,"The ID is not a valid Object ID"];
  try{
    helper.validString(postId);
    helper.validObjectId(postId);  
  }
  catch(e){
    throw e;
  }


  const postsCollection = await posts();
  const post = await postsCollection.findOne({ _id: ObjectId(postId) });
  if (post === null)
      throw [404,"No post exists with this ID"];
  
  post._id = post._id.toString();
  return post;
};


const createPost = async ( postContent, caption, tags, userId) => {

  // if(!postContent) 
  //   throw [400,"You must provide an image path"];
  // if(!postContent.endsWith('.jpg') || !postContent.endsWith('.jpeg') || !postContent.endsWith('.png'))
  //   throw [400,"You must provide image in proper format"];
  // if(!caption || caption.trim().length===0 || !typeof(caption)==='string')
  //   throw [400,"You must provide a caption"];

  try{
    helper.validString(postContent);
    helper.validString(caption);
    helper.validString(tags);
    helper.validObjectId(userId);  
  }
  catch(e){
    throw e;
  }

  postContent=postContent.trim();
  caption=caption.trim().toLowerCase();
  tags=tags.trim().toLowerCase();

  const moment = require("moment");
  let date= moment().format("MM/DD/YYYY");

  const postCollection = await posts();

  let newPost = {
    postContent: postContent,
    caption: caption,
    tags: tags,
    date: date,
    comments: [],
    likes: []
  }

  const insertInfo = await postCollection.insertOne(newPost);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
  throw [500,"Could not add new post"];

  const newId = insertInfo.insertedId.toString();
  const post = await getPostById(newId.toString());

  const userCollection = await users();
  const updatedUser = await userCollection.updateOne({_id: ObjectId(userId)}, { $push: { userPosts: newId } });

  if(updatedUser.modifiedCount === 0){
      throw 'Could not add post to the user list';
  }
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
  deletePost,
  createPost
};