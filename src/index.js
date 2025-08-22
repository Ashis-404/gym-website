import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MembershipProvider } from "./Context/MembershipContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MembershipProvider>
        <App />
      </MembershipProvider>
    </BrowserRouter>
  </React.StrictMode>
);
