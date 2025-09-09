import Task from "../../models/task.model.js";

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "owner",
      "name email role"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check permission: only the owner or an admin can view
    if (
      task.owner._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this task" });
    }

    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
