import { useNavigate } from "react-router-dom";
import { useMembership } from "../../Context/MembershipContext"; // use the hook
import "../../styles/Renew.css";

function RenewMembership() {
  const navigate = useNavigate();
  const { membership } = useMembership(); // get membership from hook

  const handleRenewCurrent = () => {
    if (membership) {
      navigate(`/membership/payment/${membership.id}`); // redirect to payment for current plan
    } else {
      alert("No active plan to renew.");
    }
  };

  const handleBuyDifferent = () => {
    navigate("/membership/plans"); // redirect to Plans page
  };

  return (
    <div className="membership-container">
      <h1>Renew Membership</h1>
      <div className="membership-cards">
        <div className="card" onClick={handleRenewCurrent}>
          <h2>Renew Current Plan</h2>
          <p>
            {membership
              ? `Renew your ${membership.name} plan`
              : "No active plan to renew"}
          </p>
        </div>

        <div className="card" onClick={handleBuyDifferent}>
          <h2>Buy a Different Plan</h2>
          <p>Choose a different plan from the available options.</p>
        </div>
      </div>
    </div>
  );
}

export default RenewMembership;
