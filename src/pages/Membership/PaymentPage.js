import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMembership } from "../../Context/MembershipContext";
import "../../styles/Payment.css";

function PaymentPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { buyPlan } = useMembership();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const plans = {
    1: { 
      id: 1, 
      name: "Basic Plan", 
      price: 500,
      duration: "1 Month",
      features: ["Access to gym equipment", "Basic workout guidance", "Locker facility"],
      gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
      icon: "🏋️‍♂️"
    },
    2: { 
      id: 2, 
      name: "Standard Plan", 
      price: 1200,
      duration: "3 Months",
      features: ["Everything in Basic", "Personal trainer sessions", "Group fitness classes"],
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
      icon: "💪"
    },
    3: { 
      id: 3, 
      name: "Premium Plan", 
      price: 4000,
      duration: "12 Months",
      features: ["Everything in Standard", "Unlimited personal training", "Premium equipment access"],
      gradient: "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)",
      icon: "👑"
    },
  };

  const plan = plans[planId];

  const handlePayment = async () => {
    if (!plan) return alert("Invalid Plan Selected");

    setIsProcessing(true);

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
        setIsProcessing(false);
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate("/membership/view");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#FF6B35",
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-card floating-element-1">💳</div>
        <div className="floating-shield floating-element-2">🛡️</div>
        <div className="floating-check floating-element-3">✅</div>
      </div>

      {/* Hero Section */}
      <section className="payment-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Secure
              <span className="highlight"> Payment</span>
            </h1>
            <p className="hero-subtitle">
              Complete your membership purchase with our secure payment gateway. 
              Your fitness journey is just one click away!
            </p>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="payment-section">
        <div className="container">
          {plan ? (
            <div className="payment-container">
              {/* Plan Summary */}
              <div className="plan-summary">
                <div className="summary-header">
                  <h2>Order Summary</h2>
                </div>
                
                <div className="plan-details" style={{ background: plan.gradient }}>
                  <div className="plan-icon">
                    <span>{plan.icon}</span>
                  </div>
                  <div className="plan-info">
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-duration">{plan.duration}</p>
                  </div>
                  <div className="plan-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                  </div>
                </div>

                <div className="plan-features">
                  <h4>What's Included:</h4>
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Payment Form */}
              <div className="payment-form">
                <div className="form-header">
                  <h2>Payment Details</h2>
                  <div className="security-badge">
                    <span className="security-icon">🔒</span>
                    <span>Secure Payment</span>
                  </div>
                </div>

                <div className="payment-methods">
                  <h4>Accepted Payment Methods</h4>
                  <div className="payment-icons">
                    <div className="payment-method">💳 Credit Card</div>
                    <div className="payment-method">🏦 Debit Card</div>
                    <div className="payment-method">📱 UPI</div>
                    <div className="payment-method">🏪 Net Banking</div>
                  </div>
                </div>

                <div className="total-section">
                  <div className="total-row">
                    <span>Plan Price:</span>
                    <span>₹{plan.price}</span>
                  </div>
                  <div className="total-row">
                    <span>GST (18%):</span>
                    <span>₹{Math.round(plan.price * 0.18)}</span>
                  </div>
                  <div className="total-row total">
                    <span>Total Amount:</span>
                    <span>₹{plan.price + Math.round(plan.price * 0.18)}</span>
                  </div>
                </div>

                <button 
                  className={`payment-button ${isProcessing ? 'processing' : ''}`}
                  onClick={handlePayment}
                  disabled={isProcessing}
                  style={{ background: plan.gradient }}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay Now ₹{plan.price + Math.round(plan.price * 0.18)}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>

                <div className="security-info">
                  <p>
                    <span className="security-icon">🛡️</span>
                    Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="error-container">
              <div className="error-icon">❌</div>
              <h2>Invalid Plan Selected</h2>
              <p>The selected plan could not be found. Please go back and select a valid plan.</p>
            </div>
          )}

          <div className="navigation-buttons">
            <button 
              className="back-button" 
              onClick={() => navigate("/membership/plans")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Plans</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaymentPage;