// controllers/user/getAllUsers.controller.js
import User from "../../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getAllUsers;
