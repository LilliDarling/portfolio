"use client";
import React from 'react';

interface LoadingScreenProps {
  readonly message?: string;
  readonly overlay?: boolean;
}

export default function LoadingScreen({ 
  message = "Loading...", 
  overlay = false 
}: LoadingScreenProps) {
  const containerClass = overlay 
    ? "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center min-h-screen bg-background";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30"></div>

          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-400 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-r-blue-400 animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-pink-400 animate-spin" style={{ animationDuration: '2s' }}></div>

          <div className="absolute inset-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        </div>

        <div className="text-center">
          <p className="text-white/80 text-lg font-medium mb-2">{message}</p>

          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}