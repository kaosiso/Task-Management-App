import Task from "../../../models/task.model.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("owner", "name email role");
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default getAllTasks;
