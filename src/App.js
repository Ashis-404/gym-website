import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import MembershipMain from "./pages/Membership/MembershipMain";
import PlansPage from "./pages/Membership/PlansPage";
import PaymentPage from "./pages/Membership/PaymentPage";
import RenewMembership from "./pages/Membership/RenewMembership";
import ViewMembership from "./pages/Membership/ViewMembership";
import ServicesMain from "./pages/Services/ServicesMain";
import DietPlans from "./pages/Services/DietPlans";
import WorkoutPlans from "./pages/Services/WorkoutPlans";
import CalorieCalculator from "./pages/Services/CalorieCalculator";

import Reviews from "./pages/Reviews";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Update localStorage whenever login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);


  return (
    <>

      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}


      <Routes>
        {/* Default route → if not logged in, go to /signin */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/signin" replace />
          }
        />

        {/* Sign in route */}
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Routes → only accessible if logged in */}
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/membership"
          element={isLoggedIn ? <MembershipMain /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/membership/plans"
          element={isLoggedIn ? <PlansPage /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/membership/payment/:planId"
          element={isLoggedIn ? <PaymentPage /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/membership/renew"
          element={isLoggedIn ? <RenewMembership /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/membership/view"
          element={isLoggedIn ? <ViewMembership /> : <Navigate to="/signin" replace />}
        />
         {/* Services main page */}
        <Route path="/services" element={<ServicesMain />} />

        {/* Sub-pages */}
        <Route path="/services/diet-plans" element={<DietPlans />} />
        <Route path="/services/workout-plans" element={<WorkoutPlans />} />
        <Route path="/services/calorie-calculator" element={<CalorieCalculator />} />
        <Route path="/contact" element={<div style={{ padding: '100px 20px', textAlign: 'center', color: 'white', background: '#0a0a0a', minHeight: '100vh' }}><h1>Contact Page</h1><p>Coming Soon!</p></div>} />
        <Route
          path="/reviews"
          element={isLoggedIn ? <Reviews /> : <Navigate to="/signin" replace />}
        />
      </Routes>

      {/* Show Footer only if logged in */}
      {isLoggedIn && <Footer />}
    </>
  );
}

export default App;
