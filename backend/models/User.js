const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  progress: {
    type: Map,
    of: Number, // e.g., topicName: score or progress percentage
    default: {},
  },
});

module.exports = mongoose.model("User", userSchema);
