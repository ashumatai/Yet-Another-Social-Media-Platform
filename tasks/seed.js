const user1 = {
  userName: "John_441",
  firstName: "John",
  lastName: "Kim",
  email: "jkim@gmail.com",
  phoneNumber: 5513447689,
  address: "Hoboken Ave",
  city: "Jersey City",
  state: "NJ",
  profilePicture: "/public/uploads/images.jpeg",
  age: 20,
  dateOfBirth: "10/12/2002",
  hashedPassword: "34569Rdhgfh45434",
  followers: [],
  followings: [],
  savedPosts: [],
  userPosts: [],
  followRequests: [],
  directMessageIds: [],
};

const post1 = {
  postContent:"file path",
  caption: "This is my latest pic!",
  tags: ["#fashion", "#education", "#politics"],
  email: "jkim@gmail.com",
  comments:  [],
  likes: []
};
const { users } = require("../config/mongoCollections");
const { posts } = require("../config/mongoCollections");

const seedFn = async () => {
  const userCollection = await users();
  const postCollection = await posts();
  const addNewUser = await userCollection.insertOne(user1);
  const addNewPost = await postCollection.insertOne(post1);
  console.log(addNewUser);
  console.log(addNewPost);
  return addNewUser;
};

seedFn();

console.log("Seeded!");
