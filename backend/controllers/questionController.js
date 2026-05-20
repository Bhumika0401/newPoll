const mongoose = require("mongoose");
const Question = require("../models/questionModel");


// ===============================
// CREATE SINGLE QUESTION
// ===============================

exports.createQuestion = async (req, res) => {
  try {
    const {
      questionText,
      type,
      options,
      category,
    } = req.body;

    if (
      !questionText ||
      !type ||
      !category ||
      !options
    ) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const existing = await Question.findOne({
      questionText: questionText.trim(),
      category,
    });

    if (existing) {
      return res.status(400).json({
        msg: "Question already exists in this category",
      });
    }

    const question = await Question.create({
      questionText: questionText.trim(),
      type: type.trim(),
      category,
      options,
    });

    res.status(201).json({
      msg: "Question created successfully",
      question,
    });

  } catch (err) {
    console.error("CREATE QUESTION ERROR:", err);

    res.status(500).json({
      msg: err.message,
    });
  }
};


// ===============================
// CREATE MULTIPLE QUESTIONS
// ===============================

exports.createMultipleQuestions = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        msg: "Send array of questions",
      });
    }

    const filtered = [];

    for (const q of data) {

      if (
        !q.questionText ||
        !q.category ||
        !q.options
      ) {
        continue;
      }

      const exists = await Question.findOne({
        questionText: q.questionText.trim(),
        category: q.category,
      });

      if (!exists) {
        filtered.push({
          questionText: q.questionText.trim(),
          type: q.type || "mcq",
          category: q.category,
          options: q.options,
        });
      }
    }

    const questions = await Question.insertMany(filtered);

    res.status(201).json({
      added: questions.length,
      skipped: data.length - questions.length,
      questions,
    });

  } catch (err) {
    console.error("MULTIPLE QUESTION ERROR:", err);

    res.status(500).json({
      msg: err.message,
    });
  }
};


// ===============================
// GET ALL QUESTIONS
// ===============================

exports.getQuestions = async (req, res) => {
  try {

    const questions = await Question.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(questions);

  } catch (err) {
    console.error("GET QUESTIONS ERROR:", err);

    res.status(500).json({
      msg: err.message,
    });
  }
};


// ===============================
// GET QUESTIONS BY CATEGORY
// ===============================

exports.getQuestionsByCategory = async (req, res) => {
  try {

    const categoryId = req.params.category;

    // Validate ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(categoryId)
    ) {
      return res.status(400).json({
        msg: "Invalid category id",
      });
    }

    const questions = await Question.find({
      category: categoryId,
    }).populate("category");

    res.json(questions);

  } catch (err) {

    console.error(
      "GET QUESTIONS BY CATEGORY ERROR:",
      err
    );

    res.status(500).json({
      msg: err.message,
    });
  }
};