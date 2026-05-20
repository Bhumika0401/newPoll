const router = require("express").Router();

const {
  createPoll,
  getPolls,
  getPollById,
  votePoll,
} = require("../controllers/pollController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const Poll = require("../models/pollModel");

// ================= CREATE POLL =================
router.post("/", auth, createPoll);
// ================= VOTE POLL =================
router.post("/vote", auth, votePoll);

// ================= GET ALL POLLS =================
router.get("/", auth, getPolls);


// ================= GET POLL BY ID =================
router.get("/:id", auth, getPollById);

// ================= DELETE POLL =================
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({
        msg: "Poll not found",
      });
    }

    await Poll.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Deleted successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });
  }
});

// ================= GET BY CATEGORY =================
router.get("/category/:id", auth, async (req, res) => {
  try {
    const polls = await Poll.find({
      category: req.params.id,
    })
      .populate("createdBy", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(polls);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });
  }
});

module.exports = router;