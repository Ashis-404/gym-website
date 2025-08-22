import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useMembership } from "../../Context/MembershipContext";
import "../../styles/ViewMembership.css";

function ViewMembership() {
  const { membership } = useMembership();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation observer
  const { ref: contentRef, inView: contentVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock data for demonstration
  const membershipDetails = membership ? {
    ...membership,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    status: "Active",
    daysRemaining: 45,
    totalWorkouts: 28,
    lastVisit: "2024-02-10"
  } : null;

  const membershipStats = [
    { label: "Total Workouts", value: membershipDetails?.totalWorkouts || 0, icon: "💪" },
    { label: "Days Remaining", value: membershipDetails?.daysRemaining || 0, icon: "📅" },
    { label: "Plan Duration", value: membership ? "3 Months" : "N/A", icon: "⏱️" },
    { label: "Member Since", value: "Jan 2024", icon: "🎯" }
  ];

  return (
    <div className="view-membership-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-chart floating-element-1">📊</div>
        <div className="floating-trophy floating-element-2">🏆</div>
        <div className="floating-calendar floating-element-3">📅</div>
      </div>

      {/* Hero Section */}
      <section className="view-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              My
              <span className="highlight"> Membership</span>
            </h1>
            <p className="hero-subtitle">
              Track your fitness journey, view membership details, and monitor your progress 
              all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Content */}
      <section className="membership-content" ref={contentRef}>
        <div className="container">
          {membershipDetails ? (
            <div className={`membership-dashboard ${contentVisible ? 'animate-in' : ''}`}>
              {/* Membership Card */}
              <div className="membership-card-container">
                <div className="membership-card">
                  <div className="card-header">
                    <div className="member-info">
                      <div className="member-avatar">
                        <span>👤</span>
                      </div>
                      <div className="member-details">
                        <h2>John Doe</h2>
                        <p>Member ID: #TF2024001</p>
                      </div>
                    </div>
                    <div className={`status-badge ${membershipDetails.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {membershipDetails.status}
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="plan-info">
                      <div className="plan-icon">💪</div>
                      <div className="plan-details">
                        <h3>{membershipDetails.name}</h3>
                        <p className="plan-price">₹{membershipDetails.price}</p>
                      </div>
                    </div>

                    <div className="membership-dates">
                      <div className="date-item">
                        <span className="date-label">Start Date</span>
                        <span className="date-value">{membershipDetails.startDate}</span>
                      </div>
                      <div className="date-item">
                        <span className="date-label">End Date</span>
                        <span className="date-value">{membershipDetails.endDate}</span>
                      </div>
                    </div>

                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Membership Progress</span>
                        <span>{Math.round((1 - membershipDetails.daysRemaining / 90) * 100)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${Math.round((1 - membershipDetails.daysRemaining / 90) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="action-button renew"
                      onClick={() => navigate("/membership/renew")}
                    >
                      <span>Renew Membership</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className="action-button upgrade"
                      onClick={() => navigate("/membership/plans")}
                    >
                      <span>Upgrade Plan</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                {membershipStats.map((stat, index) => (
                  <div 
                    key={index}
                    className="stat-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="stat-icon">
                      <span>{stat.icon}</span>
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity Timeline */}
              <div className="activity-section">
                <h3 className="section-title">Recent Activity</h3>
                <div className="activity-timeline">
                  <div className="activity-item">
                    <div className="activity-icon">🏋️</div>
                    <div className="activity-content">
                      <h4>Workout Completed</h4>
                      <p>Upper body strength training session</p>
                      <span className="activity-time">2 days ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">📅</div>
                    <div className="activity-content">
                      <h4>Personal Training Session</h4>
                      <p>1-on-1 session with certified trainer</p>
                      <span className="activity-time">5 days ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">🎯</div>
                    <div className="activity-content">
                      <h4>Goal Achievement</h4>
                      <p>Completed 20 workouts milestone</p>
                      <span className="activity-time">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`no-membership ${contentVisible ? 'animate-in' : ''}`}>
              <div className="no-membership-content">
                <div className="no-membership-icon">
                  <span>💪</span>
                </div>
                <h2>No Active Membership</h2>
                <p>You don't have an active membership yet. Start your fitness journey today!</p>
                <div className="no-membership-actions">
                  <button 
                    className="primary-button"
                    onClick={() => navigate("/membership/plans")}
                  >
                    <span>View Plans</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="secondary-button"
                    onClick={() => navigate("/")}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ViewMembership;