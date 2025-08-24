import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../../styles/DietPlans.css";

function DietPlans() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState('weight-loss');

  // Animation observer
  const { ref: plansRef, inView: plansVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const dietPlans = {
    'weight-loss': [
      {
        id: 1,
        name: "Beginner Weight Loss",
        calories: "1200-1400",
        duration: "4 weeks",
        difficulty: "Easy",
        description: "Perfect for beginners starting their weight loss journey",
        meals: ["Oatmeal with berries", "Grilled chicken salad", "Vegetable soup", "Greek yogurt"],
        macros: { protein: "30%", carbs: "40%", fats: "30%" }
      },
      {
        id: 2,
        name: "Advanced Fat Burn",
        calories: "1000-1200",
        duration: "6 weeks",
        difficulty: "Hard",
        description: "Intensive plan for rapid fat loss with proper nutrition",
        meals: ["Protein smoothie", "Quinoa bowl", "Lean fish with vegetables", "Nuts and seeds"],
        macros: { protein: "40%", carbs: "30%", fats: "30%" }
      }
    ],
    'muscle-gain': [
      {
        id: 3,
        name: "Muscle Building Basics",
        calories: "2200-2500",
        duration: "8 weeks",
        difficulty: "Medium",
        description: "Build lean muscle with balanced nutrition",
        meals: ["Protein pancakes", "Chicken and rice", "Post-workout shake", "Salmon with quinoa"],
        macros: { protein: "35%", carbs: "45%", fats: "20%" }
      },
      {
        id: 4,
        name: "Bulk Up Pro",
        calories: "2800-3200",
        duration: "12 weeks",
        difficulty: "Hard",
        description: "Maximum muscle gain for serious bodybuilders",
        meals: ["Mass gainer shake", "Steak and potatoes", "Protein bars", "Whole grain pasta"],
        macros: { protein: "30%", carbs: "50%", fats: "20%" }
      }
    ],
    'maintenance': [
      {
        id: 5,
        name: "Balanced Lifestyle",
        calories: "1800-2000",
        duration: "Ongoing",
        difficulty: "Easy",
        description: "Maintain your current weight with balanced nutrition",
        meals: ["Balanced breakfast", "Mixed salad lunch", "Healthy dinner", "Smart snacks"],
        macros: { protein: "25%", carbs: "45%", fats: "30%" }
      },
      {
        id: 6,
        name: "Athletic Maintenance",
        calories: "2200-2400",
        duration: "Ongoing",
        difficulty: "Medium",
        description: "For active individuals maintaining peak performance",
        meals: ["Energy breakfast", "Power lunch", "Recovery dinner", "Performance snacks"],
        macros: { protein: "30%", carbs: "45%", fats: "25%" }
      }
    ]
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleDownloadPlan = (plan) => {
    // Simulate PDF download
    alert(`Downloading ${plan.name} diet plan...`);
  };

  return (
    <div className="diet-plans-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-carrot floating-element-1">🥕</div>
        <div className="floating-apple floating-element-2">🍎</div>
        <div className="floating-avocado floating-element-3">🥑</div>
      </div>

      {/* Hero Section */}
      <section className="diet-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Personalized
              <span className="highlight"> Diet Plans</span>
            </h1>
            <p className="hero-subtitle">
              Science-based nutrition plans designed by certified dietitians to help you 
              achieve your fitness goals with delicious, healthy meals.
            </p>
          </div>
        </div>
      </section>

      {/* Goal Selection */}
      <section className="goal-selection">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Goal</h2>
            <p className="section-subtitle">Select your primary fitness objective</p>
          </div>

          <div className="goal-buttons">
            <button 
              className={`goal-btn ${selectedGoal === 'weight-loss' ? 'active' : ''}`}
              onClick={() => setSelectedGoal('weight-loss')}
            >
              <span className="goal-icon">🔥</span>
              Weight Loss
            </button>
            <button 
              className={`goal-btn ${selectedGoal === 'muscle-gain' ? 'active' : ''}`}
              onClick={() => setSelectedGoal('muscle-gain')}
            >
              <span className="goal-icon">💪</span>
              Muscle Gain
            </button>
            <button 
              className={`goal-btn ${selectedGoal === 'maintenance' ? 'active' : ''}`}
              onClick={() => setSelectedGoal('maintenance')}
            >
              <span className="goal-icon">⚖️</span>
              Maintenance
            </button>
          </div>
        </div>
      </section>

      {/* Diet Plans */}
      <section className="plans-section" ref={plansRef}>
        <div className="container">
          <div className="plans-grid">
            {dietPlans[selectedGoal].map((plan, index) => (
              <div 
                key={plan.id}
                className={`plan-card ${plansVisible ? 'animate-in' : ''} ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handlePlanSelect(plan)}
              >
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className={`difficulty-badge ${plan.difficulty.toLowerCase()}`}>
                    {plan.difficulty}
                  </div>
                </div>

                <div className="plan-details">
                  <div className="detail-item">
                    <span className="detail-icon">🔥</span>
                    <span>{plan.calories} cal/day</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{plan.duration}</span>
                  </div>
                </div>

                <p className="plan-description">{plan.description}</p>

                <div className="macros-section">
                  <h4>Macronutrient Breakdown</h4>
                  <div className="macros-grid">
                    <div className="macro-item">
                      <span className="macro-label">Protein</span>
                      <span className="macro-value">{plan.macros.protein}</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-label">Carbs</span>
                      <span className="macro-value">{plan.macros.carbs}</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-label">Fats</span>
                      <span className="macro-value">{plan.macros.fats}</span>
                    </div>
                  </div>
                </div>

                <div className="meals-preview">
                  <h4>Sample Meals</h4>
                  <ul className="meals-list">
                    {plan.meals.map((meal, idx) => (
                      <li key={idx} className="meal-item">
                        <span className="meal-check">✓</span>
                        {meal}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="download-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadPlan(plan);
                  }}
                >
                  <span>Download Plan</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nutrition Tips</h2>
            <p className="section-subtitle">Expert advice for better results</p>
          </div>

          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">💧</div>
              <h4>Stay Hydrated</h4>
              <p>Drink at least 8-10 glasses of water daily to support metabolism and recovery.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⏰</div>
              <h4>Meal Timing</h4>
              <p>Eat every 3-4 hours to maintain steady energy levels and prevent overeating.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🥬</div>
              <h4>Eat Your Greens</h4>
              <p>Include vegetables in every meal for essential vitamins, minerals, and fiber.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📏</div>
              <h4>Portion Control</h4>
              <p>Use smaller plates and measure portions to avoid overeating and track intake.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DietPlans;