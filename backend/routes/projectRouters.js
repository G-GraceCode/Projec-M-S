import express from "express";
import {
  createProject,
  getProjects,
  getAproject,
  editProject
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
router
  .route("/create")
  .put(protect, upLoadMiddleware.single("file"), editProject);
router.route("/projects").get(protect, getProjects);
router.get("/:id", getAproject);

export default router;
