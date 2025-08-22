import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  // Stats intersection observer
  const { ref: statsRef, inView: statsVisible } = useInView({
    threshold: 0.3,
    triggerOnce: false, // allow re-triggering when scrolled back
  });

  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    if (statsVisible) {
      setAnimateStats(true);
    } else {
      setAnimateStats(false); // reset counts when out of view
    }
  }, [statsVisible]);

  const stats = [
    { id: 1, label: "Happy Members", value: 5000 },
    { id: 2, label: "Certified Trainers", value: 50 },
    { id: 3, label: "Years of Excellence", value: 10 },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Amit Sharma",
      text: "This gym changed my life! Trainers are supportive & the vibe is amazing.",
    },
    {
      id: 2,
      name: "Priya Singh",
      text: "Best place to train! Clean environment & premium equipment.",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      text: "Affordable plans with 24x7 access. Highly recommended!",
    },
  ];

  function NextArrow(props) {
    const { onClick } = props;
    return <div className="arrow next-btn" onClick={onClick}>›</div>;
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return <div className="arrow prev-btn" onClick={onClick}>‹</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Body, Transform Your Life</h1>
          <p className="hero-subtitle">
            Join the best gym with 24x7 access, certified trainers & premium facilities.
          </p>
          <div className="hero-buttons">
            <button
              className="join-btn"
              onClick={() => navigate("/membership")}
            >
              Join Now
            </button>
            <button className="join-btn" onClick={() => navigate("/services")}>
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>💪 Experienced Trainers</h3>
            <p>Learn from the best certified professionals.</p>
          </div>
          <div className="feature-card">
            <h3>🔥 24x7 Access</h3>
            <p>Workout anytime that suits your schedule.</p>
          </div>
          <div className="feature-card">
            <h3>🏋 Premium Equipment</h3>
            <p>State-of-the-art machines & free weights.</p>
          </div>
          <div className="feature-card">
            <h3>💳 Flexible Plans</h3>
            <p>Choose from monthly, quarterly, or yearly plans.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        {stats.map((stat) => (
          <div className="stat-card" key={stat.id}>
            <h2 className="stat-number">
              {animateStats ? (
                <CountUp end={stat.value} duration={2} />
              ) : (
                0
              )}
              +
            </h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Members Say</h2>
        <Slider {...sliderSettings}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <p>"{t.text}"</p>
              <h4>- {t.name}</h4>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default Home;
