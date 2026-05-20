const mongoose = require("mongoose");

const questionSchema =
  new mongoose.Schema(
    {
      questionText: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        required: true,
        enum: [
          "mcq",
          "single",
          "multiple",
          "text",
        ],
        default: "mcq",
      },

      category: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Category",

        required: true,
      },

      options: [
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
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Question",
  questionSchema
);