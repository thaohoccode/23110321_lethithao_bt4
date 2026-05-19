import { pool } from "../config/db.js";

const safeParseJson = (value, fallback) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "object") return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    // Accept plain URL strings and legacy CSV values.
    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
      if (fallback instanceof Array) {
        return trimmed.includes(",")
          ? trimmed.split(",").map((item) => item.trim()).filter(Boolean)
          : [trimmed];
      }
      return fallback;
    }
    try {
      return JSON.parse(trimmed);
    } catch {
      return fallback;
    }
  }
  return fallback;
};

export const normalizeProductRow = (row) => ({
  ...row,
  images: safeParseJson(row.images, []),
  attributes: safeParseJson(row.attributes, {}),
});

export const queryProducts = async ({
  search,
  category,
  minPrice,
  maxPrice,
  inStock,
  promotion,
  sort,
  page = 1,
  limit = 10,
}) => {
  const where = [];
  const params = [];

  if (search) {
    where.push("p.name LIKE ?");
    params.push(`%${search}%`);
  }
  if (category) {
    where.push("c.slug = ?");
    params.push(category);
  }
  if (minPrice) {
    where.push("p.price >= ?");
    params.push(Number(minPrice));
  }
  if (maxPrice) {
    where.push("p.price <= ?");
    params.push(Number(maxPrice));
  }
  if (inStock === "true") where.push("p.stock > 0");
  if (promotion === "true") where.push("p.is_promotion = 1");

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const sortMap = {
    price_asc: "p.price ASC",
    price_desc: "p.price DESC",
    newest: "p.created_at DESC",
  };
  const sortSql = sortMap[sort] || "p.created_at DESC";
  const offset = (Number(page) - 1) * Number(limit);

  const sql = `
    SELECT p.*, c.name AS category_name, c.slug AS category_slug
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ${whereSql}
    ORDER BY ${sortSql}
    LIMIT ? OFFSET ?
  `;

  const countSql = `
    SELECT COUNT(*) AS total
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ${whereSql}
  `;

  const [rows] = await pool.query(sql, [...params, Number(limit), Number(offset)]);
  const [countRows] = await pool.query(countSql, params);

  return {
    data: rows.map(normalizeProductRow),
    total: countRows[0].total,
    page: Number(page),
    limit: Number(limit),
    hasMore: offset + rows.length < countRows[0].total,
  };
};

export const findProductById = async (id) => {
  const [rows] = await pool.query(
    `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      JOIN categories c ON c.id = p.category_id
      WHERE p.id = ?
    `,
    [id]
  );

  return rows[0] ? normalizeProductRow(rows[0]) : null;
};
