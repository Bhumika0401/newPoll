const Poll = require("../models/pollModel");
const Question = require("../models/questionModel");

exports.getDataByType = async (req, res) => {
    try {
        const { type } = req.params;

        // get polls
        const polls = await Poll.find({ type });

        // get questions
        const questions = await Question.find({ type });

        res.json({
            type,
            polls,
            questions
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};