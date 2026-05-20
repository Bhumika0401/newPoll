const Poll = require("../models/pollModel");
const Survey = require("../models/surveyModel");
const Response = require("../models/responseModel");


// ========================================
// VOTE IN POLL
// ========================================

exports.vote = async (req, res) => {
  try {

    const { pollId } = req.body;
    let { optionIndex } = req.body;

    optionIndex = Number(optionIndex);

    // Check auth
    if (!req.user) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    // Find poll
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({
        msg: "Poll not found",
      });
    }

    // Validate option
    if (
      isNaN(optionIndex) ||
      optionIndex < 0 ||
      optionIndex >= poll.options.length
    ) {
      return res.status(400).json({
        msg: "Invalid option",
      });
    }

    // Save response
    await Response.create({
      type: "poll",

      poll: pollId,

      user: req.user.id,

      pollResponse: {
        optionIndex,
      },
    });

    // Increment vote
    const updatedPoll =
      await Poll.findByIdAndUpdate(
        pollId,
        {
          $inc: {
            [`options.${optionIndex}.votes`]: 1,
          },
        },
        { new: true }
      );

    res.json({
      msg: "Vote submitted successfully",
      poll: updatedPoll,
    });

  } catch (err) {

    console.error("VOTE ERROR:", err);

    // Duplicate vote
    if (err.code === 11000) {
      return res.status(400).json({
        msg: "You already voted",
      });
    }

    res.status(500).json({
      msg: err.message,
    });
  }
};


// ========================================
// SUBMIT SURVEY
// ========================================

exports.submitSurvey = async (req, res) => {
  try {

    const { surveyId, answers } = req.body;

    // Check auth
    if (!req.user) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    // Find survey
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({
        msg: "Survey not found",
      });
    }

    // Check duplicate submission
    const existing = await Response.findOne({
      survey: surveyId,
      user: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        msg: "Already submitted",
      });
    }

    // Validate answers
    if (
      !Array.isArray(answers) ||
      answers.length !== survey.questions.length
    ) {
      return res.status(400).json({
        msg: "Answer all questions",
      });
    }

    // Update survey votes
    answers.forEach((ans) => {

      const q =
        survey.questions[ans.questionIndex];

      if (
        q &&
        q.options[ans.selectedOption]
      ) {
        q.options[
          ans.selectedOption
        ].votes += 1;
      }
    });

    await survey.save();

    // Format answers
    const formattedAnswers =
      answers.map((ans) => ({
        question:
          survey.questions[
            ans.questionIndex
          ].questionText,

        selectedAnswer:
          survey.questions[
            ans.questionIndex
          ].options[
            ans.selectedOption
          ].text,
      }));

    // Save response
    await Response.create({
      type: "survey",

      survey: surveyId,

      user: req.user.id,

      surveyResponse: {
        answers: formattedAnswers,
      },
    });

    res.json({
      msg: "Survey submitted successfully",
    });

  } catch (err) {

    console.error(
      "SUBMIT SURVEY ERROR:",
      err
    );

    if (err.code === 11000) {
      return res.status(400).json({
        msg: "Already submitted",
      });
    }

    res.status(500).json({
      msg: err.message,
    });
  }
};