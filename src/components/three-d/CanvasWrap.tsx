import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import React, { Suspense } from 'react';

interface CanvasWrapProps {
  children: React.ReactNode;
}

const CanvasWrap: React.FC<CanvasWrapProps> = ({ children }) => {
  return (
    <Canvas
      camera={{ position: [1, 1, 2.5], fov: 75 }}
      style={{ width: '100%', height: '100%', background: '#000000' }}
    >
      <Suspense fallback={null}> 
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 2]} intensity={2} color={0xffaacc} />
        <pointLight position={[0, 0, -2]} intensity={1} color={0xccaa00} />
        <Environment preset="night" />

        {children}

        <OrbitControls enableZoom={true} enablePan={false} enableRotate={true} />
      </Suspense>
    </Canvas>
  );
};

export default CanvasWrap;