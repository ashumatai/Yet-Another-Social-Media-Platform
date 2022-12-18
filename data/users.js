const { ObjectId } = require("mongodb");
const { users } = require("../config/mongoCollections");
const bcrypt = require("bcryptjs");
const saltRounds= 11
const { badRequestError, internalServerError, notFoundError } = require("../helpers/wrappers");
const { validEmail, validName, validUsername, validPassword, validDate, validDOB, validString, validAge, validObjectId } = require("../helpers/validations");

// const getAllUsers = async () => {
//   const userCollection = await users();
//   const userList = await userCollection.find({}).toArray();
//   if (!userList)
//     throw { message: "Could not get all the users!", code: 404 };
//   return userList;
// };

const getUserById = async (userId) => {
  validObjectId(userId, "ID");
  userId = userId.trim();
  const userCollection = await users();
  const userObject = await userCollection.findOne({ _id: ObjectId(userId) });
  if (userObject === null)
    throw {
      message: "No user with this ID can be found!",
      code: 404,
    };
  return userObject;
};

const deleteAllUsers = async () => {
  const userCollection = await users();
  userCollection.deleteMany({});
};

const deleteUserById = async (userId) => {
  validObjectId(userId, "ID");
  userId = userId.trim();
  const userCollection = await users();
  const deletionInfo = userCollection.deleteOne({ _id: ObjectId(userId) });
  if (deletionInfo.deletedCount === 0)
    throw {
      message: `Could not delete user with the user id ${userId}`,
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

const updateUserById = async (
  userId,
  userName,
  firstName,
  lastName,
  email,
  dateOfBirth
) => {
  if (
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !dateOfBirth
  )
    throw { message: "All fields must be supplied!", code: 400 };

  validObjectId(userId);
  validString(userName);
  validString(firstName);
  validString(lastName);
  validString(email);
  validString(dateOfBirth);

  const userExists = await getUserById(userId);
  if (!userExists) throw { message: "User doesn't exist!", code: 400 };
  const userCollection = await users();
  const updatedUser = {
    userName: userName.trim(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    dateOfBirth: dateOfBirth.trim(),
  };
  const updatedInfo = userCollection.updateOne(
    { _id: ObjectId(userId.trim()) },
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
  checkUser,
  getUserByEmail,
  getUserById,
  deleteAllUsers,
  // getAllUsers,
  createUser,
  deleteUserById,
  updateUserById,
};
