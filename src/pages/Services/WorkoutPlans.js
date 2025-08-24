import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "../../styles/WorkoutPlans.css";

function WorkoutPlans() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('strength');
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Animation observer
  const { ref: plansRef, inView: plansVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const workoutPlans = {
    strength: [
      {
        id: 1,
        name: "Beginner Strength",
        duration: "4 weeks",
        level: "Beginner",
        frequency: "3x/week",
        description: "Build foundational strength with basic compound movements",
        exercises: [
          { name: "Squats", sets: "3x8-10", rest: "60s" },
          { name: "Push-ups", sets: "3x5-8", rest: "60s" },
          { name: "Deadlifts", sets: "3x5", rest: "90s" },
          { name: "Plank", sets: "3x30s", rest: "45s" }
        ],
        equipment: ["Barbell", "Dumbbells", "Mat"]
      },
      {
        id: 2,
        name: "Advanced Powerlifting",
        duration: "8 weeks",
        level: "Advanced",
        frequency: "4x/week",
        description: "Intensive powerlifting program for serious strength gains",
        exercises: [
          { name: "Heavy Squats", sets: "5x3", rest: "3min" },
          { name: "Bench Press", sets: "5x3", rest: "3min" },
          { name: "Deadlifts", sets: "5x1", rest: "4min" },
          { name: "Overhead Press", sets: "4x5", rest: "2min" }
        ],
        equipment: ["Barbell", "Power Rack", "Bench"]
      }
    ],
    cardio: [
      {
        id: 3,
        name: "HIIT Fat Burner",
        duration: "6 weeks",
        level: "Intermediate",
        frequency: "4x/week",
        description: "High-intensity intervals for maximum fat burning",
        exercises: [
          { name: "Burpees", sets: "4x30s", rest: "30s" },
          { name: "Mountain Climbers", sets: "4x30s", rest: "30s" },
          { name: "Jump Squats", sets: "4x30s", rest: "30s" },
          { name: "High Knees", sets: "4x30s", rest: "30s" }
        ],
        equipment: ["None", "Bodyweight only"]
      },
      {
        id: 4,
        name: "Endurance Builder",
        duration: "12 weeks",
        level: "Beginner",
        frequency: "5x/week",
        description: "Build cardiovascular endurance progressively",
        exercises: [
          { name: "Walking", sets: "1x20min", rest: "N/A" },
          { name: "Light Jogging", sets: "1x15min", rest: "N/A" },
          { name: "Cycling", sets: "1x25min", rest: "N/A" },
          { name: "Swimming", sets: "1x30min", rest: "N/A" }
        ],
        equipment: ["Treadmill", "Bike", "Pool access"]
      }
    ],
    flexibility: [
      {
        id: 5,
        name: "Daily Mobility",
        duration: "Ongoing",
        level: "All Levels",
        frequency: "Daily",
        description: "Improve flexibility and prevent injuries",
        exercises: [
          { name: "Cat-Cow Stretch", sets: "2x10", rest: "30s" },
          { name: "Hip Flexor Stretch", sets: "2x30s each", rest: "15s" },
          { name: "Shoulder Rolls", sets: "2x10", rest: "30s" },
          { name: "Hamstring Stretch", sets: "2x30s each", rest: "15s" }
        ],
        equipment: ["Yoga Mat", "Resistance Band"]
      },
      {
        id: 6,
        name: "Advanced Yoga Flow",
        duration: "8 weeks",
        level: "Advanced",
        frequency: "3x/week",
        description: "Dynamic yoga sequences for strength and flexibility",
        exercises: [
          { name: "Sun Salutation", sets: "5 rounds", rest: "1min" },
          { name: "Warrior Sequence", sets: "3x each side", rest: "30s" },
          { name: "Balance Poses", sets: "Hold 1min", rest: "30s" },
          { name: "Deep Stretches", sets: "Hold 2min", rest: "1min" }
        ],
        equipment: ["Yoga Mat", "Blocks", "Strap"]
      }
    ]
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleStartWorkout = (plan) => {
    alert(`Starting ${plan.name} workout plan! Check your email for detailed instructions.`);
  };

  return (
    <div className="workout-plans-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-dumbbell floating-element-1">🏋️</div>
        <div className="floating-runner floating-element-2">🏃</div>
        <div className="floating-yoga floating-element-3">🧘</div>
      </div>

      {/* Hero Section */}
      <section className="workout-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Professional
              <span className="highlight"> Workout Plans</span>
            </h1>
            <p className="hero-subtitle">
              Scientifically designed workout routines for all fitness levels. 
              From strength training to cardio and flexibility - achieve your goals with expert guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="category-selection">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your Focus</h2>
            <p className="section-subtitle">Select your primary training objective</p>
          </div>

          <div className="category-buttons">
            <button 
              className={`category-btn ${selectedCategory === 'strength' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('strength')}
            >
              <span className="category-icon">💪</span>
              Strength Training
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'cardio' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('cardio')}
            >
              <span className="category-icon">🏃</span>
              Cardio & HIIT
            </button>
            <button 
              className={`category-btn ${selectedCategory === 'flexibility' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('flexibility')}
            >
              <span className="category-icon">🧘</span>
              Flexibility & Yoga
            </button>
          </div>
        </div>
      </section>

      {/* Workout Plans */}
      <section className="plans-section" ref={plansRef}>
        <div className="container">
          <div className="plans-grid">
            {workoutPlans[selectedCategory].map((plan, index) => (
              <div 
                key={plan.id}
                className={`plan-card ${plansVisible ? 'animate-in' : ''} ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => handlePlanSelect(plan)}
              >
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className={`level-badge ${plan.level.toLowerCase().replace(' ', '-')}`}>
                    {plan.level}
                  </div>
                </div>

                <div className="plan-details">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{plan.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🔄</span>
                    <span>{plan.frequency}</span>
                  </div>
                </div>

                <p className="plan-description">{plan.description}</p>

                <div className="exercises-section">
                  <h4>Sample Exercises</h4>
                  <div className="exercises-list">
                    {plan.exercises.map((exercise, idx) => (
                      <div key={idx} className="exercise-item">
                        <div className="exercise-info">
                          <span className="exercise-name">{exercise.name}</span>
                          <span className="exercise-sets">{exercise.sets}</span>
                        </div>
                        <span className="exercise-rest">Rest: {exercise.rest}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="equipment-section">
                  <h4>Equipment Needed</h4>
                  <div className="equipment-tags">
                    {plan.equipment.map((item, idx) => (
                      <span key={idx} className="equipment-tag">{item}</span>
                    ))}
                  </div>
                </div>

                <button 
                  className="start-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartWorkout(plan);
                  }}
                >
                  <span>Start Workout</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polygon points="5,3 19,12 5,21" fill="currentColor"/>
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
            <h2 className="section-title">Workout Tips</h2>
            <p className="section-subtitle">Maximize your training results</p>
          </div>

          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🔥</div>
              <h4>Warm Up First</h4>
              <p>Always start with 5-10 minutes of light cardio and dynamic stretching.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📈</div>
              <h4>Progressive Overload</h4>
              <p>Gradually increase weight, reps, or intensity to continue making progress.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">😴</div>
              <h4>Rest & Recovery</h4>
              <p>Allow 48-72 hours between training the same muscle groups.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📝</div>
              <h4>Track Progress</h4>
              <p>Keep a workout log to monitor improvements and stay motivated.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WorkoutPlans;