/**
 * @author Deepali Nagwade <dnagwade@stevens.edu>
 * */

const mongoCollections = require('../config/mongoCollections');
const {ObjectId} = require('mongodb');
const helper = require('../helpers/validations');
const posts = mongoCollections.posts;
const users = mongoCollections.users;
const moment = require("moment");

/**
* Function to get all posts of a user
 * @param {string} userId - ID of the signedIn user.
 */
const getAllPosts = async (userId) => {

  if(helper.validString(userId, "ID"));
  if(helper.validObjectId(userId, "ID"));

  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(userId)});
  if (!user){
    throw {statusCode: 404, error: 'No user found with '+ userId};
  }

  if(user.userPosts.length===0){
    throw {statusCode: 404, error: 'No Posts found for '+ userId};
  }

  const postCollection = await posts();
  let postData=[];
  for (const post of user.userPosts) {
    postData.push(await postCollection.findOne({_id: ObjectId(post)}));
  }
  return postData;
};

/**
* Function to get post by postID
 * @param {string} post - ID of the post.
 */
const getPostById = async (postId) => {
  
  if(helper.validString(postId, "ID"));
  if(helper.validObjectId(postId, "ID"));

  const postsCollection = await posts();
  console.log(postsCollection);
  const post = await postsCollection.findOne({ _id: ObjectId(postId) });
  if (!post)
  throw {statusCode: 404, error: 'No Posts found for '+ postId};
  
  post._id = post._id.toString();
  return post;
};


/**
* Function to get post by postID
 * @param {string} postContent - content of the post.
 * @param {string} caption - Caption provided to describe the post.
 * @param {string} post - Tag on which the post falls.
 */
const createPost = async ( postContent, caption, tags, userId) => {

  if(helper.validString(postContent, "PostContent"));
  if(helper.validString(caption, "Caption"));
  if(helper.validString(tags, "Tags"));
  if(helper.validString(userId, "ID"));
  if(helper.validObjectId(userId, "ID"));


  postContent=postContent.trim();
  caption=caption.trim().toLowerCase();
  tags=tags.trim().toLowerCase();
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
    throw {statusCode: 500, error: 'Could not add new post!!'};

  const newId = insertInfo.insertedId.toString();
  const post = await getPostById(newId.toString());

  const userCollection = await users();
  const updatedUser = await userCollection.updateOne({_id: ObjectId(userId)}, { $push: { userPosts: newId } });

  if(updatedUser.modifiedCount === 0){
    throw {statusCode: 500, error: 'Could not add post to the user list!!'};
  }
  return post;
};

/**
* Function to delete a post by postID
 * @param {string} post - ID of the post.
 */
const deletePost = async (postId) => {

  if(helper.validString(postId, "ID"));
  if(helper.validObjectId(postId, "ID"));

  let resultData = {};
  const postsCollection = await posts();
  const post = await postsCollection.findOne({ _id: ObjectId(postId) });

  if (!post)
    throw {statusCode: 404, error: 'No Posts found for '+ postId};

  const deletionInfo = await postsCollection.deleteOne({ _id: ObjectId(postId) });

  if(deletionInfo.deletedCount === 0) { 
    throw {statusCode: 500, error: 'Could not delete post!!'};
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