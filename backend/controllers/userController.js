import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// @des Auth user/set token
// route POST /projec/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //checking the password in the userModel section
    // const passwordCheck = await user.matchPassword(password);
    // console.log("pass", passwordCheck);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("userpass", isPasswordValid);
    if (user && isPasswordValid) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error(`invalid email or password`);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// @des Register a new user
// route POST /projec/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body || req.params;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error(`${userExist.username} already exist`);
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(401);
      throw new Error(`newUser not created`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// @des LogOut user / clear cookie
// route POST /projec/users/logout
// @access public
const logOutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    Message: "User Logged out",
  });
};

// @des get user profile
// route POST /projec/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log("loginU", req.user);
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

// @des Get user profile
// route Get /projec/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("upade", req.user);
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username;
      user.email = req.body.email;

      if (user.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        password: updatedUser.password,
      });
      console.log(
        "updated",
        res.status(200).json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          password: updatedUser.password,
        }),
      );
    } else {
      res.status(401);
      throw new Error("User Not Found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
