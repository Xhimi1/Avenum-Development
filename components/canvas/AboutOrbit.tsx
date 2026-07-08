'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import Glow from './Glow';
import { CENTERS } from '@/lib/path';
import { presence } from '@/lib/scroll';
import { SECTIONS } from '@/lib/palette';

const RING_DEFS = [
  { radius: 1.9, tilt: [0.8, 0.2] as const, speed: 0.35 },
  { radius: 2.45, tilt: [1.2, -0.5] as const, speed: -0.25 },
  { radius: 3.0, tilt: [0.5, 0.9] as const, speed: 0.18 },
];

const MOBILE_QUERY = '(max-width: 820px)';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isMobile;
}

/**
 * The about "location": a violet distorted core orbited by three tilted
 * rings, each carrying a glowing electron, rotating at a steady constant
 * speed. Sits beside the manifesto card on desktop; on mobile it tucks
 * down and to the right, below the card.
 */
export default function AboutOrbit() {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<Array<THREE.Group | null>>([]);
  const electrons = useRef<Array<THREE.Mesh | null>>([]);
  const scale = useRef(0);
  const isMobile = useIsMobile();
  const position: [number, number, number] = isMobile
    ? [CENTERS.about[0] + 1.8, CENTERS.about[1] - 2, CENTERS.about[2]]
    : [CENTERS.about[0] + 2.8, CENTERS.about[1] + 0.4, CENTERS.about[2]];

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { damp } = THREE.MathUtils;
    const p = presence(3);
    g.visible = p > 0.02;
    if (!g.visible) return;

    scale.current = damp(scale.current, p, 4, delta);
    g.scale.setScalar(Math.max(scale.current, 0.0001));

    const t = state.clock.elapsedTime;
    RING_DEFS.forEach((def, i) => {
      const ring = rings.current[i];
      if (ring) {
        ring.rotation.x = def.tilt[0] + Math.sin(t * 0.2 + i) * 0.15;
        ring.rotation.y = def.tilt[1] + t * def.speed * 0.4;
      }
      const e = electrons.current[i];
      if (e) {
        const a = t * def.speed * 2.4 + i * 2.1;
        e.position.set(Math.cos(a) * def.radius, Math.sin(a) * def.radius, 0);
      }
    });
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <icosahedronGeometry args={[1.32, 5]} />
        <MeshDistortMaterial
          color={SECTIONS[3].accent}
          emissive="#5b21b6"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.3}
          distort={0.28}
          speed={1.6}
        />
      </mesh>

      {RING_DEFS.map((def, i) => (
        <group
          key={i}
          ref={(el) => {
            rings.current[i] = el;
          }}
        >
          <mesh>
            <torusGeometry args={[def.radius, 0.045, 12, 96]} />
            <meshStandardMaterial
              color={SECTIONS[3].glow}
              emissive={SECTIONS[3].glow}
              emissiveIntensity={0.7}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
          <mesh
            ref={(el) => {
              electrons.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={SECTIONS[3].glow}
              emissiveIntensity={2.4}
            />
          </mesh>
        </group>
      ))}

      <Glow color={SECTIONS[3].accent} scale={10.5} opacity={0.4} />
      <pointLight color={SECTIONS[3].accent} intensity={150} distance={28} position={[2, 3, 4]} />
      <pointLight color={SECTIONS[3].glow} intensity={65} distance={22} position={[-3, -2, 2]} />
    </group>
  );
}
