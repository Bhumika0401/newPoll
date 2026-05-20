// 
// const router = require("express").Router();

// // const Poll = require("../models/pollModel");
// // const Survey = require("../models/surveyModel");
// // const User = require("../models/User");
// // const Response = require("../models/responseModel");

// // router.get("/", async (req, res) => {

// //   try {

// //     const totalPolls =
// //       await Poll.countDocuments();

// //     const totalSurveys =
// //       await Survey.countDocuments();

// //     const totalUsers =
// //       await User.countDocuments();

// //     const totalResponses =
// //       await Response.countDocuments();

// //     // latest polls
// //     const latestPolls = await Poll.find()
// //       .sort({ createdAt: -1 })
// //       .limit(5);

// //     // latest surveys
// //     const latestSurveys = await Survey.find()
// //       .sort({ createdAt: -1 })
// //       .limit(5);

// //     res.json({
// //       totalPolls,
// //       totalSurveys,
// //       totalUsers,
// //       totalResponses,
// //       latestPolls,
// //       latestSurveys,
// //     });

// //   } catch (err) {

// //     res.status(500).json({
// //       msg: err.message,
// //     });

// //   }
// // });

// // module.exports = router;

// const router = require("express").Router();

// const Poll = require("../models/pollModel");
// const Survey = require("../models/surveyModel");
// const User = require("../models/User");
// const Response = require("../models/responseModel");


// // 🔒 Authentication middleware (Passport session-based)
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated && req.isAuthenticated()) {
//     return next();
//   }
//   return res.status(401).json({ msg: "Unauthorized access" });
// }


// // 📊 Dashboard Analytics Route
// router.get("/", isAuthenticated, async (req, res) => {
//   try {
//     // total counts
//     const totalPolls = await Poll.countDocuments();
//     const totalSurveys = await Survey.countDocuments();
//     const totalUsers = await User.countDocuments();
//     const totalResponses = await Response.countDocuments();

//     // latest data for dashboard cards
//     const latestPolls = await Poll.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .select("question createdAt options");

//     const latestSurveys = await Survey.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .select("title createdAt");

//     // optional: recent activity (responses)
//     const recentResponses = await Response.find()
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.status(200).json({
//       success: true,
//       data: {
//         totalPolls,
//         totalSurveys,
//         totalUsers,
//         totalResponses,
//         latestPolls,
//         latestSurveys,
//         recentResponses,
//       },
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       msg: err.message,
//     });
//   }
// });

// module.exports = router;
const router = require("express").Router();

const Poll = require("../models/pollModel");
const Survey = require("../models/surveyModel");
const User = require("../models/User");
const Response = require("../models/responseModel");

// auth middleware (if needed)
function isAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ msg: "Unauthorized" });
}

router.get("/", isAuth, async (req, res) => {
  try {
    // ======================
    // BASIC COUNTS
    // ======================
    const [
      totalPolls,
      totalSurveys,
      totalUsers,
      totalResponses,
    ] = await Promise.all([
      Poll.countDocuments(),
      Survey.countDocuments(),
      User.countDocuments(),
      Response.countDocuments(),
    ]);

    // ======================
    // RECENT DATA
    // ======================
    const latestPolls = await Poll.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const latestSurveys = await Survey.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const latestResponses = await Response.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // ======================
    // RESPONSE FORMAT
    // ======================
    res.json({
      success: true,
      overview: {
        totalPolls,
        totalSurveys,
        totalUsers,
        totalResponses,
      },
      latest: {
        polls: latestPolls,
        surveys: latestSurveys,
        responses: latestResponses,
      },
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;