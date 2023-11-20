import express from "express";
import { createProject } from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
const upLoadMiddleware = multer({ dest: "./uploads/" });
const router = express.Router();

router
  .route("/create")
  .post(protect, upLoadMiddleware.single("file"), createProject);
router.route("/projects").get(protect, createProject);

export default router;
