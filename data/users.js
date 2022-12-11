const { ObjectId } = require("mongodb");
const { users } = require("../config/mongoCollections");

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
    return {"userId": userId, "deleted": true};
};
