const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const auth =
  require("../middleware/authMiddleware");

const admin =
  require("../middleware/adminMiddleware");


// =====================================
// GET ALL CATEGORIES
// =====================================

router.get("/", getCategories);


// =====================================
// CREATE CATEGORY (ADMIN ONLY)
// =====================================

router.post(
  "/",
  auth,
  admin,
  createCategory
);

module.exports = router;