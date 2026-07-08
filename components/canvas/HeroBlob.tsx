'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import Glow from './Glow';
import { CENTERS } from '@/lib/path';
import { presence, scrollState } from '@/lib/scroll';
import { SECTIONS } from '@/lib/palette';
import { useStore } from '@/lib/store';
import { clamp } from '@/lib/utils';

/** Contact's banner copy is left-aligned, so this sits beside it on desktop
 *  and tucks below it on narrow screens. */
const MOBILE_QUERY = '(max-width: 820px)';
const BANNER_SCALE = 1;

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
 * A distorted sphere that tilts toward the cursor, swells on hover, and
 * distorts harder with scroll velocity — the small accent piece beside the
 * final "Ready for an experience?" banner. Two satellites orbit it. An
 * invisible low-poly proxy handles raycasting so pointer events never touch
 * the dense visible mesh.
 */
export default function HeroBlob() {
  const group = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();
  const position: [number, number, number] = isMobile
    ? [CENTERS.contact[0], CENTERS.contact[1] - 3.2, CENTERS.contact[2]]
    : [CENTERS.contact[0] + 3.4, CENTERS.contact[1] + 1, CENTERS.contact[2]];
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<any>(null);
  const satA = useRef<THREE.Mesh>(null);
  const satB = useRef<THREE.Mesh>(null);
  const hovered = useRef(false);
  const scale = useRef(0);
  const quality = useStore((s) => s.quality);
  const segments = quality === 'low' ? 48 : 96;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { damp } = THREE.MathUtils;
    const p = presence(4);
    g.visible = p > 0.02;
    if (!g.visible) return;

    const hoverBoost = hovered.current ? 1 : 0;
    scale.current = damp(scale.current, p * (1 + hoverBoost * 0.07), 4, delta);
    g.scale.setScalar(Math.max(scale.current, 0.0001) * BANNER_SCALE);

    // tilt toward the cursor
    g.rotation.x = damp(g.rotation.x, state.pointer.y * 0.35, 3, delta);
    g.rotation.y = damp(g.rotation.y, state.pointer.x * 0.5, 3, delta);

    if (mesh.current) mesh.current.rotation.z += delta * 0.1;

    // distortion follows hover + scroll velocity
    if (mat.current) {
      const v = Math.abs(scrollState.velocity);
      mat.current.distort = damp(
        mat.current.distort ?? 0.35,
        0.32 + hoverBoost * 0.16 + clamp(v * 0.002, 0, 0.22),
        4,
        delta
      );
    }

    const t = state.clock.elapsedTime;
    satA.current?.position.set(Math.cos(t * 0.7) * 2.7, Math.sin(t * 1.1) * 0.8, Math.sin(t * 0.7) * 2.7);
    satB.current?.position.set(Math.cos(t * -0.5 + 2) * 3.1, Math.cos(t * 0.9) * 0.6, Math.sin(t * -0.5 + 2) * 3.1);
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1.9, segments, segments]} />
        <MeshDistortMaterial
          ref={mat}
          color={SECTIONS[4].accent}
          emissive="#0891b2"
          emissiveIntensity={0.45}
          roughness={0.15}
          metalness={0.25}
          speed={2.2}
        />
      </mesh>

      {/* invisible raycast proxy — keeps pointermove cheap */}
      <mesh
        visible={false}
        onPointerOver={() => (hovered.current = true)}
        onPointerOut={() => (hovered.current = false)}
      >
        <sphereGeometry args={[2.1, 12, 12]} />
        <meshBasicMaterial />
      </mesh>

      <mesh ref={satA}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={SECTIONS[4].glow}
          emissive={SECTIONS[4].glow}
          emissiveIntensity={1.6}
          flatShading
        />
      </mesh>
      <mesh ref={satB}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={SECTIONS[4].accent}
          emissiveIntensity={1.2}
          flatShading
        />
      </mesh>

      <Glow color={SECTIONS[4].accent} scale={8} opacity={0.4} />
      <Glow color={SECTIONS[4].glow} scale={13} opacity={0.14} />
      <pointLight color={SECTIONS[4].glow} intensity={120} distance={30} position={[3, 3, 4]} />
      <pointLight color="#00e5ff" intensity={50} distance={25} position={[-4, -2, 2]} />
    </group>
  );
}
