import React, { useState , useEffect} from "react";
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
import Services from "./pages/Services";
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
        <Route
          path="/services"
          element={isLoggedIn ? <Services /> : <Navigate to="/signin" replace />}
        />
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
