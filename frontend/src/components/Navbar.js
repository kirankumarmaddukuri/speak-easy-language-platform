import React, { useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import logo from "../assets/L-letter.jpg";
import { navLinks } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };
  
  const displayName = user?.username || user?.name || user?.email || "User";

  return (
    <nav>
      <div className="nav-center">
        {/* Navbar Logo */}
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="speak easy logo" />
          </Link>
        </div>

        {/* Navbar Links */}
        <ul className="nav-links">
          {navLinks.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <NavLink exact to={url} activeClassName="active-nav-link">
                  {text}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {token ? (
          <div
            className="auth-btn"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span style={{ color: "white" }}>
              Welcome, {displayName}
            </span>
            <button
              onClick={handleLogout}
              className="btn"
              style={{ padding: "5px 10px" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="auth-btn">
            Login
            <FaUserPlus />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
