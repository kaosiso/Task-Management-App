import { Router } from "express";
import { isAuthenticated, requireRole } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  changeUserRole,
  deleteUser,
  getAllTasks,
  editTask,
  deleteTask,
} from "../controllers/admin/index.js";

const router = Router();

router.use(isAuthenticated, requireRole("admin"));

// user routes
router.get("/users", getAllUsers);
router.put("/users/role", changeUserRole);
router.delete("/users/:userId", deleteUser);

// task routes
router.get("/tasks", getAllTasks);
router.put("/tasks/:taskId", editTask);
router.delete("/tasks/:taskId", deleteTask);

export default router;
