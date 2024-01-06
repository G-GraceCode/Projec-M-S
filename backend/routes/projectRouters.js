import express from "express";
import {
  createProject,
  getUserProjects,
  getAproject,
  getAllProjects,
  getProjectBySearch,
  editProject,
  autoCompleteSearch,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
const upLoadMiddleware = multer({
  dest: "./uploads/",
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
});
const router = express.Router();

router
  .route("/create")
  .post(protect, upLoadMiddleware.single("file"), createProject);
router.put("/editproject/:id", upLoadMiddleware.single("file"), editProject);
router.route("/projects").get(protect, getUserProjects);
router.get("/projectsearched", getProjectBySearch);
router.get("/allprojects", getAllProjects);
router.get("/autosearch", autoCompleteSearch);
router.get("/:id", getAproject);
router.delete("/deleteproject/:id", deleteProject);

export default router;
