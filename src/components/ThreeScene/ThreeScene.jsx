import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

function FilterLayer({ y, color, radius = 2.4, height = 1.4 }) {
  return (
    <mesh position={[0, y, 0]}>
      <cylinderGeometry args={[radius, radius, height, 64]} />
      <meshStandardMaterial color={color} roughness={0.68} metalness={0.12} />
    </mesh>
  );
}

function FilterShell({ isExploded }) {
  return (
    <mesh position={[0, 8, 0]}>
      <cylinderGeometry args={[2.95, 2.95, 16.5, 64, 1, true]} />
      <meshPhysicalMaterial
        color="#dcefff"
        transparent
        opacity={0.18}
        roughness={0.05}
        metalness={0.2}
        transmission={0.82}
        thickness={1.4}
        clearcoat={1}
        clearcoatRoughness={0.15}
        side={2}
      />
    </mesh>
  );
}

function FilterCore({ isExploded, isSimulating }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    if (isSimulating) {
      group.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 1.8) * 0.04;
    } else {
      group.current.position.y = 0;
    }
  });

  const explodeOffset = isExploded ? 2.5 : 0;

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[3.2, 3.2, 0.5, 64]} />
        <meshStandardMaterial color="#10171d" roughness={0.74} metalness={0.1} />
      </mesh>
      <FilterShell isExploded={isExploded} />
      <FilterLayer y={-0.4 + explodeOffset} color="#c8a66f" />
      <FilterLayer y={1.6 + explodeOffset} color="#d5b98b" />
      <FilterLayer y={4.2 + explodeOffset} color="#161c25" />
      <FilterLayer y={7.0 + explodeOffset} color="#eef2f7" />
    </group>
  );
}

export function FilterScene({ isExploded, isSimulating }) {
  return (
    <>
      <ambientLight intensity={0.75} />
      <spotLight position={[10, 18, 12]} angle={0.24} intensity={1.2} penumbra={0.4} />
      <spotLight position={[-10, 18, -12]} angle={0.32} intensity={0.45} color="#4fd8ff" />
      <FilterCore isExploded={isExploded} isSimulating={isSimulating} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#08101c" roughness={0.84} metalness={0.08} />
      </mesh>
      <Environment preset="warehouse" />
    </>
  );
}
