import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; 
import "../styles/Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); 
    navigate("/signin");  
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo" onClick={() => navigate('/')}>
          <div className="logo-container">
            <img src={require("../assets/logo.jpeg")} alt="Gym Logo" className="gym-logo" />
            <div className="logo-text-container">
              <span className="logo-text">TILL FAILURE</span>
              <span className="logo-tagline">FITNESS CLUB</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          <li>
            <NavLink to="/" end className="nav-link">
              <span className="nav-text">Home</span>
              <div className="nav-indicator"></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/membership" className="nav-link">
              <span className="nav-text">Membership</span>
              <div className="nav-indicator"></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className="nav-link">
              <span className="nav-text">Services</span>
              <div className="nav-indicator"></div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" className="nav-link">
              <span className="nav-text">Reviews</span>
              <div className="nav-indicator"></div>
            </NavLink>
          </li>
        </ul>

        {/* User Actions */}
        <div className="navbar-actions">
          <NavLink to="/profile" className="profile-icon-link">
            <div className="profile-icon">
              <FaUserCircle />
              <span className="profile-tooltip">Profile</span>
            </div>
          </NavLink>

          {/* Auth Button */}
          <div className="auth-section">
            {isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
                <span>Sign Out</span>
              </button>
            ) : (
              <NavLink to="/signin" className="login-btn">
                <span>Sign In</span>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-links">
            <li>
              <NavLink to="/" end className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/membership" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Membership</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Services</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Reviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Profile</span>
              </NavLink>
            </li>
            <li className="mobile-auth-section">
              {isLoggedIn ? (
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
              ) : (
                <NavLink to="/signin" className="mobile-login-btn" onClick={closeMobileMenu}>
                  Sign In
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`mobile-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </nav>
  );
}

export default Navbar;