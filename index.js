// 1. Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or /server
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

import connectDB from "./DB/connectDB.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js"; // <-- To-Do tasks

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:5173", 
    ],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRouter); 
app.use("/users", userRouter); 
app.use("/tasks", taskRouter); 

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong",
    status: error.status,
    stack: error.stack,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` To-Do App server running at http://localhost:${PORT}`);
});
