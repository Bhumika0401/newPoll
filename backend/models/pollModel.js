const mongoose = require("mongoose");

// ================= OPTION SCHEMA =================
const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    votes: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

// ================= RESPONSE SCHEMA =================
const responseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    selectedOption: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { _id: false }
);

// ================= POLL SCHEMA =================
const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    // SAME CATEGORY SYSTEM AS SURVEYS
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    options: {
      type: [optionSchema],

      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 2,
        message: "At least 2 options required",
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // STORE WHO VOTED
    responses: [responseSchema],
  },
  {
    timestamps: true,
  }
);

// ================= INDEXES =================
pollSchema.index({ category: 1 });
pollSchema.index({ createdBy: 1 });

module.exports = mongoose.model("Poll", pollSchema);