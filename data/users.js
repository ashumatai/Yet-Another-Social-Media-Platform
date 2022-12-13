const { ObjectId } = require("mongodb");
const { users } = require("../config/mongoCollections");
const bcrypt = require("bcryptjs");
const saltRounds= 11
const { badRequestError, internalServerError, notFoundError } = require("../helpers/wrappers");
const { validEmail, validName, validUsername, validPassword, validDate, validDOB } = require("../helpers/validations");

const getAllUsers = async () => {
  const userCollection = await users();
  const userList = await userCollection
    .find({}, { projection: { _id: 1, title: 1 } })
    .toArray();
  if (!userList)
    throw { error: "Could not get all the users in the db!", code: 404 };
  for (const x of userList) {
    x._id = x._id.toString();
  }
  return userList;
};

const getUserById = async (userId) => {
  const userCollection = await users();
  const userObject = await userCollection.findOne({ _id: ObjectId(userId) });
  if (userObject === null)
    throw { error: "No movie with this ID can be found in the db!", code: 404 };
  userObject["_id"] = userObject["_id"].toString();
  return userObject;
};

const deleteAllUsers = async () => {
  const userCollection = await users();
  userCollection.deleteMany({});
};

const deleteUserById = async (userId) => {
  const userCollection = await users();
  const deletionInfo = userCollection.deleteOne({ _id: ObjectId(userId) });
  if (deletionInfo.deletedCount === 0)
    throw {
      error: `Could not delete user with the user id ${userId}`,
      code: 404,
    };
  return { userId: userId, deleted: true };
};

const getUserByUsername = async (username) => {
  // Validations
  try {
    validUsername(username);
  } catch (err) {
    throw badRequestError(err);
  }

  // Trim inputs
  username = username.trim().toLowerCase();
  
  // Mongo Collection operations
  try {
    const userCollection = await user_collection();
    const user = await userCollection.findOne({ username: username });
    if (!user || user === null) return false;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  // Validations
  try {
    const emailTest = validEmail(email);

    if (!emailTest) throw `Invalid username or password`;
  } catch (err) {
    throw badRequestError(err);
  }

  // Trim inputs
  email = email.trim().toLowerCase();

  // Mongo Collection operations
  try {
    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });
    if (!user || user === null) return false;
    return user;
  } catch (err) {
    throw err;
  }
};

const checkUser = async (email, password) => {
  // Validations
  try {
    validEmail(email);
    validPassword(password);
  } catch (err) {
    throw badRequestError(err);
  }

  // Trim inputs
  email = email.trim().toLowerCase();

  // Mongo Collection operations
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) throw badRequestError("Either the email or password is invalid");

    const comparePasswords = await bcrypt.compare(password, existingUser.hashedPassword);
    if (comparePasswords) {
      return existingUser;
    } else throw badRequestError("Either the email or password is invalid");
  } catch (err) {
    throw err;
  }
};

const createUser = async (firstnameInput, lastnameInput, DOBInput, usernameInput, emailInput, passwordInput) => {
  // Validations
  try {
    validName(firstnameInput);
    validName(lastnameInput);
    validDate(DOBInput);
    validDOB(DOBInput);
    validEmail(emailInput);
    validUsername(usernameInput);
    validPassword(passwordInput);

    const takenUser = await getUserByUsername(username);
    if (takenUser) throw `Username already taken!`;
    const takenEmail = await getUserByEmail(emailInput);
    if (takenEmail) throw `Email already registered to another account!`;
  } catch (err) {
    throw badRequestError(err);
  }

  // Trim inputs
  firstnameInput = firstnameInput.trim();
  lastnameInput = lastnameInput.trim();
  DOBInput = DOBInput.trim();
  emailInput = emailInput.trim().toLowerCase();
  usernameInput = usernameInput.trim().toLowerCase();

  // Mongo Collection operations and password hashing
  try {
    const hash = await bcrypt.hash(passwordInput, saltRounds);
    const userCollection = await users();
    let newUser = {
      username: usernameInput,
      hashedPassword: hash,
      lastName: lastnameInput,
      firstName: firstnameInput,
      email: emailInput,
      dateOfBirth: DOBInput,
      profilePicture: null,
      followers: [],
      following: [],
      savedPosts: [],
      userPosts: [],
      followRequests: [],
      directMessageIds: []
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw internalServerError("Could not add user");
  
    return {insertedUser: true};
  } catch (err) {
    throw err;
  }
};



module.exports = {
  checkUser,
  getUserByEmail,
  getUserById,
  deleteAllUsers,
  getAllUsers,
  createUser
};
