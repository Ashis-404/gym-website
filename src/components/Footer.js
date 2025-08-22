import React from "react";
import "../styles/Footer.css";


function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Gym Website. All rights reserved.</p>
            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
  <i className="fab fa-whatsapp"></i></a>
            </div>
        </footer>
    );
}

export default Footer;
