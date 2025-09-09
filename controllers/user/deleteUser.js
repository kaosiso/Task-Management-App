import User from "../../models/user.model.js";

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Allow if admin OR user deleting their own account
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default deleteUser;
