import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchLanguages, postDoubt } from "../api";
import { useHistory } from "react-router-dom";

const Doubt = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [doubt, setDoubt] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await fetchLanguages();
        setLanguages(response.data);
      } catch (err) {
        console.error("Failed to load languages", err);
      }
    };
    loadLanguages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!selectedLanguage) {
      setError("Please select a language");
      return;
    }
    if (!topic) {
      setError("Please enter a topic");
      return;
    }
    if (!doubt) {
      setError("Please enter your doubt");
      return;
    }

    try {
      const response = await postDoubt({
        user: user?._id,
        language: selectedLanguage,
        topic,
        question: doubt,
      });
      if (response.status === 201) {
        setMessage("Doubt submitted successfully");
        setTopic("");
        setDoubt("");
        setPhone("");
      } else {
        setError("Failed to submit doubt");
      }
    } catch (err) {
      setError("Failed to submit doubt");
      console.error(err);
    }
  };

  return (
    <section className="doubt section">
      <button className="btn" onClick={() => history.goBack()} style={{ marginBottom: "1rem" }}>
        Go Back
      </button>
      <div className="section-title">
        <h4>Doubt Submission Form</h4>
      </div>
      <div className="doubt-center section-center">
        <form className="doubt-form" onSubmit={handleSubmit}>
          <div className="input-name">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!!user}
              className="doubt-input"
            />
          </div>
          <div className="input-email">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!user}
              className="doubt-input"
            />
          </div>
          <div className="input-phone-no">
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="doubt-input"
            />
          </div>
          <div className="input-language">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              required
              className="doubt-select"
            >
              <option value="">Select Language</option>
              {languages.map((lang) => (
                <option key={lang._id} value={lang._id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-topic">
            <input
              type="text"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="doubt-input"
            />
          </div>
          <div className="input-msg">
            <textarea
              placeholder="Enter your doubt here...."
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              required
              className="doubt-textarea"
            ></textarea>
          </div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <div className="form-btn">
            <button type="submit" className="submit-btn btn">
              submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Doubt;
