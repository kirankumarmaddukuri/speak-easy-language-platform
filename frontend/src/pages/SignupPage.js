import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import "../index.css";

const SignupPage = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setActive(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register({ username, email, password });
    if (result.success) {
      history.push("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className={`form-container ${active ? "active" : ""}`}>
        <span className="signup-form-bg"></span>

        <section className="form-box signup-form">
          <h1>sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>username</label>
            </div>
            <div className="form-control">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>email</label>
            </div>
            <div className="form-control">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>password</label>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn">
              sign up
            </button>
          </form>
        </section>

        <section className="text signup-text">
          <h1>welcome Dear</h1>
          <p>
            Join our language learning community! Create an account to unlock a
            world of linguistic possibilities and personalized learning
            experiences.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SignupPage;
