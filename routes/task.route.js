// routes/task.route.js
import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  searchTasks,
} from "../controllers/task/index.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/search", searchTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
