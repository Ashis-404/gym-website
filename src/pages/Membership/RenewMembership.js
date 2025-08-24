import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMembership } from "../../Context/MembershipContext";
import "../../styles/Renew.css";

function RenewMembership() {
  const navigate = useNavigate();
  const { membership } = useMembership();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation observer
  const { ref: optionsRef, inView: optionsVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleRenewCurrent = () => {
    if (membership) {
      navigate(`/membership/payment/${membership.id}`);
    } else {
      alert("No active plan to renew.");
    }
  };

  const handleBuyDifferent = () => {
    navigate("/membership/plans");
  };

  const renewOptions = [
    {
      id: 1,
      title: "Renew Current Plan",
      description: membership 
        ? `Continue with your ${membership.name} for seamless fitness journey`
        : "No active plan to renew",
      icon: "🔄",
      gradient: "linear-gradient(135deg, #50C878 0%, #228B22 100%)",
      action: handleRenewCurrent,
      disabled: !membership,
      features: membership ? [
        "Same great benefits",
        "No interruption in service",
        "Loyalty discount applied",
        "Instant activation"
      ] : ["No active membership found"]
    },
    {
      id: 2,
      title: "Buy a Different Plan",
      description: "Explore our range of plans and upgrade your fitness experience",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
      action: handleBuyDifferent,
      disabled: false,
      features: [
        "Compare all plans",
        "Upgrade or downgrade",
        "New member benefits",
        "Flexible options"
      ]
    }
  ];

  return (
    <div className="renew-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-refresh floating-element-1">🔄</div>
        <div className="floating-star floating-element-2">⭐</div>
        <div className="floating-rocket floating-element-3">🚀</div>
      </div>

      {/* Hero Section */}
      <section className="renew-hero">
        <div className="renew-hero-overlay"></div>
        <div className="renew-container">
          <div className={`renew-hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="renew-hero-title">
              Renew Your
              <span className="renew-highlight"> Membership</span>
            </h1>
            <p className="renew-hero-subtitle">
              Continue your fitness journey without interruption. Choose to renew your current plan 
              or explore new options that better fit your evolving fitness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Current Membership Status */}
      {membership && (
        <section className="current-membership">
          <div className="renew-container">
            <div className="membership-status">
              <div className="status-header">
                <h2>Your Current Membership</h2>
                <div className="status-badge active">
                  <span className="status-dot"></span>
                  Active
                </div>
              </div>
              
              <div className="membership-card">
                <div className="membership-info">
                  <div className="membership-icon">💪</div>
                  <div className="membership-details">
                    <h3>{membership.name}</h3>
                    <p className="membership-price">₹{membership.price}</p>
                  </div>
                </div>
                <div className="membership-actions">
                  <div className="renewal-reminder">
                    <span className="reminder-icon">⏰</span>
                    <span>Renew to continue enjoying all benefits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Renewal Options */}
      <section className="renewal-options" ref={optionsRef}>
        <div className="renew-container">
          <div className="renew-section-header">
            <h2 className="renew-section-title">Choose Your Renewal Option</h2>
            <p className="renew-section-subtitle">
              Select the best option for your continued fitness journey
            </p>
          </div>

          <div className="options-grid">
            {renewOptions.map((option, index) => (
              <div 
                key={option.id}
                className={`option-card ${optionsVisible ? 'animate-in' : ''} ${option.disabled ? 'disabled' : ''}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  background: option.gradient
                }}
                onClick={option.disabled ? undefined : option.action}
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
                        <span className="feature-check">
                          {option.disabled ? "❌" : "✓"}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="card-action">
                    <span className="action-text">
                      {option.disabled ? "Not Available" : "Select Option"}
                    </span>
                    {!option.disabled && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="card-hover-effect"></div>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="renew-container">
          <div className="renew-section-header">
            <h2 className="renew-section-title">Why Renew With Us?</h2>
            <p className="renew-section-subtitle">
              Continue enjoying premium benefits and exclusive member perks
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h4>Uninterrupted Access</h4>
              <p>Keep your momentum going with seamless gym access and services.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💰</div>
              <h4>Loyalty Rewards</h4>
              <p>Enjoy special discounts and exclusive offers for loyal members.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📈</div>
              <h4>Progress Tracking</h4>
              <p>Continue tracking your fitness journey with detailed analytics.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🤝</div>
              <h4>Priority Support</h4>
              <p>Get priority access to trainers and premium services.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RenewMembership;