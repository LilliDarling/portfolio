"use client";
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Dynamically import CanvasWrapper and CosmicFlower to ensure they only render on client-side
// This is important for R3F, as it needs the browser's DOM and WebGL context
const CanvasWrap = dynamic(() => import('@/components/three-d/CanvasWrap'), {
  ssr: false,
});
const CosmicFlower = dynamic(() => import('@/components/three-d/CosmicFlower'), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Overlay UI elements on top of the 3D scene */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        {/* Your Navbar, hero text, etc. */}
        <h1>Your Name - Software Engineer</h1>
        <p>Explore my work, starting with this cosmic bloom.</p>
        {/* You could add a button to trigger the cosmic transformation if it's not automatic */}
      </div>

      {/* The 3D Canvas */}
      <Suspense fallback={<div>Loading 3D experience...</div>}>
        <CanvasWrap>
          <CosmicFlower />
        </CanvasWrap>
      </Suspense>
    </main>
  );
}
