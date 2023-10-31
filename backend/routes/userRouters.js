import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", updateUserProfile);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
