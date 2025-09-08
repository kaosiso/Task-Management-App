export default async function logout(req, res) {
  try {
    res.clearCookie("token"); // if using cookies
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
