/*import React from "react";
import "../styles/Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/120"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Membership:</strong> Active</p>
          <p><strong>Validity:</strong> 12 Aug 2025</p>
          <p><strong>Plan:</strong> Gold (1 Year)</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "../styles/Profile.css";

function Profile({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'john.doe@example.com',
    phone: '+91 9876543210',
    age: '28',
    height: '175',
    weight: '70',
    fitnessGoal: 'muscle-gain',
    joinDate: '2024-01-15',
    profileImage: null
  });

  // Animation observer
  const { ref: profileRef, inView: profileVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }
    setIsLoaded(true);
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setProfileData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    localStorage.setItem('userName', profileData.name);
    localStorage.setItem('userEmail', profileData.email);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  const workoutStats = [
    { label: "Total Workouts", value: 45, icon: "💪" },
    { label: "Days Active", value: 28, icon: "📅" },
    { label: "Calories Burned", value: 12500, icon: "🔥" },
    { label: "Personal Records", value: 8, icon: "🏆" }
  ];

  const recentActivities = [
    { id: 1, activity: "Upper Body Workout", date: "2024-01-20", duration: "45 min", icon: "🏋️" },
    { id: 2, activity: "Cardio Session", date: "2024-01-19", duration: "30 min", icon: "🏃" },
    { id: 3, activity: "Yoga Class", date: "2024-01-18", duration: "60 min", icon: "🧘" },
    { id: 4, activity: "Strength Training", date: "2024-01-17", duration: "50 min", icon: "💪" }
  ];

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="profile-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-user floating-element-1">👤</div>
        <div className="floating-chart floating-element-2">📊</div>
        <div className="floating-trophy floating-element-3">🏆</div>
      </div>

      {/* Hero Section */}
      <section className="profile-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              My
              <span className="highlight"> Profile</span>
            </h1>
            <p className="hero-subtitle">
              Track your fitness journey, manage your account, and monitor your progress
            </p>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="profile-content" ref={profileRef}>
        <div className="container">
          <div className={`profile-dashboard ${profileVisible ? 'animate-in' : ''}`}>
            {/* Profile Card */}
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {profileData.profileImage ? (
                    <img src={URL.createObjectURL(profileData.profileImage)} alt="Profile" />
                  ) : (
                    <div className="avatar-placeholder">
                      <span>{profileData.name.charAt(0)}</span>
                    </div>
                  )}
                  {isEditing && (
                    <div className="avatar-upload">
                      <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        onChange={handleInputChange}
                        accept="image/*"
                      />
                      <label htmlFor="profileImage" className="upload-btn">
                        📷
                      </label>
                    </div>
                  )}
                </div>
                <div className="profile-info">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="edit-input name-input"
                    />
                  ) : (
                    <h2 className="profile-name">{profileData.name}</h2>
                  )}
                  <p className="member-since">Member since {new Date(profileData.joinDate).toLocaleDateString()}</p>
                </div>
                <div className="profile-actions">
                  {isEditing ? (
                    <div className="edit-actions">
                      <button className="save-btn" onClick={handleSave}>
                        <span>Save</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                      <span>Edit Profile</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="profile-details">
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{profileData.email}</span>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{profileData.phone}</span>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="age"
                        value={profileData.age}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{profileData.age} years</span>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Height</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="height"
                        value={profileData.height}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{profileData.height} cm</span>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Weight</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="weight"
                        value={profileData.weight}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{profileData.weight} kg</span>
                    )}
                  </div>
                  <div className="detail-item">
                    <label>Fitness Goal</label>
                    {isEditing ? (
                      <select
                        name="fitnessGoal"
                        value={profileData.fitnessGoal}
                        onChange={handleInputChange}
                        className="edit-input"
                      >
                        <option value="weight-loss">Weight Loss</option>
                        <option value="muscle-gain">Muscle Gain</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="endurance">Endurance</option>
                      </select>
                    ) : (
                      <span>{profileData.fitnessGoal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              {workoutStats.map((stat, index) => (
                <div 
                  key={index}
                  className="stat-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="stat-icon">
                    <span>{stat.icon}</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stat.value.toLocaleString()}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="activity-section">
              <h3 className="section-title">Recent Activity</h3>
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={activity.id}
                    className="activity-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="activity-icon">
                      <span>{activity.icon}</span>
                    </div>
                    <div className="activity-details">
                      <h4 className="activity-name">{activity.activity}</h4>
                      <p className="activity-meta">
                        {activity.date} • {activity.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="account-actions">
              <button className="logout-btn" onClick={handleLogout}>
                <span>Sign Out</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
