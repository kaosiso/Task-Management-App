// server/routes/user.route.js
import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole
} from "../controllers/user/index.js";

import { isAuthenticated, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Admin-only route: get all users
router.get("/getallusers", isAuthenticated, requireRole("admin"), getAllUsers);
router.put("/:id/changeuserrole", isAuthenticated, requireRole("admin"), changeUserRole);

//  Logged-in user: get their own profile or by id
router.get("/:id/getuser", isAuthenticated, getUserById);

//  Update user (self or admin)
router.put("/:id/update", isAuthenticated, updateUser);

//  Delete user (self or admin)
router.delete("/:id/delete", isAuthenticated, deleteUser);

export default router;
