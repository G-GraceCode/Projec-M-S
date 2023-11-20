import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import fs from "fs";

// route POST /createproject
// @access public

const createProject = asyncHandler(async (req, res) => {
  const { originalname, path } = req.file;
  const part = originalname.split(".");
  const ext = part[part.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  console.log("file", req.file);
  res.json({ ext });
  try {
  } catch (e) {
    console.log(e);
  }
});

export { createProject };
