"use client";
import React, { createContext, useContext, useState } from 'react';

interface LoadingContextType {
  isNavigating: boolean;
  setIsNavigating: (loading: boolean) => void;
  startNavigation: () => void;
  endNavigation: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = () => setIsNavigating(true);
  const endNavigation = () => {
    setTimeout(() => setIsNavigating(false), 800);
  };

  return (
    <LoadingContext.Provider value={{
      isNavigating,
      setIsNavigating,
      startNavigation,
      endNavigation
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}