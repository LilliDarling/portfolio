import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';

interface CanvasWrapProps {
  children: React.ReactNode;
  cameraPosition?: { x: number; y: number; z: number };
  sceneScale?: number;
  scenePosition?: { x: number; y: number };
  stars?: React.ReactNode;
  enableControls?: boolean;
  onCreated?: () => void;
  fov?: number;
}

function CameraController({ position, enableControls }: { position: { x: number; y: number; z: number }, enableControls: boolean }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(position.x, position.y, position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });

  return <OrbitControls ref={controlsRef} enabled={enableControls} enableZoom={false} enablePan={false} enableRotate={enableControls} />;
}

const CanvasWrap: React.FC<CanvasWrapProps> = ({ 
  children, 
  cameraPosition = { x: 1, y: 1, z: 2.5 },
  sceneScale = 1,
  scenePosition = { x: 0, y: 0 },
  stars,
  enableControls = true,
  onCreated,
  fov = 75
}) => {
  return (
    <Canvas
      camera={{ position: [cameraPosition.x, cameraPosition.y, cameraPosition.z], fov: fov }}
      style={{ width: '100%', height: '100%', background: '#000000' }}
      onCreated={onCreated}
    >
      <Suspense fallback={null}> 
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 2]} intensity={2} color={0xffaacc} />
        <pointLight position={[0, 0, -2]} intensity={1} color={0xccaa00} />
        <Environment preset="night" />

        {stars}

        <group 
          scale={[sceneScale, sceneScale, sceneScale]}
          position={[scenePosition.x, scenePosition.y, 0]}
        >
          {children}
        </group>

        <CameraController position={cameraPosition} enableControls={enableControls} />
      </Suspense>
    </Canvas>
  );
};

export default CanvasWrap;