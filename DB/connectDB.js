import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO) {
      throw new Error("❌ MONGO URI not defined in environment variables");
    }
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
