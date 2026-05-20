const jwt = require("jsonwebtoken");

const SECRET =
  process.env.JWT_SECRET || "secret";

module.exports = (req, res, next) => {
  try {

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        msg: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      SECRET
    );

    // Attach user
    req.user = {
      id: decoded.id,
    };

    next();

  } catch (err) {

    console.error(
      "AUTH MIDDLEWARE ERROR:",
      err
    );

    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};