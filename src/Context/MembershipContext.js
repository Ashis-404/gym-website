import React, { createContext, useContext, useState } from "react";

// 1. Create context
const MembershipContext = createContext();

// 2. Provider component
export const MembershipProvider = ({ children }) => {
  const [membership, setMembership] = useState(null);

  // Buy a new plan
  const buyMembership = (plan) => {
    setMembership(plan);
  };

  // Renew an existing or new plan
  const renewMembership = (plan) => {
    setMembership(plan);
  };

  return (
    <MembershipContext.Provider
      value={{ membership, buyMembership, renewMembership }}
    >
      {children}
    </MembershipContext.Provider>
  );
};

// 3. Custom hook
export const useMembership = () => {
  return useContext(MembershipContext);
};
