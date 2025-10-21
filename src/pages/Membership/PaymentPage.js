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

  // New state for modal
  const [paidModalOpen, setPaidModalOpen] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

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

    // If you have a valid Razorpay key & integration use that.
    // Fallback: simulate payment and show success popup
    setTimeout(() => {
      const total = plan.price + Math.round(plan.price * 0.18);
      buyPlan(plan);
      setIsProcessing(false);
      setPaidAmount(total);
      setPaidModalOpen(true);
    }, 1200);
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

          {/* Paid success modal */}
          {paidModalOpen && (
            <div
              className="paid-modal-overlay"
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999
              }}
            >
              <div
                className="paid-modal"
                style={{
                  background: "#0f1724",
                  color: "#fff",
                  padding: 24,
                  borderRadius: 12,
                  width: 360,
                  maxWidth: "90%",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
                }}
              >
                <div style={{ fontSize: 48 }}>✅</div>
                <h3 style={{ marginTop: 8 }}>Payment Successful</h3>
                <p style={{ color: "#cbd5e1" }}>Amount Paid: ₹{paidAmount}</p>
                <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      setPaidModalOpen(false);
                      navigate("/membership/view");
                    }}
                    style={{
                      background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
                      border: "none",
                      color: "#fff",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer"
                    }}
                  >
                    View Membership
                  </button>
                  <button
                    onClick={() => setPaidModalOpen(false)}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer"
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
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