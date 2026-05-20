const Category = require("../models/categoryModel");


// ================= GET ALL CATEGORIES =================

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 });

    res.json(categories);

  } catch (err) {
    console.error("GET CATEGORIES ERROR:", err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};


// ================= CREATE CATEGORY =================

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        msg: "Category name is required",
      });
    }

    // Check duplicate
    const exists = await Category.findOne({
      name: name.trim(),
    });

    if (exists) {
      return res.status(400).json({
        msg: "Category already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
    });

    res.status(201).json({
      msg: "Category created successfully",
      category,
    });

  } catch (err) {
    console.error("CREATE CATEGORY ERROR:", err);

    res.status(500).json({
      msg: "Server error",
    });
  }
};