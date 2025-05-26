const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
    required: true,
  },
  topic: String,
  question: {
    type: String,
    required: true,
  },
  answer: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doubt", doubtSchema);
