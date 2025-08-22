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
    triggerOnce: false,
  });

  // Features intersection observer
  const { ref: featuresRef, inView: featuresVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [animateStats, setAnimateStats] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (statsVisible) {
      setAnimateStats(true);
    } else {
      setAnimateStats(false);
    }
  }, [statsVisible]);

  const stats = [
    { id: 1, label: "Happy Members", value: 5000, icon: "👥" },
    { id: 2, label: "Certified Trainers", value: 50, icon: "🏆" },
    { id: 3, label: "Years of Excellence", value: 10, icon: "⭐" },
    { id: 4, label: "Equipment Units", value: 200, icon: "🏋️" },
  ];

  const features = [
    {
      id: 1,
      title: "Expert Personal Training",
      description: "One-on-one sessions with certified fitness professionals",
      icon: "💪",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)"
    },
    {
      id: 2,
      title: "24/7 Gym Access",
      description: "Train whenever you want with our round-the-clock facility",
      icon: "🕐",
      gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)"
    },
    {
      id: 3,
      title: "Premium Equipment",
      description: "State-of-the-art machines and free weights for all fitness levels",
      icon: "🏋️‍♂️",
      gradient: "linear-gradient(135deg, #50C878 0%, #228B22 100%)"
    },
    {
      id: 4,
      title: "Group Fitness Classes",
      description: "High-energy classes including HIIT, Yoga, Zumba and more",
      icon: "🤸‍♀️",
      gradient: "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)"
    },
    {
      id: 5,
      title: "Nutrition Coaching",
      description: "Personalized meal plans and nutrition guidance",
      icon: "🥗",
      gradient: "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)"
    },
    {
      id: 6,
      title: "Recovery Zone",
      description: "Sauna, steam room, and massage therapy for optimal recovery",
      icon: "🧘‍♂️",
      gradient: "linear-gradient(135deg, #3498DB 0%, #2980B9 100%)"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      text: "This gym completely transformed my fitness journey. The trainers are incredible and the facilities are world-class!",
      rating: 5,
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Professional Athlete",
      text: "The best investment I've made in my health. Premium equipment, expert guidance, and amazing community.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Busy Professional",
      text: "24/7 access is a game-changer for my schedule. Clean, safe, and always well-maintained. Highly recommend!",
      rating: 5,
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slider-arrow next-arrow" onClick={onClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slider-arrow prev-arrow" onClick={onClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div className="custom-dot"></div>
    )
  };

  return (
    <div className="home">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-dumbbell floating-element-1">🏋️</div>
        <div className="floating-barbell floating-element-2">🏋️‍♀️</div>
        <div className="floating-weight floating-element-3">⚡</div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className={`hero-text ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Transform Your Body,
              <span className="highlight"> Transform Your Life</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of members in our premium fitness facility. 
              Experience world-class equipment, expert training, and a supportive community 
              that will help you achieve your fitness goals.
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary pulse-animation"
                onClick={() => navigate("/membership")}
              >
                <span>Start Your Journey</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate("/services")}
              >
                Explore Services
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img 
                src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Modern gym interior"
                className="hero-img"
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" ref={featuresRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Gym?</h2>
            <p className="section-subtitle">
              We provide everything you need to reach your fitness goals and maintain a healthy lifestyle
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <div 
                className={`feature-card ${featuresVisible ? 'animate-in' : ''}`}
                key={feature.id}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  background: feature.gradient
                }}
              >
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                className={`stat-card ${animateStats ? 'animate' : ''}`}
                key={stat.id}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">
                  {animateStats ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : (
                    0
                  )}
                  <span className="plus">+</span>
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Members Say</h2>
            <p className="section-subtitle">
              Real stories from real people who transformed their lives with us
            </p>
          </div>
          <div className="testimonials-slider">
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-content">
                      <div className="quote-icon">"</div>
                      <p className="testimonial-text">{testimonial.text}</p>
                      <div className="testimonial-rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star">⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="testimonial-author">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="author-image"
                      />
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-role">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Fitness Journey?</h2>
            <p className="cta-subtitle">
              Join our community today and get access to premium facilities, expert trainers, and unlimited motivation.
            </p>
            <div className="cta-buttons">
              <button 
                className="btn-primary btn-large"
                onClick={() => navigate("/membership")}
              >
                Get Membership Now
              </button>
              <button 
                className="btn-outline"
                onClick={() => navigate("/contact")}
              >
                Schedule a Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;