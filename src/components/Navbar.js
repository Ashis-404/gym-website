import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; 
import "../styles/Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); 
    navigate("/signin");  
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={require("../assets/logo.jpeg")} alt="Gym Logo" className="gym-logo" />
        <span className="logo-text">TILL FAILURE</span>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/profile" className="profile-icon">
            <FaUserCircle />
          </NavLink>
        </li>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/membership">Membership</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/reviews">Reviews</NavLink></li>

        {/* Toggle between Sign In / Sign Out */}
        <li>
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
          ) : (
            <NavLink to="/signin" className="login-btn">Sign In</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
