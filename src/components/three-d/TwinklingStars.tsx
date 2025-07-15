import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TwinklingStars: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerGradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 12);
    centerGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    centerGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = centerGradient;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const { geometry, material } = useMemo(() => {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 500;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const scales = new Float32Array(starCount);
    const phases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Create stars in a spherical distribution around the scene
      const radius = 25 + Math.random() * 25; // Far background
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi);
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Subtle color variations - mostly white with slight blue/yellow tints
      const colorVariation = Math.random();
      if (colorVariation < 0.7) {
        // Pure white stars
        colors[i3] = 1;
        colors[i3 + 1] = 1; 
        colors[i3 + 2] = 1;
      } else if (colorVariation < 0.85) {
        // Slightly blue tint
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.95;
        colors[i3 + 2] = 1;
      } else {
        // Slightly yellow tint
        colors[i3] = 1;
        colors[i3 + 1] = 0.95;
        colors[i3 + 2] = 0.8;
      }

      // Random scale and twinkling phase
      scales[i] = 0.1 + Math.random() * 0.3;
      phases[i] = Math.random() * Math.PI * 2;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    starGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        starTexture: { value: starTexture },
        u_time: { value: 0 },
      },
      vertexShader: `
        attribute float scale;
        attribute float phase;
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float u_time;

        void main() {
          vColor = color;
          
          // Slow twinkling effect
          vTwinkle = 0.6 + 0.4 * sin(u_time * 2.0 + phase);
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = scale * vTwinkle * (800.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform sampler2D starTexture;
        varying vec3 vColor;
        varying float vTwinkle;

        void main() {
          vec2 uv = gl_PointCoord;
          vec4 texColor = texture2D(starTexture, uv);
          
          float alpha = texColor.a * vTwinkle * 0.8;
          
          gl_FragColor = vec4(vColor * texColor.rgb, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    return { geometry: starGeometry, material: starMaterial };
  }, [starTexture]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (material.uniforms.u_time) {
      material.uniforms.u_time.value = elapsedTime;
    }

    // Very slow rotation for subtle movement
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.rotation.x += 0.00005;
    }
  });

  return <points ref={starsRef} geometry={geometry} material={material} />;
};

export default TwinklingStars;