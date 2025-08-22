import { Link } from "react-router-dom";
import "../../styles/Plans.css";

function PlansPage() {
  const plans = [
    { id: 1, name: "Basic Plan", price: 500 },
    { id: 2, name: "Standard Plan", price: 1200 },
    { id: 3, name: "Premium Plan", price: 4000 },
  ];

  return (
    <div className="membership-container">
      <h1>Choose a Membership Plan</h1>
      <div className="card-container">
        {plans.map((plan) => (
          <div className="card" key={plan.id}>
            <h2>{plan.name}</h2>
            <p>Price: ₹{plan.price}</p>
            <Link to={`/membership/payment/${plan.id}`} className="btn">
              Buy Now
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default PlansPage;
