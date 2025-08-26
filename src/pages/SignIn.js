/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css"; 

function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- add this

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsLoggedIn(true);
  localStorage.setItem("isLoggedIn", "true"); // persist login
  navigate("/"); // go to Home page
};


  return (
    <div className="auth-wrapper">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input
              id="pass"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-full">Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
*/


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";

function SignIn({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Login logic
        if (formData.email && formData.password) {
          setIsLoggedIn(true);
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('userName', formData.name || 'Gym Member');
          navigate("/");
        } else {
          alert("Please fill in all fields");
        }
      } else {
        // Sign up logic
        if (formData.name && formData.email && formData.password && formData.confirmPassword) {
          if (formData.password === formData.confirmPassword) {
            setIsLoggedIn(true);
            localStorage.setItem('userEmail', formData.email);
            localStorage.setItem('userName', formData.name);
            navigate("/");
          } else {
            alert("Passwords don't match");
          }
        } else {
          alert("Please fill in all fields");
        }
      }
      setIsProcessing(false);
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="signin-page">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-key floating-element-1">🔑</div>
        <div className="floating-shield floating-element-2">🛡️</div>
        <div className="floating-user floating-element-3">👤</div>
      </div>

      {/* Hero Section */}
      <section className="signin-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className={`hero-content ${isLoaded ? 'animate-in' : ''}`}>
            <h1 className="hero-title">
              Welcome to
              <span className="highlight"> TILL FAILURE</span>
            </h1>
            <p className="hero-subtitle">
              {isLogin 
                ? "Sign in to continue your fitness journey with us"
                : "Join our community and start your transformation today"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Sign In Form Section */}
      <section className="signin-section">
        <div className="container">
          <div className={`signin-container ${isLoaded ? 'animate-in' : ''}`}>
            <div className="signin-card">
              <div className="card-header">
                <h2 className="card-title">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h2>
                <p className="card-subtitle">
                  {isLogin 
                    ? "Welcome back! Please sign in to your account"
                    : "Join thousands of members on their fitness journey"
                  }
                </p>
              </div>

              <form className="signin-form" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`submit-btn ${isProcessing ? 'processing' : ''}`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <div className="form-footer">
                <p className="toggle-text">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    type="button" 
                    className="toggle-btn"
                    onClick={toggleMode}
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>

              <div className="social-signin">
                <div className="divider">
                  <span>Or continue with</span>
                </div>
                <div className="social-buttons">
                  <button className="social-btn google">
                    <span className="social-icon">🔍</span>
                    Google
                  </button>
                  <button className="social-btn facebook">
                    <span className="social-icon">📘</span>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;