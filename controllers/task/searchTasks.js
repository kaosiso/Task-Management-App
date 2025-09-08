// controllers/Task/searchTask.controller.js
import Task from "../../models/task.model.js";

// Search & filter tasks
export const searchTasks = async (req, res) => {
  try {
    const { keyword, status, priority } = req.query;

    const query = {};

    // Search by title or description
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // Filter by completion status
    if (status) {
      query.completed = status === "completed";
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Only tasks of logged-in user
    query.owner = req.user.id;

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
