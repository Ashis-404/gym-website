import { useParams, useNavigate } from "react-router-dom";
import { useMembership } from "../../Context/MembershipContext";
import "../../styles/Payment.css";

function PaymentPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { buyPlan } = useMembership();

  const plans = {
    1: { id: 1, name: "Basic Plan", price: 500 },
    2: { id: 2, name: "Standard Plan", price: 1200 },
    3: { id: 3, name: "Premium Plan", price: 4000 },
  };

  const plan = plans[planId];

  const handlePayment = async () => {
    if (!plan) return alert("Invalid Plan Selected");

    // Create Razorpay options
    const options = {
      key: "YOUR_RAZORPAY_KEY", // replace with your key
      amount: plan.price * 100, // in paise
      currency: "INR",
      name: "TILL FAILURE Gym",
      description: `Payment for ${plan.name}`,
      handler: function (response) {
        // payment successful
        buyPlan(plan);
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate("/membership/view");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#f5c518",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="membership-container">
      <h1>Payment Page</h1>
      {plan ? (
        <div className="card">
          <h2>{plan.name}</h2>
          <p>Amount: ₹{plan.price}</p>
          <button className="btn" onClick={handlePayment}>
            Buy Now
          </button>
        </div>
      ) : (
        <p>Invalid Plan Selected</p>
      )}
      <button className="btn" onClick={() => navigate("/membership/plans")}>
        Go Back
      </button>
    </div>
  );
}

export default PaymentPage;
