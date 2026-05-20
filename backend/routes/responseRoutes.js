// const router = require("express").Router();

// const auth =
//   require("../middleware/authMiddleware");

// const Response =
//   require("../models/responseModel");

// const {
//   vote,
//   submitSurvey,
// } = require("../controllers/responseController");


// // =====================================
// // VOTE IN POLL
// // =====================================

// router.post(
//   "/vote",
//   auth,
//   vote
// );


// // =====================================
// // SUBMIT SURVEY
// // =====================================

// router.post(
//   "/survey",
//   auth,
//   submitSurvey
// );


// // =====================================
// // CHECK IF USER ALREADY VOTED
// // =====================================

// router.get(
//   "/check/:pollId",
//   auth,

//   async (req, res) => {
//     try {

//       const existing =
//         await Response.findOne({
//           poll: req.params.pollId,

//           user: req.user.id,
//         });

//       res.json({
//         voted: !!existing,
//       });

//     } catch (err) {

//       console.error(
//         "CHECK POLL RESPONSE ERROR:",
//         err
//       );

//       res.status(500).json({
//         msg: err.message,
//       });
//     }
//   }
// );


// // =====================================
// // CHECK IF USER ALREADY SUBMITTED SURVEY
// // =====================================

// router.get(
//   "/survey-check/:surveyId",
//   auth,

//   async (req, res) => {
//     try {

//       const existing =
//         await Response.findOne({
//           survey:
//             req.params.surveyId,

//           user: req.user.id,
//         });

//       res.json({
//         submitted: !!existing,
//       });

//     } catch (err) {

//       console.error(
//         "CHECK SURVEY RESPONSE ERROR:",
//         err
//       );

//       res.status(500).json({
//         msg: err.message,
//       });
//     }
//   }
// );

// module.exports = router;
const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const Response = require("../models/responseModel");

const {
  vote,
  submitSurvey,
} = require("../controllers/responseController");


// ===============================
// VOTE IN POLL
// ===============================
router.post("/vote", auth, vote);


// ===============================
// SUBMIT SURVEY
// ===============================
router.post("/survey", auth, submitSurvey);


// ===============================
// CHECK IF USER VOTED (POLL)
// ===============================
router.get("/check/:pollId", auth, async (req, res) => {
  try {
    const existing = await Response.findOne({
      poll: req.params.pollId,
      user: req.user.id,
    });

    res.json({
      voted: Boolean(existing),
    });

  } catch (err) {
    console.error("POLL CHECK ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ===============================
// CHECK IF USER SUBMITTED SURVEY
// ===============================
router.get("/survey-check/:surveyId", auth, async (req, res) => {
  try {
    const existing = await Response.findOne({
      survey: req.params.surveyId,
      user: req.user.id,
    });

    res.json({
      submitted: Boolean(existing),
    });

  } catch (err) {
    console.error("SURVEY CHECK ERROR:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ===============================
// (OPTIONAL) GET USER RESPONSES
// ===============================
router.get("/my-responses", auth, async (req, res) => {
  try {
    const responses = await Response.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: responses,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;