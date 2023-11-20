import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import multer from "multer";
const upLoadMiddleware = multer({ dest: "uploads/" });

// route POST /createproject
// @access public

const createProject = asyncHandler(async (req, res) => {
  try {
  } catch (e) {}
});
