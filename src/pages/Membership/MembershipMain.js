import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../../styles/Membership.css";

function MembershipMain() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation observer
  const { ref: cardsRef, inView: cardsVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const membershipOptions = [
    {
      id: 1,
      title: "Buy Membership",
      description: "Choose from a variety of plans to start your fitness journey.",
      icon: "💪",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
      route: "/membership/plans",
      features: ["Access to all equipment", "Basic support", "Flexible timing"]
    },
    {
      id: 2,
      title: "Renew Membership",
      description: "Renew your existing plan or choose a new one.",
      icon: "🔄",
      gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
      route: "/membership/renew",
      features: ["Continue your journey", "Upgrade options", "Seamless renewal"]
    },
    {
      id: 3,
      title: "View Membership Details",
      description: "Check your active plans, booking date, and validity.",
      icon: "📊",
      gradient: "linear-gradient(135deg, #50C878 0%, #228B22 100%)",
      route: "/membership/view",
      features: ["Track your progress", "View history", "Manage account"]
    }
  ];

  return (
    <div className="membership-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-weight floating-element-1">🏋️</div>
        <div className="floating-dumbbell floating-element-2">💪</div>
        <div className="floating-trophy floating-element-3">🏆</div>
      </div>

      {/* Hero Section */}
      <section className="membership-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Choose Your
              <span className="highlight"> Fitness Journey</span>
            </h1>
            <p className="hero-subtitle">
              Select the perfect membership option that fits your lifestyle and fitness goals. 
              Join thousands of members who have transformed their lives with us.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Options */}
      <section className="membership-options" ref={cardsRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Membership Options</h2>
            <p className="section-subtitle">
              Everything you need to start, continue, or manage your fitness journey
            </p>
          </div>

          <div className="membership-grid">
            {membershipOptions.map((option, index) => (
              <div 
                key={option.id}
                className={`membership-card ${cardsVisible ? 'animate-in' : ''}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  background: option.gradient
                }}
                onClick={() => navigate(option.route)}
              >
                <div className="card-content">
                  <div className="card-icon">
                    <span>{option.icon}</span>
                  </div>
                  <h3 className="card-title">{option.title}</h3>
                  <p className="card-description">{option.description}</p>
                  
                  <ul className="card-features">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="card-action">
                    <span className="action-text">Get Started</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div className="card-hover-effect"></div>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="membership-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-number">5000+</div>
              <div className="stat-label">Active Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏆</div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Certified Trainers</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">10+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">💪</div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Gym Access</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MembershipMain;