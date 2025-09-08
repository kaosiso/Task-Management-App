// controllers/user/updateUser.controller.js
import User from "../../models/user.model.js";

const updateUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, avatar },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updateUser;
