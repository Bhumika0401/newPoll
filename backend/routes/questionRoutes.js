const router = require("express").Router();

const auth =
  require("../middleware/authMiddleware");

const admin =
  require("../middleware/adminMiddleware");

const {
  createQuestion,
  createMultipleQuestions,
  getQuestions,
  getQuestionsByCategory,
} = require("../controllers/questionController");


// =====================================
// CREATE SINGLE QUESTION
// ADMIN ONLY
// =====================================

router.post(
  "/",
  auth,
  admin,
  createQuestion
);


// =====================================
// CREATE MULTIPLE QUESTIONS
// ADMIN ONLY
// =====================================

router.post(
  "/multiple",
  auth,
  admin,
  createMultipleQuestions
);


// =====================================
// GET ALL QUESTIONS
// =====================================

router.get("/", getQuestions);


// =====================================
// GET QUESTIONS BY CATEGORY
// =====================================

router.get(
  "/category/:category",
  getQuestionsByCategory
);

module.exports = router;