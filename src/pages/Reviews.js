import React from "react";
import "../styles/Reviews.css";

function Reviews() {
  return (
    <div className="reviews-container">
      <h2>Member Reviews</h2>
      
      <form className="review-form">
        <input type="text" placeholder="Your Name" required />
        <textarea placeholder="Write your review..." required></textarea>
        <input type="file" />
        <button type="submit" className="btn">Submit Review</button>
      </form>
      <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn">
        Post on Google Maps
      </a>
    </div>
  );
}

export default Reviews;
