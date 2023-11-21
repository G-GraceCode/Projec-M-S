import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import fs from "fs";

// route POST /createproject
// @access public

const createProject = asyncHandler(async (req, res) => {
  try {
    // gettting the image and reanaming it parts when it is Uploaded
    const { originalname, path } = req.file;
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    // req for title, content, summary, category
    const { title, category, content, summary } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      const data = await Project.create({
        title,
        summary,
        category,
        content,
        coverImg: newPath,
        author: user._id,
      });
      res.status(200).json(data);
    } else {
      console.log("user not found");
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

const editProject = asyncHandler(async (req, res) => {

})

// route get /project
// @access private getting projects of a particular user

const getProjects = asyncHandler(async (req, res) => {
  try {
    const author = req.user._id;

    // Now we Sor the project in descending order of date created
    const projects = await Project.find({ author })
      .sort({ createdAt: -1 })
      .limit(5); //.populate("author", ["username"]);
    if (projects.length >= 1) {
      res.status(200).json(projects);
    } else {
      res.status(201).json({ message: "No Project Created" });
    }
  } catch (e) {
    res.status(401);
    throw new Error(e.message);
  }
});

//route get/project/:id
//@access public get a particular project  by id

const getAproject = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const theProject = await Project.findById(id);
    res.status(200).json(theProject);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export { createProject, getProjects, getAproject, editProject };
