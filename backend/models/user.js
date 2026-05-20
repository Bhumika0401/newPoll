const mongoose = require("mongoose");

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      // Optional for Google login users
      password: {
        type: String,
        default: null,
      },

      googleId: {
        type: String,
        default: null,
      },

      avatar: {
        type: String,
        default: null,
      },

      role: {
        type: String,

        enum: ["user", "admin"],

        default: "user",
      },
    },
    {
      timestamps: true,
    }
  );

//  This checks if the model exists before compiling it a second time
module.exports = mongoose.models.User || mongoose.model("User", userSchema);