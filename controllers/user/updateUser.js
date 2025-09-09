// controllers/user/updateUser.controller.js
import User from "../../models/user.model.js";

const updateUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Permission check: only self OR admin
    if (req.user.role !== "admin" && req.user.id !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    //  Update only provided fields
    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updateUser;
