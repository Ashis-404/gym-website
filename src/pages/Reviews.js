import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../styles/Reviews.css";

function Reviews() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5,
    image: null
  });
  const [reviews, setReviews] = useState([]); // Initialize with an empty array
  const [googleReviews, setGoogleReviews] = useState([]); // State for Google reviews
  const fileInputRef = useRef(null); // Ref to the file input

  // Animation observers
  const { ref: formRef, inView: formVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: reviewsRef, inView: reviewsVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
    // fetchReviews(); // Fetch initial reviews
    fetchGoogleReviews(); // Fetch Google Maps reviews
  }, []);

  // Fetches initial mock reviews
  //  const fetchReviews = () => {
  //    // Mock reviews data
  //   const mockReviews = [
  //      {
  //        id: 1,
  //        name: "Amit Sharma",
  //        rating: 5,
  //        review: "Amazing gym with top-notch equipment! The trainers are incredibly supportive and knowledgeable. I've seen tremendous progress in just 3 months.",
  //        date: "2024-01-15",
  //        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  //      },
  //      {
  //        id: 2,
  //        name: "Priya Singh",
  //        rating: 5,
  //        review: "Best gym in the city! Clean environment, premium equipment, and 24/7 access makes it perfect for my busy schedule. Highly recommended!",
  //        date: "2024-01-10",
  //        image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  //      },
  //      {
  //        id: 3,
  //        name: "Rahul Mehta",
  //        rating: 4,
  //        review: "Great facilities and affordable plans. The group classes are fantastic and the community is very motivating. Love the energy here!",
  //        date: "2024-01-08",
  //        image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  //      },
  //      {
  //        id: 4,
  //        name: "Sneha Patel",
  //        rating: 5,
  //        review: "Transformed my fitness journey completely! The personal trainers are exceptional and the nutrition guidance is spot on. Worth every penny!",
  //        date: "2024-01-05",
  //        image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  //      },
  //      {
  //        id: 5,
  //        name: "Vikash Kumar",
  //        rating: 5,
  //        review: "Outstanding gym with modern equipment and professional staff. The atmosphere is motivating and results speak for themselves. Absolutely love it!",
  //        date: "2024-01-02",
  //        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  //      }
  //    ];
  //    setReviews(mockReviews);
  //  };

  // Fetches reviews from Google Maps using the Google Places API
  const fetchGoogleReviews = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key='AIzaSyDnkhtHl-PLFl4LN0XWmXPlmznITHLQyL4'&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const map = new window.google.maps.Map(document.createElement("div")); // dummy div

      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails(
        {
          placeId: "ChIJhYJlOCqb-DkRxGue_ksnvns", // your gym Place ID
          fields: ["reviews", "name", "rating"],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            const formattedReviews = place.reviews.map((review, i) => ({
              id: review.author_name + i,
              name: review.author_name,
              rating: review.rating,
              review: review.text,
              date: new Date(review.time * 1000).toISOString().split("T")[0],
              image:
                review.profile_photo_url ||
                "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
              source: "Google Maps",
            }));
            console.log("Fetched Google Reviews:", formattedReviews); 
            setGoogleReviews(formattedReviews);
          }
        }
      );
    };

    document.body.appendChild(script);
  };


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new review
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      rating: parseInt(formData.rating),
      review: formData.review,
      date: new Date().toISOString().split('T')[0],
      image: formData.image ? URL.createObjectURL(formData.image) : "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    };

    setReviews(prev => [newReview, ...prev]);

    // Reset form
    setFormData({
      name: '',
      review: '',
      rating: 5,
      image: null
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert('Thank you for your review! It has been submitted successfully.');
  };

  // Handles the click on the "Choose a photo" button
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ));
  };

  // Combine local and Google reviews, then sort by date
  const allReviews = [...reviews, ...googleReviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;

  return (
    <div className="reviews-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-star floating-element-1">⭐</div>
        <div className="floating-heart floating-element-2">❤️</div>
        <div className="floating-thumbs floating-element-3">👍</div>
      </div>

      {/* Hero Section */}
      <section className="reviews-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Member
              <span className="highlight"> Reviews</span>
            </h1>
            <p className="hero-subtitle">
              See what our amazing members have to say about their fitness journey with us.
              Your feedback helps us continue to provide the best gym experience.
            </p>
            <div className="rating-summary">
              <div className="average-rating">
                <span className="rating-number">{averageRating.toFixed(1)}</span>
                <div className="rating-stars">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="rating-text">Based on {allReviews.length} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="review-form-section" ref={formRef}>
        <div className="container">
          <div className={`form-container ${formVisible ? 'animate-in' : ''}`}>
            <div className="section-header">
              <h2 className="section-title">Share Your Experience</h2>
              <p className="section-subtitle">
                Tell us about your fitness journey and help others make the right choice
              </p>
            </div>

            <form className="review-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <div className="rating-input">
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ Very Good</option>
                    <option value={3}>⭐⭐⭐ Good</option>
                    <option value={2}>⭐⭐ Fair</option>
                    <option value={1}>⭐ Poor</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="review">Your Review</label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  placeholder="Share your experience with our gym, trainers, facilities, and services..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Photo (Optional)</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*,video/*"
                    ref={fileInputRef} // Assign the ref here
                    style={{ display: 'none' }} // Hide the actual input
                  />
                  <div className="file-input-label" onClick={handleImageButtonClick}>
                    <span className="file-icon">📷</span>
                    <span>{formData.image ? formData.image.name : 'Choose a photo or video'}</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <span>Submit Review</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <a
                  href="https://www.google.com/maps/place/TILL+FAILURE/@22.7235245,88.3397743,17z/data=!4m8!3m7!1s0x39f89b2a38658285:0x7bbe274bfe9e6bc4!8m2!3d22.7235196!4d88.3423492!9m1!1b1!16s%2Fg%2F11wvd38c16?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="google-btn"
                >
                  <span className="google-icon">🗺️</span>
                  <span>Review on Google Maps</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Reviews Display Section */}
      <section className="reviews-display-section" ref={reviewsRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Members Say</h2>
            <p className="section-subtitle">
              Real experiences from real people who transformed their lives with us
            </p>
          </div>

          <div className="reviews-grid">
            {allReviews.map((review, index) => (
              <div
                key={review.id}
                className={`review-card ${reviewsVisible ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="review-header">
                  <div className="reviewer-info">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="reviewer-image"
                    />
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">{review.name}</h4>
                      <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <div className="review-content">
                  <p className="review-text">"{review.review}"</p>
                </div>

                {review.source === 'Google Maps' && (
                  <div className="google-review-source">
                    <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">
                      Reviewed on Google Maps
                      <img src="https://www.google.com/images/branding/product/1x/google_maps_128dp.png" alt="Google Maps logo" width="16" height="16" />
                    </a>
                  </div>
                )}

                <div className="review-footer">
                  <div className="helpful-section">
                    <button className="helpful-btn">
                      <span>👍</span>
                      <span>Helpful</span>
                    </button>
                    <span className="helpful-count">12</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="reviews-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Fitness Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied members and experience the transformation yourself
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                <span>Join Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="cta-btn secondary">
                <span>Schedule Tour</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reviews;