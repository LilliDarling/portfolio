"use client";
import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';

interface ClientWrapperProps {
  readonly children: React.ReactNode;
}

function AppContent({ children }: ClientWrapperProps) {
  const { isNavigating } = useLoading();

  return (
    <>
      {children}
      {isNavigating && (
        <LoadingScreen 
          message="Navigating..." 
          overlay={true}
        />
      )}
    </>
  );
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <LoadingScreen message="Initializing cosmic experience..." />
      </div>
    );
  }

  return (
    <LoadingProvider>
      <AppContent>{children}</AppContent>
    </LoadingProvider>
  );
}