const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const languageRoutes = require("./routes/languages");
const quizRoutes = require("./routes/quizzes");
const doubtRoutes = require("./routes/doubts");

app.use("/api/auth", authRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/doubts", doubtRoutes);

app.get("/", (req, res) => {
  res.send("SpeakEasy Backend API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
