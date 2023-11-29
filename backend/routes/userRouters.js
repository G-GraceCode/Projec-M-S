import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deletUser,
  logOutUser,
} from "../controllers/userController.js";
import { createProject } from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

import multer from "multer";
const uploadMiddleware = multer({
  dest: "./uploads/",
  limits: { fileSize: 1024 * 1024 * 10 },
}); // Limit file size to 10MB

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logOutUser);
router
  .route("/profile")
  .put(protect, uploadMiddleware.single("file"), updateUserProfile)
  .get(protect, uploadMiddleware.single("file"), getUserProfile);
router.route("/:id").delete(protect, deletUser);

export default router;
