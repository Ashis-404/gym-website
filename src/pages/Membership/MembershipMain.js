import { useNavigate } from "react-router-dom";
import "../../styles/Membership.css";

function MembershipMain() {
  const navigate = useNavigate();

  return (
    <div className="membership-container">
      <h1>Membership Options</h1>
      <div className="membership-cards">
        <div className="card" onClick={() => navigate("/membership/plans")}>
          <h2>Buy Membership</h2>
          <p>Choose from a variety of plans to start your fitness journey.</p>
        </div>

        <div className="card" onClick={() => navigate("/membership/renew")}>
          <h2>Renew Membership</h2>
          <p>Renew your existing plan or choose a new one.</p>
        </div>

        <div className="card" onClick={() => navigate("/membership/view")}>
          <h2>View Membership Details</h2>
          <p>Check your active plans, booking date, and validity.</p>
        </div>
      </div>
    </div>
  );
}

export default MembershipMain;
