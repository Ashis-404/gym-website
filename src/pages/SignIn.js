import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css"; 

function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- add this

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsLoggedIn(true);
  localStorage.setItem("isLoggedIn", "true"); // persist login
  navigate("/"); // go to Home page
};


  return (
    <div className="auth-wrapper">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-full">Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
