import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../index.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.success) {
      history.push("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <span className="login-form-bg"></span>

        <section className="form-box login-form">
          <h1>login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <div className="form-control">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn">
              login
            </button>
            <div className="link">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">
                  sign up
                </Link>
              </p>
            </div>
          </form>
        </section>

        <section className="text login-text">
          <h1>welcome back</h1>
          <p>
            Continue your language learning journey. Sign in to access your
            personalized learning experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
