import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../../styles/Services.css";

function ServicesMain() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation observer
  const { ref: servicesRef, inView: servicesVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "Diet Plan Templates",
      description: "Personalized nutrition plans designed by certified dietitians to fuel your fitness journey.",
      icon: "🥗",
      gradient: "linear-gradient(135deg, #50C878 0%, #228B22 100%)",
      route: "/services/diet-plans",
      features: ["Custom meal plans", "Nutritional guidance", "Recipe suggestions", "Progress tracking"]
    },
    {
      id: 2,
      title: "Workout Plans",
      description: "Structured workout routines for all fitness levels, from beginner to advanced athletes.",
      icon: "💪",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
      route: "/services/workout-plans",
      features: ["Customized routines", "Video demonstrations", "Progress tracking", "Expert guidance"]
    },
    {
      id: 3,
      title: "Calorie Calculator",
      description: "Advanced tools to calculate your daily caloric needs and track your nutritional intake.",
      icon: "📊",
      gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
      route: "/services/calorie-calculator",
      features: ["BMR calculation", "Activity tracking", "Goal setting", "Detailed analytics"]
    }
  ];

  const stats = [
    { label: "Diet Plans Created", value: 2500, icon: "🥗" },
    { label: "Workout Routines", value: 150, icon: "💪" },
    { label: "Calories Tracked", value: 1000000, icon: "📊" },
    { label: "Success Stories", value: 800, icon: "🏆" }
  ];

  return (
    <div className="services-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-apple floating-element-1">🍎</div>
        <div className="floating-dumbbell floating-element-2">🏋️</div>
        <div className="floating-chart floating-element-3">📈</div>
      </div>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Premium
              <span className="highlight"> Fitness Services</span>
            </h1>
            <p className="hero-subtitle">
              Comprehensive fitness solutions designed to help you achieve your goals. 
              From personalized diet plans to advanced workout routines and calorie tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Professional tools and guidance to transform your fitness journey
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`service-card ${servicesVisible ? 'animate-in' : ''}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  background: service.gradient
                }}
                onClick={() => navigate(service.route)}
              >
                <div className="card-content">
                  <div className="card-icon">
                    <span>{service.icon}</span>
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                  
                  <ul className="card-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="card-action">
                    <span className="action-text">Explore Service</span>
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
      <section className="services-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="stat-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.value.toLocaleString()}+</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Services?</h2>
            <p className="section-subtitle">
              Professional guidance and advanced tools for your fitness success
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h4>Personalized Approach</h4>
              <p>Every plan is tailored to your specific goals, preferences, and fitness level.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👨‍⚕️</div>
              <h4>Expert Guidance</h4>
              <p>Created by certified nutritionists and fitness professionals with years of experience.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h4>Easy to Follow</h4>
              <p>User-friendly interfaces and step-by-step guidance make it simple to stay on track.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📈</div>
              <h4>Track Progress</h4>
              <p>Monitor your journey with detailed analytics and progress tracking tools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesMain;