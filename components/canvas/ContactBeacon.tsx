'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import Glow from './Glow';
import { CENTERS } from '@/lib/path';
import { presence } from '@/lib/scroll';
import { SECTIONS } from '@/lib/palette';

/**
 * The final location: a pulsing cyan beacon with expanding rings —
 * the "signal" the contact section invites you to send.
 */
export default function ContactBeacon() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const scale = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = presence(4);
    g.visible = p > 0.02;
    if (!g.visible) return;

    scale.current = THREE.MathUtils.damp(scale.current, p, 4, delta);
    g.scale.setScalar(Math.max(scale.current, 0.0001));

    const t = state.clock.elapsedTime;
    if (core.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      core.current.scale.setScalar(pulse);
      core.current.rotation.y += delta * 0.2;
    }

    // expanding rings fade out as they grow
    [ringA.current, ringB.current].forEach((ring, i) => {
      if (!ring) return;
      const cycle = (t * 0.4 + i * 0.5) % 1;
      const s = 1 + cycle * 2.4;
      ring.scale.set(s, s, s);
      (ring.material as THREE.MeshBasicMaterial).opacity = (1 - cycle) * 0.55;
    });
  });

  return (
    // offset right/up of the look target so the DOM form doesn't cover it
    <group
      ref={group}
      position={[CENTERS.contact[0] + 2.6, CENTERS.contact[1] + 0.8, CENTERS.contact[2]]}
    >
      <mesh ref={core}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={SECTIONS[4].accent}
          emissive="#0891b2"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.2}
          distort={0.4}
          speed={3}
        />
      </mesh>

      {[ringA, ringB].map((ref, i) => (
        <mesh key={i} ref={ref} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[2.1, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={SECTIONS[4].accent}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      <Glow color={SECTIONS[4].accent} scale={12} opacity={0.4} />
      <Glow color={SECTIONS[4].glow} scale={20} opacity={0.12} />
      <pointLight color={SECTIONS[4].accent} intensity={150} distance={32} position={[0, 4, 4]} />
      <pointLight color={SECTIONS[4].glow} intensity={60} distance={24} position={[-4, -3, 2]} />
    </group>
  );
}
