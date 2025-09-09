// controllers/user/getUser.controller.js
import User from "../../models/user.model.js";

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Allow self OR admin
    if (req.user.role !== "admin" && req.user.id !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getUser;
