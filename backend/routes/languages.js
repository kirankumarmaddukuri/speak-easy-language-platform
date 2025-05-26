const express = require("express");
const Language = require("../models/Language");

const router = express.Router();

// Get all languages
router.get("/", async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get language by ID
router.get("/:id", async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(language);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new language
router.post("/", async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    const newLanguage = new Language({ name, description, imageUrl });
    await newLanguage.save();
    res.status(201).json(newLanguage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update language
router.put("/:id", async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    const updatedLanguage = await Language.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl },
      { new: true }
    );
    if (!updatedLanguage) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(updatedLanguage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete language
router.delete("/:id", async (req, res) => {
  try {
    const deletedLanguage = await Language.findByIdAndDelete(req.params.id);
    if (!deletedLanguage) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json({ message: "Language deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
