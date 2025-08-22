import React from "react";
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

export default Profile;
