// controllers/user/changeUserRole.controller.js
import User from "../../models/user.model.js";

const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body; // only role comes from body
    const { id } = req.params; // user id comes from route

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default changeUserRole;
