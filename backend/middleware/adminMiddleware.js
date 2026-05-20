const User = require("../models/user");

module.exports = async (
  req,
  res,
  next
) => {
  try {

    // Must already have req.user from auth middleware
    if (!req.user?.id) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    const user = await User.findById(
      req.user.id
    );

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // Check admin role
    if (user.role !== "admin") {
      return res.status(403).json({
        msg: "Access denied (admin only)",
      });
    }

    next();

  } catch (err) {

    console.error(
      "ADMIN MIDDLEWARE ERROR:",
      err
    );

    res.status(500).json({
      msg: "Server error",
    });
  }
};