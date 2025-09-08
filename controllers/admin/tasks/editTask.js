import Task from "../../../models/task.model.js";

const editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, dueDate },
      { new: true, runValidators: true }
    ).populate("owner", "name email");

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default editTask;
