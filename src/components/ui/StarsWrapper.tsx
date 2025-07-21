"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CanvasWrap = dynamic(() => import('@/components/three-d/CanvasWrap'), {
  ssr: false,
});
const TwinklingStars = dynamic(() => import('@/components/three-d/TwinklingStars'), {
  ssr: false,
});

export default function StarsWrapper() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 0
    }}>
      <Suspense fallback={null}>
        <CanvasWrap
          stars={<TwinklingStars />}
          enableControls={false}
        >
          {null}
        </CanvasWrap>
      </Suspense>
    </div>
  );
}