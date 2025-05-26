const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswerIndex: Number,
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
