import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import handleUpload from "../cloudinaryUpload/cloudUpload.js";
// @des Auth user/set token
// route POST /projec/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        prof: user.profession,
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
  let profile = "";
  let bio = "";
  let linkedin = "";
  let behance = "";
  let folioLink = "";
  try {
    const { username, email, password, profession } = req.body || req.params;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error(`${userExist.username} already exist`);
    }

    const newUser = await User.create({
      username,
      email,
      password,
      profession,
      profile,
      folioLink,
      bio,
      linkedin,
      behance,
    });
    console.log("user", newUser);
    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        prof: newUser.profession,
      });
      return;
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
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    prof: user.profession,
    profile: user.profile,
    bio: user.bio,
    folioLink: user.folioLink,
    linkedin: user.linkedin,
    behance: user.behance,
  });
});

// @des get user profile
// route POST /projec/users/profile
// @access private
const diffUserprofile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    return res.status(200).json({
      username: user.username,
      prof: user.profession,
      profile: user.profile,
      bio: user.bio,
      folioLink: user.folioLink,
      linkedin: user.linkedin,
      behance: user.behance,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// @des Get user profile
// route Get /projec/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      profession,
      profile,
      bio,
      linkedin,
      behance,
      folioLink,
    } = req.body || req.params;

    const { _id } = req.user;

    const user = await User.findById({ _id });

    if (user) {
      user.username = username;
      user.email = email;
      user.profession = profession;
      user.bio = bio;
      user.linkedin = linkedin;
      user.behance = behance;
      user.folioLink = folioLink;
      user.profile = profile;

      if (password !== "") {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      console.log("update", updatedUser);
      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        password: updatedUser.password,
        prof: updatedUser.profession,
        profile: updatedUser.profile,
        folioLink: updatedUser.folioLink,
        bio: updatedUser.bio,
        linkedin: updatedUser.linkedin,
        behance: updatedUser.behance,
      });
    } else {
      res.status(401);
      throw new Error("User Not Found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// @des delete user profile
// route Get /projec/users/:id
// @access private
const deletUser = asyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const author = id;
    const user = await User.findByIdAndDelete(id);
    await Project.deleteMany({ author });

    if (!user) {
      return res.status(404).json({ message: "User not Not Found" });
    }

    res
      .cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(200)
      .json({
        message: "Account Deleted Successfully",
      });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const uploadPic = asyncHandler(async (req, res) => {
  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const part = originalname.split(".");
      const ext = part[part.length - 1];
      const newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
      const userNewImage = await handleUpload(newPath);
      userNewImage.width = 400;
      userNewImage.height = 400;
      const { width, height, secure_url } = userNewImage;
      return res.status(200).json({ width, height, secure_url });
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
  deletUser,
  updateUserProfile,
  diffUserprofile,
  uploadPic,
};
