import express from "express";
import {
  createProject,
} from "../controllers/projectController.js";
// import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/createproject", createProject);


export default router;
