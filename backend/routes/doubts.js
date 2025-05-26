const express = require("express");
const Doubt = require("../models/Doubt");

const router = express.Router();

// Get all doubts
router.get("/", async (req, res) => {
  try {
    const doubts = await Doubt.find().populate("user").populate("language");
    res.json(doubts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get doubt by ID
router.get("/:id", async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id).populate("user").populate("language");
    if (!doubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }
    res.json(doubt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new doubt
router.post("/", async (req, res) => {
  try {
    const { user, language, topic, question } = req.body;
    const newDoubt = new Doubt({ user, language, topic, question });
    await newDoubt.save();
    res.status(201).json(newDoubt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update doubt (e.g., add answer)
router.put("/:id", async (req, res) => {
  try {
    const { answer } = req.body;
    const updatedDoubt = await Doubt.findByIdAndUpdate(
      req.params.id,
      { answer },
      { new: true }
    );
    if (!updatedDoubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }
    res.json(updatedDoubt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete doubt
router.delete("/:id", async (req, res) => {
  try {
    const deletedDoubt = await Doubt.findByIdAndDelete(req.params.id);
    if (!deletedDoubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }
    res.json({ message: "Doubt deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
