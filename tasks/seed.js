const user1 = {
  userName: "John_441",
  firstName: "John",
  lastName: "Kim",
  email: "jkim@gmail.com",
  phoneNumber: 5513447689,
  address: "Hoboken Ave",
  city: "Jersey City",
  state: "NJ",
  profilePicture: "file path",
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
const { users } = require("../config/mongoCollections");

users.insert(user1, (error, result) => {
  if (error) {
    return response.status(500).send(error);
  }
  response.send(result.result);
});

console.log("Seeded!");
