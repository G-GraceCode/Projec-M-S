import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deletUser,
  logOutUser,
  uploadPic,
  diffUserprofile,
} from "../controllers/userController.js";
import { createProject } from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const storage = new multer.diskStorage({
  destination: "uploads/",
});
const uploadMiddleware = multer({
  storage,
});

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logOutUser);

router
  .route("/profile")
  .put(protect, updateUserProfile)
  .get(protect, getUserProfile);

router.post("/upload", uploadMiddleware.single("file"), uploadPic);

router.route("/:id").delete(protect, deletUser);
router.get("/auserprofile/:id", diffUserprofile);

export default router;
