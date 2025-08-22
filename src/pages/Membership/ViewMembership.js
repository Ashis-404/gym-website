import { useMembership } from "../../Context/MembershipContext";
import "../../styles/ViewMembership.css";

function ViewMembership() {
  const { membership } = useMembership();

  return (
    <div className="membership-container">
      <h1>My Membership</h1>
      {membership ? (
        <div className="card">
          <h2>{membership.name}</h2>
          <p>Price: ₹{membership.price}</p>
        </div>
      ) : (
        <p>No active membership</p>
      )}
    </div>
  );
}

export default ViewMembership;
