const express = require("express");
const Quiz = require("../models/Quiz");
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');

const router = express.Router();

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("language");
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get leaderboard for a language/topic
router.get('/leaderboard', async (req, res) => {
  try {
    const { language, topic, limit = 10 } = req.query;
    if (!language || !topic) {
      return res.status(400).json({ message: 'Missing language or topic' });
    }
    const results = await QuizResult.find({ language, topic })
      .sort({ score: -1, createdAt: 1 })
      .limit(Number(limit))
      .select('username score totalQuestions createdAt');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
  // In /results POST
console.log('Saving quiz result:', req.body);

// In /leaderboard GET
console.log('Leaderboard query:', req.query);
});


// Get quiz by ID
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("language");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new quiz
router.post("/", async (req, res) => {
  try {
    const { language, topic, questions } = req.body;
    const newQuiz = new Quiz({ language, topic, questions });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update quiz
router.put("/:id", async (req, res) => {
  try {
    const { language, topic, questions } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { language, topic, questions },
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(updatedQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete quiz
router.delete("/:id", async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Save a quiz result
router.post('/results', async (req, res) => {
  try {
    const { userId, username, language, topic, score, totalQuestions } = req.body;
    if (!userId || !username || !language || !topic || score == null || !totalQuestions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const result = new QuizResult({
      user: userId,
      username,
      language,
      topic,
      score,
      totalQuestions,
    });
    await result.save();

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz history for a specific user
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { language, topic } = req.query; // Optional filters
    let query = { user: userId };

    if (language) {
      query.language = language;
    }
    if (topic) {
      query.topic = topic;
    }

    const results = await QuizResult.find(query)
      .sort({ createdAt: 1 }); // Sort by date ascending for time-based charts

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
