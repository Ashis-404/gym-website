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

/*function App() {
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
        
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/signin" replace />
          }
        />

        
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />

        
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
        
        <Route path="/services" element={<ServicesMain />} />

        
        <Route path="/services/diet-plans" element={<DietPlans />} />
        <Route path="/services/workout-plans" element={<WorkoutPlans />} />
        <Route path="/services/calorie-calculator" element={<CalorieCalculator />} />
        <Route path="/contact" element={<div style={{ padding: '100px 20px', textAlign: 'center', color: 'white', background: '#0a0a0a', minHeight: '100vh' }}><h1>Contact Page</h1><p>Coming Soon!</p></div>} />
        <Route
          path="/reviews"
          element={isLoggedIn ? <Reviews /> : <Navigate to="/signin" replace />}
        />
      </Routes>

      
      {isLoggedIn && <Footer />}
    </>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import ServicesMain from './components/services/ServicesMain';
import DietPlans from './components/services/DietPlans';
import WorkoutPlans from './components/services/WorkoutPlans';
import CalorieCalculator from './components/services/CalorieCalculator';
import Reviews from './components/Reviews';
import MembershipMain from './components/membership/MembershipMain';
import PlansPage from './components/membership/PlansPage';
import PaymentPage from './components/membership/PaymentPage';
import RenewMembership from './components/membership/RenewMembership';
import ViewMembership from './components/membership/ViewMembership';
*/
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userName') ? true : false
  );

  return (
    
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/membership" element={<MembershipMain />} />
          <Route path="/membership/plans" element={<PlansPage />} />
          <Route path="/membership/payment/:planId" element={<PaymentPage />} />
          <Route path="/membership/renew" element={<RenewMembership />} />
          <Route path="/membership/view" element={<ViewMembership />} />
          <Route path="/services" element={<ServicesMain />} />
          <Route path="/services/diet-plans" element={<DietPlans />} />
          <Route path="/services/workout-plans" element={<WorkoutPlans />} />
          <Route path="/services/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<div style={{padding: '100px 20px', textAlign: 'center', color: 'white', background: '#0a0a0a', minHeight: '100vh'}}><h1>Contact Page</h1><p>Coming Soon!</p></div>} />
        </Routes>
        {isLoggedIn && <Footer />}
      </div>
    
  );
}

export default App;

