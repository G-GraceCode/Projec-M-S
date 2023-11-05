import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  logOutUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logOutUser);
router.post("/", protect);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
