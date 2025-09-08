// server/routes/user.route.js
import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user/index.js";

import { isAuthenticated, requireRole } from "../middleware/auth.js";

const router = express.Router();

// 🔒 Admin-only route: get all users
router.get("/", isAuthenticated, requireRole("admin"), getAllUsers);

// 👤 Logged-in user: get their own profile or by id
router.get("/:id", isAuthenticated, getUserById);

// ✏️ Update user (self or admin)
router.put("/:id", isAuthenticated, updateUser);

// 🗑️ Delete user (self or admin)
router.delete("/:id", isAuthenticated, deleteUser);

export default router;
