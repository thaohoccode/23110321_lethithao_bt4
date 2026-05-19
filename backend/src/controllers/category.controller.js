import { pool } from "../config/db.js";

export const getCategories = async (_, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY name ASC");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};
