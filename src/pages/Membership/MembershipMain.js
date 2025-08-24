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
      <div className="membership-floating-elements">
        <div className="membership-floating-weight membership-floating-element-1">🏋️</div>
        <div className="membership-floating-dumbbell membership-floating-element-2">💪</div>
        <div className="membership-floating-trophy membership-floating-element-3">🏆</div>
      </div>

      {/* Hero Section */}
      <section className="membership-hero">
        <div className="membership-hero-overlay"></div>
        <div className="membership-hero-container">
          <div className={`membership-hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="membership-hero-title">
              Choose Your
              <span className="membership-highlight"> Fitness Journey</span>
            </h1>
            <p className="membership-hero-subtitle">
              Select the perfect membership option that fits your lifestyle and fitness goals. 
              Join thousands of members who have transformed their lives with us.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Options */}
      <section className="membership-options" ref={cardsRef}>
        <div className="membership-options-container">
          <div className="membership-section-header">
            <h2 className="membership-section-title">Membership Options</h2>
            <p className="membership-section-subtitle">
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
                <div className="membership-card-content">
                  <div className="membership-card-icon">
                    <span>{option.icon}</span>
                  </div>
                  <h3 className="membership-card-title">{option.title}</h3>
                  <p className="membership-card-description">{option.description}</p>
                  
                  <ul className="membership-card-features">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="membership-feature-item">
                        <span className="membership-feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="membership-card-action">
                    <span className="membership-action-text">Get Started</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div className="membership-card-hover-effect"></div>
                <div className="membership-card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="membership-stats">
        <div className="membership-stats-container">
          <div className="membership-stats-grid">
            <div className="membership-stat-item">
              <div className="membership-stat-icon">👥</div>
              <div className="membership-stat-number">5000+</div>
              <div className="membership-stat-label">Active Members</div>
            </div>
            <div className="membership-stat-item">
              <div className="membership-stat-icon">🏆</div>
              <div className="membership-stat-number">50+</div>
              <div className="membership-stat-label">Certified Trainers</div>
            </div>
            <div className="membership-stat-item">
              <div className="membership-stat-icon">⭐</div>
              <div className="membership-stat-number">10+</div>
              <div className="membership-stat-label">Years Experience</div>
            </div>
            <div className="membership-stat-item">
              <div className="membership-stat-icon">💪</div>
              <div className="membership-stat-number">24/7</div>
              <div className="membership-stat-label">Gym Access</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MembershipMain;
