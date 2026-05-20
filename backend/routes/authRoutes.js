const router = require("express").Router();

const passport = require("passport");

const jwt = require("jsonwebtoken");

const auth = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const User = require("../models/user");

const {
  register,
  login,
  verify,
  logout,
  removeAvatar,
} = require("../controllers/authController");


// =====================================
// FRONTEND URL
// =====================================

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "https://new-poll-rouge.vercel.app";


// =====================================
// AUTH ROUTES
// =====================================

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Verify User
router.get("/verify", auth, verify);

// Logout
router.post("/logout", logout);


// =====================================
// GOOGLE AUTH
// =====================================

// Start Google Login
router.get(
  "/google",

  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


// Google Callback
router.get(
  "/google/callback",

  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`,
    session: false,
  }),

  async (req, res) => {
    try {

      console.log(
        "GOOGLE USER:",
        req.user
      );

      if (!req.user) {
        return res.redirect(
          `${CLIENT_URL}/login`
        );
      }

      // Create JWT
      const token = jwt.sign(
        {
          id: req.user._id,
        },

        process.env.JWT_SECRET ||
          "secret",

        {
          expiresIn: "7d",
        }
      );

      // Save cookie
      res.cookie("token", token, {
        httpOnly: true,

        secure: true, // true in production

        sameSite: "none",

        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      });

      // Redirect frontend
      res.redirect(
        `${CLIENT_URL}/home`
      );

    } catch (err) {

      console.error(
        "GOOGLE AUTH ERROR:",
        err
      );

      res.redirect(
        `${CLIENT_URL}/login`
      );
    }
  }
);


// =====================================
// AVATAR ROUTES
// =====================================

// Upload Avatar
router.post(
  "/upload-avatar",

  auth,

  upload.single("avatar"),

  async (req, res) => {
    try {

      console.log(
        "UPLOADED FILE:",
        req.file
      );

      if (!req.file) {
        return res.status(400).json({
          msg: "No file uploaded",
        });
      }

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      // Save avatar URL
      user.avatar = req.file.path;

      await user.save();

      res.json({
        msg:
          "Avatar uploaded successfully",

        user,
      });

    } catch (err) {

      console.error(
        "UPLOAD AVATAR ERROR:",
        err
      );

      res.status(500).json({
        msg: "Upload failed",
      });
    }
  }
);


// Remove Avatar
router.delete(
  "/remove-avatar",
  auth,
  removeAvatar
);

module.exports = router;