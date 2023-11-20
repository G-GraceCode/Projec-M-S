import express from "express";
import { createProject } from "../controllers/projectController.js";
// import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
const upLoadMiddleware = multer({ dest: "./uploads/" });
const router = express.Router();

router.post("/create", upLoadMiddleware.single("file"), createProject);

export default router;
