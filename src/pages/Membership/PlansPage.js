import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../../styles/Plans.css";

function PlansPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Animation observer
  const { ref: plansRef, inView: plansVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const plans = [
    { 
      id: 1, 
      name: "Basic Plan", 
      price: 1200,
      duration: "1 Month",
      popular: false,
      features: [
        "Access to gym equipment",
        "Basic workout guidance",
        "Free Wi-Fi",
        "Water dispenser access",
        "Guest Passes (1 person) Every Sunday",
        "One Time Additional Admission Charges Required",
      ],
      gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
      icon: "🏋️‍♂️"
    },
    { 
      id: 2, 
      name: "Standard Plan", 
      price: 3600,
      duration: "3 Months",
      popular: true,
      features: [
        "Access to gym equipment",
        "Basic workout guidance",
        "Free Wi-Fi",
        "Water dispenser access",
        "Guest Passes (1 person) Every Sunday",
        "No Admission Charges Required",
        
      ],
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
      icon: "💪"
    },
    { 
      id: 3, 
      name: "Premium Plan", 
      price: 7000,
      duration: "6 Months",
      popular: false,
      features: [
        "Access to gym equipment",
        "Basic workout guidance",
        "Free Wi-Fi",
        "Water dispenser access",
        "Guest Passes (1 person) Every Sunday",
        "No Admission Charges Required",
      ],
      gradient: "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)",
      icon: "👑"
    },
    { 
      id: 4, 
      name: "Platinum Plan", 
      price: 13000,
      duration: "12 Months",
      popular: false,
      features: [
        "Access to gym equipment",
        "Basic workout guidance",
        "Free Wi-Fi",
        "Water dispenser access",
        "Guest Passes (1 person) Every Sunday",
        "No Admission Charges Required",
      ],
      gradient: "linear-gradient(135deg, #92c3f4ff 0%, #5c97beff 100%)",
      icon: "💎"
    },
  ];

  return (
    <div className="plans-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-barbell floating-element-1">🏋️</div>
        <div className="floating-medal floating-element-2">🏅</div>
        <div className="floating-fire floating-element-3">🔥</div>
      </div>

      {/* Hero Section */}
      <section className="plans-hero">
        <div className="plan-hero-overlay"></div>
        <div className="plan-container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="plan-hero-title">
              Choose Your
              <span className="plan-highlight"> Perfect Plan</span>
            </h1>
            <p className="plan-hero-subtitle">
              Select a membership plan that matches your fitness goals and budget. 
              All plans include access to our world-class facilities and expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="plans-section" ref={plansRef}>
        <div className="plan-container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <div 
                key={plan.id}
                className={`plan-card ${plan.popular ? 'popular' : ''} ${plansVisible ? 'animate-in' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
                onMouseEnter={() => setSelectedPlan(plan.id)}
                onMouseLeave={() => setSelectedPlan(null)}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="plan-header" style={{ background: plan.gradient }}>
                  <div className="plan-icon">
                    <span>{plan.icon}</span>
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                  </div>
                  <div className="plan-duration">{plan.duration}</div>
                </div>

                <div className="plan-body">
                  <ul className="plan-features">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to={`/membership/payment/${plan.id}`} 
                    className="plan-button"
                    style={{ background: plan.gradient }}
                  >
                    <span>Choose Plan</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                <div className="plan-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section">
        <div className="plan-container">
          <div className="plan-section-header">
            <h2 className="plan-section-title">Why Choose Our Plans?</h2>
            <p className="plan-section-subtitle">
              Compare features and find the perfect fit for your fitness journey
            </p>
          </div>

          <div className="comparison-grid">
            <div className="comparison-item">
              <div className="comparison-icon">🎯</div>
              <h4>Flexible Options</h4>
              <p>Choose from monthly, quarterly, or yearly plans that fit your schedule and budget.</p>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">💎</div>
              <h4>Premium Quality</h4>
              <p>Access to state-of-the-art equipment and world-class facilities.</p>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">🤝</div>
              <h4>Expert Support</h4>
              <p>Get guidance from certified trainers and nutrition experts.</p>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon">📈</div>
              <h4>Track Progress</h4>
              <p>Monitor your fitness journey with advanced tracking tools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlansPage;