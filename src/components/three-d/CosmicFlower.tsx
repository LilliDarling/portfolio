import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

import basicVertex from './shaders/basicVertex.glsl';
import cosmicFrag from './shaders/cosmicFragment.glsl';

interface CosmicFlowerProps {
  initialDelay?: number;
  onCosmicComplete?: () => void;
}

const CosmicFlower: React.FC<CosmicFlowerProps> = ({ initialDelay = 1, onCosmicComplete }) => {
  const flowerRef = useRef<THREE.Mesh>(null);
  const galaxyRef = useRef<THREE.Points>(null);

  const { scene: gltfScene } = useGLTF('/flower.glb');

  const cosmicShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_cosmicIntensity: { value: 0 },
        u_swirlSpeed: { value: 0.1 },
        u_glowStrength: { value: 2.0 },
        u_pulseFactor: { value: 0.0 }
      },
      vertexShader: basicVertex,
      fragmentShader: cosmicFrag,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  const crystalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.8, 0.7, 1.0),
      metalness: 0.05,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 1.2,
      ior: 2.42,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transparent: true,
      opacity: 0.85,
      envMapIntensity: 1.5,
      attenuationDistance: 0.8,
      attenuationColor: new THREE.Color(0.9, 0.8, 1.0),
      side: THREE.DoubleSide,
    });
  }, []);

  const dustTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(60, 60, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    for (let i = 0; i < 10; i++) {
        const x = Math.random() * 128;
        const y = Math.random() * 128;
        const r = 15 + Math.random() * 20;
        const alpha = 0.05 + Math.random() * 0.1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const starTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerGradient = ctx.createRadialGradient(60, 60, 0, 64, 64, 16);
    centerGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    centerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
    centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = centerGradient;
    ctx.fillRect(0, 0, 128, 128);

    for (let i = 0; i < 4; i++) {
        const angle = i * Math.PI / 2 + Math.random() * 0.5 - 0.25;
        ctx.beginPath();
        ctx.moveTo(64, 64);
        ctx.lineTo(64 + Math.cos(angle) * 60, 64 + Math.sin(angle) * 60);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const galaxyGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const isMobileDevice = window.innerWidth < 768;
    const particleCount = isMobileDevice ? 4000 : 10000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const baseRadii = new Float32Array(particleCount);
    const baseAngles = new Float32Array(particleCount);
    const particleTypes = new Float32Array(particleCount);

    const minRadius = 3.0;
    const maxRadius = 15.0;
    const spiralTightness = 0.5;
    const galaxyHeight = 1.5;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const spiralArm = Math.floor(Math.random() * 6);
      const armAngle = (spiralArm * Math.PI * 2) / 6;
      const armProgress = Math.pow(Math.random(), 1.5);

      const radius = minRadius + armProgress * (maxRadius - minRadius);
      const spiralOffset = radius * spiralTightness;

      const armWidth = 0.6 + armProgress * 1.2;
      const armDeviation = (Math.random() - 0.3) * armWidth * (armProgress * 0.7);

      const finalAngle = armAngle + spiralOffset + armDeviation;
      const height = (Math.random() - 0.5) * (galaxyHeight + radius * 0.05);

      positions[i3] = Math.cos(finalAngle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(finalAngle) * radius;

      baseRadii[i] = radius;
      baseAngles[i] = finalAngle;

      const t = Math.random();
      const colorHue = Math.random();

      if (colorHue < 0.5) {
          colors[i3] = 0.1 + t * 0.2; // R
          colors[i3 + 1] = 0.05 + t * 0.1; // G
          colors[i3 + 2] = 0.4 + t * 0.5; // B
      } else {
          colors[i3] = 0.05 + t * 0.15;
          colors[i3 + 1] = 0.1 + t * 0.25;
          colors[i3 + 2] = 0.5 + t * 0.4;
      }
      const brightness = 0.2 + Math.random() * 0.5;
      colors[i3] *= brightness;
      colors[i3 + 1] *= brightness;
      colors[i3 + 2] *= brightness;

      const isStarParticle = Math.random() < 0.2;
      particleTypes[i] = isStarParticle ? 1 : 0;

      scales[i] = isStarParticle ? Math.random() * 0.4 + 0.1 : Math.random() * 1.0 + 0.3;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('baseRadius', new THREE.BufferAttribute(baseRadii, 1));
    geometry.setAttribute('baseAngle', new THREE.BufferAttribute(baseAngles, 1));
    geometry.setAttribute('particleType', new THREE.BufferAttribute(particleTypes, 1));

    return geometry;
  }, []);

  const galaxyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        dustTexture: { value: dustTexture },
        starTexture: { value: starTexture },
        size: { value: 0.8 },
        u_time: { value: 0 },
        u_minRadius: { value: 4.0 },
        u_radiusRange: { value: 11.0 },
      },
      vertexShader: `
        attribute float particleType;
        attribute float scale;
        attribute float phase;
        attribute float baseRadius;
        attribute float baseAngle;
        varying float vParticleType;
        varying vec3 vColor;
        varying float vAlphaMultiplier;
        uniform float size;
        uniform float u_time;
        uniform float u_minRadius;
        uniform float u_radiusRange;

        void main() {
          vParticleType = particleType;
          vColor = color;

          // Animate position on GPU
          float radiusNormalized = (baseRadius - u_minRadius) / u_radiusRange;
          float rotationSpeed = 0.07 * (1.0 - radiusNormalized * 0.4) + (particleType > 0.5 ? 0.005 : 0.0);
          float swirlingAngle = baseAngle + u_time * rotationSpeed;
          float currentRadius = baseRadius + sin(u_time * 0.3 + phase) * 0.3;

          float turbulenceX = sin(u_time * 0.8 + phase * 1.5) * 0.15;
          float turbulenceZ = cos(u_time * 0.9 + phase * 2.0) * 0.15;
          float turbulenceY = sin(u_time * 0.6 + phase * 2.5) * 0.08 + cos(u_time * 0.7 + phase * 3.0) * 0.05;

          float individualX = sin(u_time * 0.7 + phase * 2.0) * 0.1;
          float individualZ = cos(u_time * 0.6 + phase * 3.0) * 0.1;
          float individualY = sin(u_time * 0.4 + phase * 4.0) * 0.05;

          vec3 animatedPos;
          animatedPos.x = cos(swirlingAngle) * currentRadius + turbulenceX + individualX;
          animatedPos.z = sin(swirlingAngle) * currentRadius + turbulenceZ + individualZ;
          animatedPos.y = position.y + sin(u_time * 0.2 + phase) * 0.1 + turbulenceY + individualY;

          // Flicker
          float flicker = 1.0;
          if (particleType > 0.5) {
              flicker = 0.8 + sin(u_time * 5.0 + phase * 10.0) * 0.2;
              vAlphaMultiplier = 1.0;
          } else {
              vAlphaMultiplier = 0.5 + sin(u_time * 0.2 + phase) * 0.2;
          }

          vec4 mvPosition = modelViewMatrix * vec4(animatedPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * scale * flicker * (500.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform sampler2D dustTexture;
        uniform sampler2D starTexture;
        varying float vParticleType;
        varying vec3 vColor;
        varying float vAlphaMultiplier;

        void main() {
          vec2 uv = gl_PointCoord;

          vec4 texColor;
          if (vParticleType > 0.2) {
            texColor = texture2D(starTexture, uv);
          } else {
            texColor = texture2D(dustTexture, uv);
          }

          float finalAlpha = texColor.a * vAlphaMultiplier;

          gl_FragColor = vec4(vColor * texColor.rgb, finalAlpha * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
  }, [dustTexture, starTexture]);

  useEffect(() => {
    if (galaxyMaterial?.uniforms) {
      galaxyMaterial.uniforms.dustTexture.value = dustTexture;
      galaxyMaterial.uniforms.starTexture.value = starTexture;
    }
  }, [galaxyMaterial, dustTexture, starTexture]);

  const flowerModel = useMemo(() => {
    if (!gltfScene) return null;
    const clonedScene = gltfScene.clone();
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = crystalMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
        flowerRef.current = child;
      }
    });
    return clonedScene;
  }, [gltfScene, crystalMaterial]);

  useEffect(() => {
    if (!flowerRef.current) return;

    const tl = gsap.timeline({
      delay: initialDelay,
      onComplete: () => {
        console.log("Cosmic transformation complete!");
        onCosmicComplete?.();
      },
    });

    tl.to(cosmicShaderMaterial.uniforms.u_cosmicIntensity, {
      value: 1,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
      }
    });

    return () => {
      tl.kill();
    };
  }, [cosmicShaderMaterial, initialDelay, onCosmicComplete]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    cosmicShaderMaterial.uniforms.u_time.value = elapsedTime;
    galaxyMaterial.uniforms.u_time.value = elapsedTime;

    if (flowerRef.current) {
      flowerRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      {flowerModel && <primitive object={flowerModel} ref={flowerRef} scale={[2, 2, 2]} />}
      <points ref={galaxyRef} geometry={galaxyGeometry} material={galaxyMaterial} />
    </>
  );
};

export default CosmicFlower;