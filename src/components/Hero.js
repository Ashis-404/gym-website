import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Hero() {
  return (
    <section className="hero">
      <h2>Transform Your Body, Transform Your Life</h2>
      <p>Join TILL FAILURE  Gym for Free Cardio, 24x7 AC, and Experienced Trainers.</p>
      <div className="hero-buttons">
        <Link to="/membership" className="btn">Join Now</Link>
        <Link to="/services" className="btn">Explore Services</Link>
      </div>
    </section>
  );
}

export default Hero;
