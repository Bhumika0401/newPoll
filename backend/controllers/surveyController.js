const Survey = require("../models/surveyModel");


// =======================================
// CREATE SURVEY
// =======================================

exports.createSurvey = async (req, res) => {
  try {

    const {
      title,
      category,
      questions,
    } = req.body;

    // Check auth
    if (!req.user) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    // Validate fields
    if (
      !title ||
      !category ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    // Create survey
    const survey = await Survey.create({
      title: title.trim(),

      category,

      questions,

      createdBy: req.user.id,
    });

    res.status(201).json({
      msg: "Survey created successfully",
      survey,
    });

  } catch (err) {

    console.error(
      "CREATE SURVEY ERROR:",
      err
    );

    res.status(500).json({
      msg: err.message,
    });
  }
};


// =======================================
// GET ALL SURVEYS
// =======================================

exports.getAllSurveys = async (req, res) => {
  try {

    const surveys = await Survey.find()
      .populate("category")
      .populate(
        "createdBy",
        "name email"
      )
      .sort({ createdAt: -1 });

    res.json(surveys);

  } catch (err) {

    console.error(
      "GET ALL SURVEYS ERROR:",
      err
    );

    res.status(500).json({
      msg: err.message,
    });
  }
};


// =======================================
// GET SINGLE SURVEY
// =======================================

exports.getSurvey = async (req, res) => {
  try {

    const survey = await Survey.findById(
      req.params.id
    )
      .populate("category")
      .populate(
        "createdBy",
        "name email"
      );

    if (!survey) {
      return res.status(404).json({
        msg: "Survey not found",
      });
    }

    res.json(survey);

  } catch (err) {

    console.error(
      "GET SURVEY ERROR:",
      err
    );

    res.status(500).json({
      msg: err.message,
    });
  }
};


// =======================================
// GET SURVEYS BY CATEGORY
// =======================================

exports.getSurveyByCategory = async (
  req,
  res
) => {
  try {

    const categoryId =
      req.params.category;

    const surveys = await Survey.find({
      category: categoryId,
    })
      .populate("category")
      .sort({ createdAt: -1 });

    res.json(surveys);

  } catch (err) {

    console.error(
      "GET SURVEY CATEGORY ERROR:",
      err
    );

    res.status(500).json({
      msg: err.message,
    });
  }
};