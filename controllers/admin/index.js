// --- User controllers ---
import getAllUsers from "./users/getAllUsers.js";
import changeUserRole from "./users/changeUserRole.js";
import deleteUser from "./users/deleteUser.js";

// --- Task controllers ---
import getAllTasks from "./tasks/getAllTasks.js";
import editTask from "./tasks/editTask.js";
import deleteTask from "./tasks/deleteTask.js";

export {
  // users
  getAllUsers,
  changeUserRole,
  deleteUser,

  // tasks
  getAllTasks,
  editTask,
  deleteTask,
};
