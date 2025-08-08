"use client";
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

interface LoadingContextType {
  isNavigating: boolean;
  setIsNavigating: (loading: boolean) => void;
  startNavigation: () => void;
  endNavigation: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = useCallback(() => setIsNavigating(true), []);
  const endNavigation = useCallback(() => {
    setTimeout(() => setIsNavigating(false), 800);
  }, []);

  const contextValue = useMemo(() => ({
    isNavigating,
    setIsNavigating,
    startNavigation,
    endNavigation
  }), [isNavigating, startNavigation, endNavigation]);

  return (
    <LoadingContext.Provider value={contextValue}>
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