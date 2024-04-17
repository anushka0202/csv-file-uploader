import React, { useState } from "react";
import logo from "./../assets/blue-logo-and-company.svg";
import "../styles/LoginPage.css";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email format validation using regex
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsAuthenticated(true);
  };

  return (
    <div className="login-page-container">
      <div className="login-logo">
        <img
          style={{
            height: "80.153px",
          }}
          src={logo}
          alt="logo"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: "100vw",
        }}
      >
        <div className="login-right">
          <div className="sign-in">Sign In</div>
          <div className="sign-in-text">Sign in to your account</div>
          <div className="login-box">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="login-input"
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="login-input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button className="sign-in-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
