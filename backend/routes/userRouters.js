import express from "express";
import {
  authUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.get("/user", updateUser);

export default router;
