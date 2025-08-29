import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";

function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Membership', path: '/membership' },
        { name: 'Services', path: '/services' },
        { name: 'Reviews', path: '/reviews' },
        { name: 'Profile', path: '/profile' }
    ];

    const services = [
        { name: 'Diet Plans', path: '/services/diet-plans' },
        { name: 'Workout Plans', path: '/services/workout-plans' },
        { name: 'Calorie Calculator', path: '/services/calorie-calculator' },
        { name: 'Personal Training', path: '/services' },
        { name: 'Group Classes', path: '/services' }
    ];

    const socialLinks = [
        { name: 'Facebook', icon: <FaFacebookF />, url: 'https://facebook.com' },
        { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
        { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
        { name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com' },
        { name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://linkedin.com' }
    ];

    return (
        <footer className="footer">
            {/* Floating Elements */}
            <div className="footer-floating-elements">
                <div className="floating-element-1">💪</div>
                <div className="floating-element-2">🏋️</div>
                <div className="floating-element-3">⭐</div>
            </div>

            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src={require("../assets/logo.jpeg")} alt="Gym Logo" className="footer-gym-logo" />
                            <div className="footer-logo-text">
                                <span className="footer-brand-name">TILL FAILURE</span>
                                <span className="footer-tagline">FITNESS CLUB</span>
                            </div>
                        </div>
                        <p className="footer-description">
                            Transform your body and mind with our premium fitness facilities,
                            expert trainers, and comprehensive wellness programs. Your fitness journey starts here.
                        </p>
                        <div className="footer-stats">
                            <div className="footer-stat">
                                <span className="stat-number">5000+</span>
                                <span className="stat-label">Members</span>
                            </div>
                            <div className="footer-stat">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Trainers</span>
                            </div>
                            <div className="footer-stat">
                                <span className="stat-number">10+</span>
                                <span className="stat-label">Years</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="footer-link">
                                        <span className="link-icon">▶</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">Get In Touch</h4>
                        <div className="footer-contact">
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div className="contact-details">
                                    <span className="contact-label">Address</span>
                                    <span className="contact-value">123 Fitness Street, Gym City, GC 12345</span>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <div className="contact-details">
                                    <span className="contact-label">Phone</span>
                                    <span className="contact-value">+91 98765 43210</span>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">✉️</span>
                                <div className="contact-details">
                                    <span className="contact-label">Email</span>
                                    <span className="contact-value">info@tillfailure.com</span>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">🕐</span>
                                <div className="contact-details">
                                    <span className="contact-label">Hours</span>
                                    <span className="contact-value">24/7 Access Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section 
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4 className="newsletter-title">Stay Updated</h4>
            <p className="newsletter-description">
              Subscribe to our newsletter for fitness tips, exclusive offers, and gym updates.
            </p>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  <span>Subscribe</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>*/}

                {/* Social Media & Bottom */}
                <div className="footer-bottom">
                    <div className="footer-social">
                        <h4 className="social-title">Follow Us</h4>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={social.name}
                                >
                                    <span className="social-icon">{social.icon}</span>
                                    <span className="social-name">{social.name}</span>
                                </a>
                            ))}
                        </div>

                    </div>

                    <div className="footer-legal">
                        <div className="legal-links">
                            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
                            <Link to="/terms" className="legal-link">Terms of Service</Link>
                            <Link to="/contact" className="legal-link">Contact Us</Link>
                        </div>
                        <div className="copyright">
                            <p>&copy; {currentYear} TILL FAILURE Fitness Club. All rights reserved.</p>
                            <p className="made-with">Made with ❤️ for fitness enthusiasts</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;