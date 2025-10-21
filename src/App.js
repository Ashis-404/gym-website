import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // removed BrowserRouter as Router
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import PlansPage from "./pages/Membership/PlansPage";
import PaymentPage from "./pages/Membership/PaymentPage";
import Reviews from "./pages/Reviews";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import MembershipMain from "./pages/Membership/MembershipMain";
import RenewMembership from "./pages/Membership/RenewMembership";
import ViewMembership from "./pages/Membership/ViewMembership";
import ServicesMain from "./pages/Services/ServicesMain";
import DietPlans from "./pages/Services/DietPlans";
import WorkoutPlans from "./pages/Services/WorkoutPlans";
import CalorieCalculator from "./pages/Services/CalorieCalculator";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(stored === "true");
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/membership" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MembershipMain />
          </ProtectedRoute>
        } />
        <Route path="/membership/plans" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PlansPage />
          </ProtectedRoute>
        } />
        <Route path="/membership/payment/:planId" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PaymentPage />
          </ProtectedRoute>
        } />
        <Route path="/membership/renew" element={<RenewMembership />} />
        <Route path="/membership/view" element={<ViewMembership />} />
        <Route path="/services" element={<ServicesMain />} />
        <Route path="/services/diet-plans" element={<DietPlans />} />
        <Route path="/services/workout-plans" element={<WorkoutPlans />} />
        <Route path="/services/calorie-calculator" element={<CalorieCalculator />} />
        <Route path="/reviews" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Reviews />
          </ProtectedRoute>
        } />
        <Route path="/contact" element={<div style={{padding: '100px 20px', textAlign: 'center', color: 'white', background: '#0a0a0a', minHeight: '100vh'}}><h1>Contact Page</h1><p>Coming Soon!</p></div>} />
      </Routes>
      {isLoggedIn && <Footer />}
    </>
  );
}

export default App;

