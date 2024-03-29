import express from "express";
import {
  createProject,
  getUserProjects,
  getAproject,
  getAllProjects,
  displayDashboard,
  getProjectBySearch,
  editProject,
  autoCompleteSearch,
  uploadPic,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
const upLoadMiddleware = multer({
  dest: "./uploads/",
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
});
const router = express.Router();

router.route("/create").post(protect, createProject);
router.put("/editproject/:id", upLoadMiddleware.single("file"), editProject);
router.route("/projects").get(protect, getUserProjects);
router.get("/projectsearched", getProjectBySearch);
router.get("/allprojects", getAllProjects);
router.get("/autosearch", autoCompleteSearch);
router.post("/upload", upLoadMiddleware.single("file"), uploadPic);
router.get("/:id", getAproject);
router.route("/").get(protect, displayDashboard);
router.delete("/deleteproject/:id", deleteProject);

export default router;
