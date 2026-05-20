const mongoose = require("mongoose");

const responseSchema =
  new mongoose.Schema(
    {
      // =================================
      // RESPONSE TYPE
      // =================================
      type: {
        type: String,
        enum: ["poll", "survey"],
        required: true,
      },

      // =================================
      // USER
      // =================================
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      // =================================
      // POLL RESPONSE
      // =================================
      poll: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Poll",

        default: null,
      },

      pollResponse: {
        optionIndex: {
          type: Number,
          default: null,
        },
      },

      // =================================
      // SURVEY RESPONSE
      // =================================
      survey: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Survey",

        default: null,
      },

      surveyResponse: {
        answers: [
          {
            question: {
              type: String,
            },

            selectedAnswer: {
              type: String,
            },
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  );


// ===================================
// ONE POLL RESPONSE PER USER
// ===================================

responseSchema.index(
  { poll: 1, user: 1 },
  {
    unique: true,

    partialFilterExpression: {
      poll: {
        $exists: true,
        $ne: null,
      },
    },
  }
);


// ===================================
// ONE SURVEY RESPONSE PER USER
// ===================================

responseSchema.index(
  { survey: 1, user: 1 },
  {
    unique: true,

    partialFilterExpression: {
      survey: {
        $exists: true,
        $ne: null,
      },
    },
  }
);

module.exports = mongoose.model(
  "Response",
  responseSchema
);