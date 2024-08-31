"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MainContextType {
  toggleSidebar: boolean;
  selectedRole: string;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>(() => {
    return sessionStorage.getItem('selectedRole') || '';
  });

  useEffect(() => {
    // Save selectedRole to sessionStorage whenever it changes
    sessionStorage.setItem('selectedRole', selectedRole);
  }, [selectedRole]);

  return (
    <MainContext.Provider value={{ toggleSidebar, setToggleSidebar, selectedRole, setSelectedRole }}>
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
