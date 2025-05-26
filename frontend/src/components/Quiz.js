import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaRedo, FaArrowLeft, FaQuestionCircle } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000/api/quizzes";

const Quiz = ({ questions, backUrl = "/languages-page", languageName, topic }) => {
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();

  const handleAnswerChange = (index, option) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (userAnswers.some((answer) => answer === "")) {
      addToast("Please answer all questions before submitting.", "warning");
      return;
    }
    setSubmitted(true);
    // Submit result to backend
    if (user && user._id && languageName && topic) {
      try {
        await axios.post(`${API_BASE_URL}/results`, {
          userId: user._id,
          username: user.username,
          language: languageName,
          topic,
          score: correct,
          totalQuestions: questions.length,
        });
        addToast("Quiz results saved successfully!", "success");
      } catch (err) {
        console.error("Failed to submit quiz result", err);
        addToast("Failed to save quiz results. Please try again.", "error");
      }
    }
    // Fetch leaderboard
    fetchLeaderboard();
  };

  const fetchLeaderboard = async () => {
    if (!languageName || !topic) return;
    setLoadingLeaderboard(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/leaderboard`, {
        params: { language: languageName, topic, limit: 10 },
      });
      setLeaderboard(res.data);
    } catch (err) {
      setLeaderboard([]);
      addToast("Failed to load leaderboard.", "error");
    }
    setLoadingLeaderboard(false);
  };

  const score = () => {
    let correct = 0;
    let incorrect = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        correct++;
      } else {
        incorrect++;
      }
    });
    return { correct, incorrect };
  };

  const { correct, incorrect } = score();

  const getPerformanceMessage = () => {
    if (correct < 5) return "Poor Performance";
    if (correct < 8) return "Average Performance";
    if (correct < 10) return "Good Performance";
    return "Excellent Performance";
  };

  const renderResults = () => {
    return questions.map((question, index) => (
      <div key={question.id} className="q-and-opts">
        <p className="question">{index + 1 + " " + question.question}</p>
        <div className="your-ans-and-cor-ans">
          <span
            className={`your-ans 
              ${
                userAnswers[index] === question.answer ? "correct" : "incorrect"
              }`}
          >
            Your answer : {userAnswers[index]}
          </span>
          <span className="correct-ans">
            Correct answer : {question.answer}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className="quiz-app">
      {!submitted ? (
        <>
          <button className="btn" onClick={() => history.goBack()} style={{ marginBottom: "1rem" }}>
            <FaArrowLeft className="icon" /> Go Back
          </button>
          {questions.map((question, index) => (
            <div key={question.id} className="q-and-opts">
              <p className="question">
                <FaQuestionCircle className="icon" /> {index + 1 + ". " + question.question}
              </p>
              <div className="opts">
                {question.options.map((option) => (
                  <span key={option}>
                    <input
                      type="radio"
                      value={option}
                      checked={userAnswers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    <label>{option}</label>
                  </span>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} className="btn">
            <FaCheckCircle className="icon" /> Submit
          </button>
        </>
      ) : (
        <>
          <div className="results">
            <p>
              <FaCheckCircle className="icon correct" /> Correct answers: <span>{correct}</span>
            </p>
            <p>
              <FaTimesCircle className="icon incorrect" /> Incorrect answers: <span>{incorrect}</span>
            </p>
            <p>
              <FaTrophy className="icon trophy" /> Status: {" "}
              <span>
                {getPerformanceMessage()}
              </span>
            </p>
          </div>
          <div className="answers">{renderResults()}</div>
          <button className="btn" onClick={() => window.location.reload()}>
            <FaRedo className="icon" /> Re-attempt
          </button>
          <button className="btn" onClick={() => history.push(backUrl)} style={{ marginLeft: "10px" }}>
            <FaArrowLeft className="icon" /> Go Back to Learning
          </button>
          {/* Leaderboard Section */}
          <div className="leaderboard-section" style={{ marginTop: "2rem" }}>
            <h3><FaTrophy className="icon" /> Leaderboard</h3>
            {loadingLeaderboard ? (
              <p>Loading leaderboard...</p>
            ) : leaderboard.length === 0 ? (
              <p>No leaderboard data available.</p>
            ) : (
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.slice(0, 5).map((entry, idx) => {
                    let rowClass = "";
                    if (idx === 0) rowClass = "top-1";
                    else if (idx === 1) rowClass = "top-2";
                    else if (idx === 2) rowClass = "top-3";
                    if (user && entry.username === user.username) rowClass += " current-user";
                    return (
                      <tr key={entry._id || idx} className={rowClass.trim()}>
                        <td>
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                        </td>
                        <td>{entry.username}</td>
                        <td>{entry.score} / {entry.totalQuestions}</td>
                        <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
