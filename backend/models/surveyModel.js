const mongoose = require("mongoose");

const surveySchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      // =================================
      // CATEGORY REFERENCE
      // =================================
      category: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Category",

        required: true,
      },

      // =================================
      // QUESTIONS
      // =================================
      questions: [
        {
          questionText: {
            type: String,
            required: true,
            trim: true,
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
      ],

      // =================================
      // CREATED BY
      // =================================
      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Survey",
  surveySchema
);