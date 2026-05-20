const router = require("express").Router();

const User = require("../models/User");

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");


// ======================================
// GET ALL USERS (ADMIN ONLY)
// ======================================

router.get(
  "/users",
  auth,
  admin,
  async (req, res) => {
    try {

      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.json(users);

    } catch (err) {

      console.error(
        "GET USERS ERROR:",
        err
      );

      res.status(500).json({
        msg: "Server error",
      });
    }
  }
);

module.exports = router;