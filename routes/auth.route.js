// server/routes/auth.route.js
import express from "express";
import {
  register,
  login,
  requestResetPassword,
  resetPassword,
} from "../controllers/Auth/index.js"; // lowercase "auth" folder

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);

// Password reset routes
router.post("/forgot-password", requestResetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
