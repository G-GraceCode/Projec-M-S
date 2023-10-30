import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @des Auth user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    Message: "authUser here Us",
  });
});

// @des Register a new user
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
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
      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(500);
      throw new Error(`newUser not created`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// @des LogOut user / clear cookie
// route POST /api/users/logout
// @access public
const logOutUser = (req, res) => {
  res.status(200).json({
    Message: "authUser here Us",
  });
};

// @des get user profile
// route POST /api/users/profile
// @access private
const updateUser = (req, res) => {
  res.status(200).json({
    Message: "authUser here Us",
  });
};

export { authUser, registerUser, logOutUser, updateUser };
