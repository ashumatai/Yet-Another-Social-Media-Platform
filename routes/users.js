const express = require("express");
const { posts, users } = require("../config/mongoCollections");
const {
  // getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../data/users");
const {
  validObjectId,
  validString,
  validEmail,
} = require("../helpers/validations");
const router = express.Router();
const xss = require("xss");
const { ObjectId } = require("mongodb");

// router.route("/").get(async (req, res) => {
//   try {
//     const allUsers = await getAllUsers();
//     res.json(allUsers);
//   } catch (error) {
//     res.status(error.code).send(error.message);
//   }
// });

router.route("/").get(async (req, res) => {
  try {
    validObjectId(req.session.user._id);
  } catch (error) {
    // res.status(400).send(error);
    const user = req.session.user;
    return res.render("userPage", {
      title: user.userName,
      userPosts: allUserPosts,
      partial: "user-script",
      css: "user-css"
    });
  }
  try {
    // const user = await getUserById(req.session.user._id);
    const user = req.session.user;
    const postsCollection = await posts();
    const allUserPosts = [];

    if(!user.userPosts.length) 
      throw {message: "User has no posts yet!", code: 404};
    for (const postId of user.userPosts) {
      const post = await postsCollection.findOne({_id: ObjectId(postId)});
      allUserPosts.push(post);
    }
    return res.render("userPage", {
      title: user.userName,
      userPosts: allUserPosts,
      partial: "user-script",
      css: "user-css"
    });
  } catch (error) {
    const user = req.session.user;
    return res.render("userPage", {
      title: user.userName,
      userPosts: allUserPosts,
      partial: "user-script",
      css: "user-css",
      error: error?.message ?? error
    });
  }
});

// router.route("/:userId").delete(async (req, res) => {
//   try {
//     validObjectId(req.params.userId);
//   } catch (error) {
//     return res.status(400).send(error);
//   }
//   try {
//     await getUserById(req.params.userId);
//   } catch (error) {
//     return res.status(error.code).send(error.message);
//   }
//   try {
//     const userById = await deleteUserById(req.params.userId);
//     return res.json(userById);
//   } catch (error) {
//     return res.status(error.code).send(error.message);
//   }
// });

// router.route("/:userId").put(async (req, res) => {
//   try {
//     validObjectId(req.params.userId);
//   } catch (error) {
//     return res.status(400).send(error);
//   }

//   // checking if the user exists or not in the first place
//   try {
//     await getUserById(req.params.userId);
//   } catch (error) {
//     return res.status(error.code).send(error.message);
//   }

//   let user = req.body;
//   try {
//     if (
//       !user.userName ||
//       // !user.firstName ||
//       // !user.lastName ||
//       !user.email
//       // !user.dateOfBirth
//     )
//       throw { message: "All fields must be supplied!", code: 400 };
//   } catch (error) {
//     return res.status(error.code).send(error.message);
//   }

//   try {
//     validString(user.userName, "Username");
//     // validString(user.firstName, "First Name");
//     // validString(user.lastName, "Last Name");
//     validEmail(user.email, "Email");
//     // validString(user.dateOfBirth, "DOB");
//   } catch (error) {
//     return res.status(400).send(error);
//   }

//   try {
//     const userCollection = await users();
//     const currentUser = userCollection.findOne({_id: req.params.userId});
//     req.body.usernameInput = currentUser.userName;
//     req.body.emailInput = currentUser.email;
//     req.body.profilePicInput = currentUser.profilePicture;
//   }
//   catch (error) {
//     return res.status(502).send("<h2>You are offline!</h2>");
//   }

//   try {
//     const updatedUser = await updateUserById(
//       req.params.id,
//       xss(user.userName),
//       // xss(user.firstName),
//       // xss(user.lastName),
//       xss(user.email),
//       user.profilePicture
//       // xss(user.dateOfBirth),
//     );
//     return res.json(updatedUser);
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// });

module.exports = router;
