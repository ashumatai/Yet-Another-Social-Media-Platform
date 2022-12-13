const { ObjectId } = require("mongodb");
const { users } = require("../config/mongoCollections");
const {
  validObjectId,
  validString,
  validAge,
} = require("../helpers/validations");

const getAllUsers = async () => {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  if (!userList)
    throw { message: "Could not get all the users in the db!", code: 404 };
  return userList;
};

const getUserById = async (userId) => {
  validObjectId(userId);
  const userCollection = await users();
  const userObject = await userCollection.findOne({ _id: ObjectId(userId) });
  if (userObject === null)
    throw {
      message: "No user with this ID can be found in the db!",
      code: 404,
    };
  return userObject;
};

const deleteAllUsers = async () => {
  const userCollection = await users();
  userCollection.deleteMany({});
};

const deleteUserById = async (userId) => {
  validObjectId(userId);
  const userCollection = await users();
  const deletionInfo = userCollection.deleteOne({ _id: ObjectId(userId) });
  if (deletionInfo.deletedCount === 0)
    throw {
      message: `Could not delete user with the user id ${userId}`,
      code: 404,
    };
  return { userId: userId, deleted: true };
};

const updateUserById = async (
  userId,
  userName,
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  city,
  state,
  dateOfBirth,
  age
) => {
  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !address ||
    !city ||
    !state ||
    !dateOfBirth ||
    !age
  )
    throw { message: "All fields must be supplied!", code: 400 };

  validObjectId(userId);
  validString(userName);
  validString(firstName);
  validString(lastName);
  validString(email);
  validString(phoneNumber);
  validString(address);
  validString(city);
  validString(state);
  validString(dateOfBirth);
  validAge(age);

  const userExists = await getUserById(userId);
  if (!userExists) throw { message: "User doesn't exist!", code: 400 };
  const userCollection = await users();
  const updatedUser = {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    city: city,
    state: state,
    dateOfBirth: dateOfBirth,
    age: age,
  };
  const updatedInfo = userCollection.updateOne(
    { _id: ObjectId(userId) },
    { $set: updatedUser }
  );
  if (updatedInfo.modifiedCount === 0)
    throw {
      message: `Could not update user with user ID ${userId}!`,
      code: 404,
    };
  else {
    const newUser = await getUserById(userId);
    return newUser;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById,
  updateUserById,
};
