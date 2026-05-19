import { pool } from "../config/db.js";

export const mockLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [rows] = await pool.query(
      "SELECT id, username, email, avatar, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows[0]) return res.status(401).json({ message: "Invalid account" });
    if (rows[0].role !== "member") return res.status(403).json({ message: "Only member can access" });

    res.json({ user: rows[0], token: "mock-token-member" });
  } catch (error) {
    next(error);
  }
};
