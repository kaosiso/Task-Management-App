// controllers/task/getTasks.js
import Task from "../../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // Admin can see all tasks
      tasks = await Task.find()
        .populate("owner", "name email")
        .sort({ createdAt: -1 });
    } else {
      // Normal user only sees their own tasks
      tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
