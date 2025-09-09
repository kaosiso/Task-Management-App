import Task from "../../models/task.model.js";

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Check permission (owner or admin only)
    const ownerId = task.owner?._id
      ? task.owner._id.toString()
      : task.owner?.toString();

    if (ownerId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
