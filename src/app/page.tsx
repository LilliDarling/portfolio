"use client";
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const CanvasWrap = dynamic(() => import('@/components/three-d/CanvasWrap'), {
  ssr: false,
});
const CosmicFlower = dynamic(() => import('@/components/three-d/CosmicFlower'), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        <h1>Lillith Long - Software Engineer</h1>
        <p>Explore my work, starting with this cosmic bloom.</p>
      </div>

      <Suspense fallback={<div>Loading 3D experience...</div>}>
        <CanvasWrap>
          <CosmicFlower />
        </CanvasWrap>
      </Suspense>
    </main>
  );
}
