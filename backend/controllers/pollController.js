const Poll = require("../models/pollModel");

// ================= CREATE POLL =================
exports.createPoll = async (req, res) => {
  try {
    const { question, category, options } = req.body;

    if (!question || !category || !options) {
      return res.status(400).json({
        msg: "All fields required",
      });
    }

    // format options
    const formattedOptions = options.map((opt) => ({
      text: opt.text,
      votes: 0,
    }));

    const poll = await Poll.create({
      question,
      category,
      options: formattedOptions,
      createdBy: req.user.id,
      responses: [],
    });

    res.json(poll);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: err.message,
    });
  }
};

// ================= GET ALL POLLS =================
exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find()
      .populate("category", "name")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(polls);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: err.message,
    });
  }
};

// ================= GET SINGLE POLL =================
exports.getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id)
      .populate("category", "name")
      .populate("createdBy", "name");

    if (!poll) {
      return res.status(404).json({
        msg: "Poll not found",
      });
    }

    // send current user id also
    res.json({
      ...poll.toObject(),
      currentUserId: req.user.id,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: err.message,
    });
  }
};

// ================= VOTE POLL =================
// ================= VOTE POLL =================
exports.votePoll = async (req, res) => {
  try {
    const { pollId, optionId } = req.body;

    const userId = req.user.id;

    // FIND POLL
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({
        msg: "Poll not found",
      });
    }

    // FIX OLD POLLS
    if (!poll.responses) {
      poll.responses = [];
    }

    // CHECK ALREADY VOTED
    const alreadyVoted = poll.responses.find(
      (r) => r.user.toString() === userId
    );

    if (alreadyVoted) {
      return res.status(400).json({
        msg: "Already voted",
      });
    }

    // FIND OPTION
    const option = poll.options.id(optionId);

    if (!option) {
      return res.status(404).json({
        msg: "Option not found",
      });
    }

    // ADD VOTE
    option.votes += 1;

    // SAVE RESPONSE
    poll.responses.push({
      user: userId,
      selectedOption: optionId,
    });

    await poll.save();

    res.json({
      msg: "Vote submitted",
      poll,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: err.message,
    });
  }
};