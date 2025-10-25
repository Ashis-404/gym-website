import { useState, useEffect, useMemo } from "react";
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

  // Local state fallback — if context is empty, read from localStorage so purchased plan shows
  const [localMembership, setLocalMembership] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (membership) {
      setLocalMembership(membership);
      try { localStorage.setItem("membership", JSON.stringify(membership)); } catch (e) { }
    } else {
      // try to restore from localStorage
      try {
        const stored = localStorage.getItem("membership");
        if (stored) setLocalMembership(JSON.parse(stored));
      } catch (e) {
        setLocalMembership(null);
      }
    }
  }, [membership]);

  // Helpers
  const addMonths = (date, months) => {
    const d = new Date(date);
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);

    // handle month overflow
    if (d.getDate() < day) {
      d.setDate(0);
    }
    return d;
  };

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return d;
    }
  };

  // Build dynamic membershipDetails from context/local fallback
  const membershipDetails = useMemo(() => {
    const m = localMembership;
    if (!m) return null;

    // try to infer duration months
    let months = 3;
    if (m.durationMonths) months = Number(m.durationMonths);
    else if (m.duration) {
      const num = parseInt(m.duration, 10);
      if (!Number.isNaN(num)) months = num;
      else if (m.duration.toLowerCase().includes("year") || m.duration.toLowerCase().includes("12")) months = 12;
    }

    // startDate and endDate: accept provided values or compute from purchaseDate/startDate
    const startDate = m.startDate ? new Date(m.startDate) : (m.purchasedAt ? new Date(m.purchasedAt) : new Date());
    const endDate = m.endDate ? new Date(m.endDate) : addMonths(startDate, months);

    const now = new Date();
    const totalDays = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
    const passedDays = Math.max(0, Math.ceil((now - startDate) / (1000 * 60 * 60 * 24)));
    const daysRemaining = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));

    const progressPercent = Math.min(100, Math.max(0, Math.round((passedDays / totalDays) * 100)));

    return {
      ...m,
      startDate,
      endDate,
      months,
      status: m.status || (now <= endDate ? "Active" : "Expired"),
      daysRemaining,
      totalDays,
      passedDays,
      progressPercent,
      totalWorkouts: m.totalWorkouts || 0,
    };
  }, [localMembership]);

  // Actions

  const handleDownloadReceipt = () => {
    if (!membershipDetails) return;
    const content = [
      `Membership Receipt`,
      `------------------`,
      `Name: ${membershipDetails.name || "Member"}`,
      `Plan: ${membershipDetails.name || membershipDetails.planName || "Plan"}`,
      `Price: ₹${membershipDetails.price || "0"}`,
      `Purchased At: ${formatDate(membershipDetails.purchasedAt || membershipDetails.startDate)}`,
      `Start Date: ${formatDate(membershipDetails.startDate)}`,
      `End Date: ${formatDate(membershipDetails.endDate)}`,
      `Status: ${membershipDetails.status}`,
      ``,
      `Thank you for joining Till Failure Fitness Club!`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `membership_receipt_${membershipDetails.name || "member"}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExtend = () => {
    // go to plans for upgrading/extending
    navigate("/membership/plans");
  };

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
              {/* <div className="membership-card-container"> */}
              <div className="membership-card">
                <div className="card-header">
                  <div className="member-info">
                    <div className="member-avatar">
                      <span>👤</span>
                    </div>
                    <div className="member-details">
                      <h2>{membershipDetails.memberName || "Ashis Mahato"}</h2>
                      <p>Member ID: {membershipDetails.memberId || "#TF2024001"}</p>
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
                      <h3>{membershipDetails.name || membershipDetails.planName || "Standard Plan"}</h3>
                      <p className="plan-price">₹{membershipDetails.price || "0"}</p>
                      <p className="plan-duration">{membershipDetails.months} month(s)</p>
                    </div>
                  </div>

                  <div className="membership-dates">
                    <div className="date-item">
                      <span className="date-label">Start Date</span>
                      <span className="date-value">{formatDate(membershipDetails.startDate)}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">End Date</span>
                      <span className="date-value">{formatDate(membershipDetails.endDate)}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Days Remaining</span>
                      <span className="date-value">{membershipDetails.daysRemaining}</span>
                    </div>
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Membership Progress</span>
                      <span>{membershipDetails.progressPercent}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${membershipDetails.progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="progress-meta">
                      <small>{membershipDetails.passedDays}/{membershipDetails.totalDays} days passed</small>
                    </div>
                  </div>

                  <div className="membership-stats-compact">
              
                    <div className="stat-compact">
                      <div className="stat-label">Last Visit</div>
                      <div className="stat-value">{membershipDetails.lastVisit || "—"}</div>
                    </div>
                    <div className="stat-compact">
                      <div className="stat-label">Auto Renew</div>
                      <div className="stat-value">{membershipDetails.autoRenew ? "Enabled" : "Disabled"}</div>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    className="action-button renew"
                    onClick={handleExtend}
                  >
                    <span>Extend / Upgrade</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    className="action-button download"
                    onClick={handleDownloadReceipt}
                  >
                    <span>Download Receipt</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                </div>
              </div>


              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">💪</div>
                  <div className="stat-info">
                    <div className="stat-value">{membershipDetails.totalWorkouts}</div>
                    <div className="stat-label">Total Workouts</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-info">
                    <div className="stat-value">{membershipDetails.daysRemaining}</div>
                    <div className="stat-label">Days Remaining</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-info">
                    <div className="stat-value">{membershipDetails.months} mo</div>
                    <div className="stat-label">Plan Duration</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-info">
                    <div className="stat-value">{membershipDetails.passedDays}</div>
                    <div className="stat-label">Days Used</div>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="activity-section">
                <h3 className="section-title">Recent Activity</h3>
                <div className="activity-timeline">
                  {(membershipDetails.recentActivity || []).length ? (
                    membershipDetails.recentActivity.map((act, i) => (
                      <div className="activity-item" key={i}>
                        <div className="activity-icon">{act.icon || "🏋️"}</div>
                        <div className="activity-content">
                          <h4>{act.title}</h4>
                          <p>{act.description}</p>
                          <span className="activity-time">{act.timeAgo || ""}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
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
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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