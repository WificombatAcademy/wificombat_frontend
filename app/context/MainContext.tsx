"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MainContextType {
  toggleSidebar: boolean;
  successfulSignup: boolean;
  selectedRole: string;
  setSuccessfulSignup: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    // Only run this code on the client side
    if (typeof window !== 'undefined') {
      const savedRole = sessionStorage.getItem('selectedRole');
      if (savedRole) {
        setSelectedRole(savedRole);
      }
    }
  }, []);

  useEffect(() => {
    // Save selectedRole to sessionStorage whenever it changes
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedRole', selectedRole);
    }
  }, [selectedRole]);

  return (
    <MainContext.Provider value={{ 
      toggleSidebar, 
      setToggleSidebar, 
      selectedRole, 
      setSelectedRole,
      successfulSignup, 
      setSuccessfulSignup }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error('useMain must be used within a MainProvider');
  }
  return context;
};
