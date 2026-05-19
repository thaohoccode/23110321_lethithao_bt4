export const requireMember = (req, res, next) => {
  const role = req.headers["x-user-role"];
  if (!role || role !== "member") {
    return res.status(401).json({ message: "Unauthorized: member role required" });
  }

  req.user = {
    id: Number(req.headers["x-user-id"] || 1),
    username: req.headers["x-user-name"] || "Guest",
    role,
  };
  next();
};
