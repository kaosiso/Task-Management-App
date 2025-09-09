import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  searchTasks,
} from "../controllers/task/index.js";

const router = express.Router();

// all routes below require authentication
router.use(isAuthenticated);

// Task CRUD
router.post("/create", createTask); 
router.get("/gettasks", getTasks); 
router.get("/search", searchTasks); 
router.get("/:id", getTask); 
router.put("/:id/update", updateTask); 
router.delete("/:id/delete", deleteTask); 

export default router;
