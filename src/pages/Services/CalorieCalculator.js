import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../../styles/CalorieCalculator.css";

function CalorieCalculator() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'sedentary',
    goal: 'maintain'
  });
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('calculator');

  // Animation observer
  const { ref: calculatorRef, inView: calculatorVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const activityLevels = {
    sedentary: { multiplier: 1.2, label: "Sedentary (little/no exercise)" },
    light: { multiplier: 1.375, label: "Light activity (light exercise 1-3 days/week)" },
    moderate: { multiplier: 1.55, label: "Moderate activity (moderate exercise 3-5 days/week)" },
    active: { multiplier: 1.725, label: "Very active (hard exercise 6-7 days/week)" },
    extra: { multiplier: 1.9, label: "Extra active (very hard exercise, physical job)" }
  };

  const goals = {
    lose: { adjustment: -500, label: "Lose weight (1 lb/week)" },
    maintain: { adjustment: 0, label: "Maintain current weight" },
    gain: { adjustment: 500, label: "Gain weight (1 lb/week)" }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCalories = () => {
    const { age, gender, height, weight, activityLevel, goal } = formData;
    
    if (!age || !height || !weight) {
      alert('Please fill in all required fields');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) + 5;
    } else {
      bmr = (10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevels[activityLevel].multiplier;
    
    // Adjust for goal
    const targetCalories = tdee + goals[goal].adjustment;

    // Calculate macronutrient breakdown
    const protein = Math.round((targetCalories * 0.25) / 4); // 25% protein, 4 cal/g
    const carbs = Math.round((targetCalories * 0.45) / 4); // 45% carbs, 4 cal/g
    const fats = Math.round((targetCalories * 0.30) / 9); // 30% fats, 9 cal/g

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      macros: { protein, carbs, fats },
      weightChange: goal === 'lose' ? -1 : goal === 'gain' ? 1 : 0
    });
  };

  const resetCalculator = () => {
    setFormData({
      age: '',
      gender: 'male',
      height: '',
      weight: '',
      activityLevel: 'sedentary',
      goal: 'maintain'
    });
    setResults(null);
  };

  return (
    <div className="calorie-calculator-page">
      {/* Floating Elements */}
      <div className="calculator-floating-elements">
        <div className="floating-calculator floating-element-1">🧮</div>
        <div className="floating-scale floating-element-2">⚖️</div>
        <div className="floating-chart floating-element-3">📊</div>
      </div>

      {/* Hero Section */}
      <section className="calculator-hero">
        <div className="calculator-hero-overlay"></div>
        <div className="calculator-container">
          <div className={`calculator-hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="calculator-hero-title">
              Advanced
              <span className="calculator-highlight"> Calorie Calculator</span>
            </h1>
            <p className="calculator-hero-subtitle">
              Calculate your daily caloric needs with precision. Get personalized recommendations 
              based on your goals, activity level, and body composition.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="calculator-tab-navigation">
        <div className="calculator-container">
          <div className="calculator-tab-buttons">
            <button 
              className={`calculator-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              <span className="calculator-tab-icon">🧮</span>
              Calculator
            </button>
            <button 
              className={`calculator-tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracker')}
            >
              <span className="calculator-tab-icon">📊</span>
              Food Tracker
            </button>
            <button 
              className={`calculator-tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
              onClick={() => setActiveTab('tips')}
            >
              <span className="calculator-tab-icon">💡</span>
              Tips & Guide
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <section className="calculator-section" ref={calculatorRef}>
          <div className="calculator-container">
            <div className="calculator-grid">
              {/* Input Form */}
              <div className={`calculator-form ${calculatorVisible ? 'animate-in' : ''}`}>
                <h3 className="calculator-form-title">Personal Information</h3>
                
                <div className="calculator-form-group">
                  <label htmlFor="age">Age (years)</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    min="10"
                    max="100"
                  />
                </div>

                <div className="calculator-form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="calculator-form-group">
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Enter your height"
                    min="100"
                    max="250"
                  />
                </div>

                <div className="calculator-form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter your weight"
                    min="30"
                    max="300"
                  />
                </div>

                <div className="calculator-form-group">
                  <label htmlFor="activityLevel">Activity Level</label>
                  <select
                    id="activityLevel"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                  >
                    {Object.entries(activityLevels).map(([key, value]) => (
                      <option key={key} value={key}>{value.label}</option>
                    ))}
                  </select>
                </div>

                <div className="calculator-form-group">
                  <label htmlFor="goal">Goal</label>
                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                  >
                    {Object.entries(goals).map(([key, value]) => (
                      <option key={key} value={key}>{value.label}</option>
                    ))}
                  </select>
                </div>

                <div className="calculator-form-actions">
                  <button className="calculate-btn" onClick={calculateCalories}>
                    <span>Calculate Calories</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="calculator-reset-btn" onClick={resetCalculator}>
                    Reset
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className={`calculator-results-section ${calculatorVisible ? 'animate-in' : ''}`}>
                {results ? (
                  <div className="calculator-results-content">
                    <h3 className="calculator-results-title">Your Results</h3>
                    
                    <div className="calculator-result-cards">
                      <div className="calculator-result-card bmr">
                        <div className="calculator-result-icon">🔥</div>
                        <div className="calculator-result-info">
                          <span className="calculator-result-label">BMR</span>
                          <span className="calculator-result-value">{results.bmr} cal</span>
                        </div>
                      </div>

                      <div className="calculator-result-card tdee">
                        <div className="calculator-result-icon">⚡</div>
                        <div className="calculator-result-info">
                          <span className="calculator-result-label">TDEE</span>
                          <span className="calculator-result-value">{results.tdee} cal</span>
                        </div>
                      </div>

                      <div className="calculator-result-card target">
                        <div className="calculator-result-icon">🎯</div>
                        <div className="calculator-result-info">
                          <span className="calculator-result-label">Target Calories</span>
                          <span className="calculator-result-value">{results.targetCalories} cal</span>
                        </div>
                      </div>
                    </div>

                    <div className="macros-breakdown">
                      <h4>Daily Macronutrient Targets</h4>
                      <div className="macros-grid">
                        <div className="macro-card protein">
                          <div className="macro-icon">🥩</div>
                          <span className="macro-label">Protein</span>
                          <span className="macro-value">{results.macros.protein}g</span>
                        </div>
                        <div className="macro-card carbs">
                          <div className="macro-icon">🍞</div>
                          <span className="macro-label">Carbs</span>
                          <span className="macro-value">{results.macros.carbs}g</span>
                        </div>
                        <div className="macro-card fats">
                          <div className="macro-icon">🥑</div>
                          <span className="macro-label">Fats</span>
                          <span className="macro-value">{results.macros.fats}g</span>
                        </div>
                      </div>
                    </div>

                    {results.weightChange !== 0 && (
                      <div className="weight-prediction">
                        <h4>Expected Weight Change</h4>
                        <p>
                          Following this plan, you can expect to {results.weightChange > 0 ? 'gain' : 'lose'} approximately{' '}
                          <strong>{Math.abs(results.weightChange)} lb per week</strong>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">📊</div>
                    <h4>Calculate Your Calories</h4>
                    <p>Fill in your information to get personalized calorie and macro recommendations.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Food Tracker Tab */}
      {activeTab === 'tracker' && (
        <section className="tracker-section">
          <div className="calculator-container">
            <div className="tracker-content">
              <h3 className="calculator-section-title">Food Tracker</h3>
              <p className="calculator-section-subtitle">Track your daily food intake and monitor your progress</p>
              
              <div className="calculator-tracker-placeholder">
                <div className="calculator-placeholder-icon">🍽️</div>
                <h4>Food Tracking Feature</h4>
                <p>This feature is coming soon! You'll be able to log your meals, track calories, and monitor your macronutrient intake.</p>
                <button className="calculator-coming-soon-btn" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tips Tab */}
      {activeTab === 'tips' && (
        <section className="tips-section">
          <div className="calculator-container">
            <div className="calculator-section-header">
              <h3 className="calculator-section-title">Calorie & Nutrition Tips</h3>
              <p className="calculator-section-subtitle">Expert advice for better results</p>
            </div>

            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🎯</div>
                <h4>Set Realistic Goals</h4>
                <p>Aim for 1-2 pounds of weight loss per week for sustainable results. Rapid weight loss is often unsustainable.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">📏</div>
                <h4>Quality Over Quantity</h4>
                <p>Focus on nutrient-dense foods rather than just hitting calorie targets. Choose whole foods over processed options.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">💧</div>
                <h4>Stay Hydrated</h4>
                <p>Drink water before meals to help with satiety. Sometimes thirst is mistaken for hunger.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">⏰</div>
                <h4>Meal Timing</h4>
                <p>Eat regular meals to maintain stable blood sugar levels and prevent overeating later in the day.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">📱</div>
                <h4>Track Everything</h4>
                <p>Log all food and drinks, including small snacks and condiments. Small calories add up throughout the day.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">😴</div>
                <h4>Get Enough Sleep</h4>
                <p>Poor sleep affects hormones that regulate hunger and satiety, making weight management more difficult.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default CalorieCalculator;