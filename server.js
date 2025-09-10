// server.js
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./DB/connectDB.js";

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`To-Do App server running at http://localhost:${PORT}`);
  });
});
