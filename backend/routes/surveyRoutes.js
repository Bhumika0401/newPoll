const router = require("express").Router();

const auth =
  require("../middleware/authMiddleware");

const admin =
  require("../middleware/adminMiddleware");

const {
  createSurvey,
  getSurvey,
  getAllSurveys,
  getSurveyByCategory,
} = require("../controllers/surveyController");


// =====================================
// CREATE SURVEY (ADMIN ONLY)
// =====================================

router.post(
  "/",
  auth,
  admin,
  createSurvey
);


// =====================================
// GET ALL SURVEYS
// =====================================

router.get(
  "/",
  getAllSurveys
);


// =====================================
// GET SURVEYS BY CATEGORY
// =====================================

router.get(
  "/category/:category",
  getSurveyByCategory
);


// =====================================
// GET SINGLE SURVEY
// =====================================

router.get(
  "/:id",
  getSurvey
);

module.exports = router;