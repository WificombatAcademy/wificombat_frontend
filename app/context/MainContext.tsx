"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MainContextType {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  return (
    <MainContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
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
