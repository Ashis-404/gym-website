/*import React, { createContext, useContext, useState } from "react";

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
*/

import React, { createContext, useContext, useState } from 'react';

const MembershipContext = createContext();

export const useMembership = () => {
  const context = useContext(MembershipContext);
  if (!context) {
    throw new Error('useMembership must be used within a MembershipProvider');
  }
  return context;
};

export const MembershipProvider = ({ children }) => {
  const [membership, setMembership] = useState(null);

  const buyPlan = (plan) => {
    setMembership(plan);
    localStorage.setItem('membership', JSON.stringify(plan));
  };

  const clearMembership = () => {
    setMembership(null);
    localStorage.removeItem('membership');
  };

  // Load membership from localStorage on mount
  React.useEffect(() => {
    const savedMembership = localStorage.getItem('membership');
    if (savedMembership) {
      setMembership(JSON.parse(savedMembership));
    }
  }, []);

  const value = {
    membership,
    buyPlan,
    clearMembership
  };

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
};

export default MembershipContext;