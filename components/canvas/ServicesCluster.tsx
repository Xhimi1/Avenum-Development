'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Glow from './Glow';
import { CENTERS, CAM_POINTS } from '@/lib/path';
import { presence } from '@/lib/scroll';
import { SECTIONS } from '@/lib/palette';

/** Card copy is left-aligned on desktop, so the cluster shifts screen-right to clear it. */
const DESKTOP_QUERY = '(min-width: 1024px)';
const DESKTOP_SHIFT = 4.2;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

interface ShapeDef {
  kind: 'torusKnot' | 'icosahedron' | 'octahedron' | 'torus';
  position: [number, number, number];
  color: string;
}

/** One floating shape per service — hover makes it swell, glow and spin faster. */
const SHAPES: ShapeDef[] = [
  { kind: 'torusKnot', position: [-2.0, 1.0, 0.3], color: '#ff2da6' },
  { kind: 'icosahedron', position: [1.7, 1.4, -0.7], color: '#ff5acf' },
  { kind: 'octahedron', position: [2.0, -1.0, 0.5], color: '#d948ff' },
  { kind: 'torus', position: [-1.5, -1.3, -0.3], color: '#ff2d6b' },
];

function ShapeGeometry({ kind }: { kind: ShapeDef['kind'] }) {
  switch (kind) {
    case 'torusKnot':
      return <torusKnotGeometry args={[0.55, 0.2, 110, 20]} />;
    case 'icosahedron':
      return <icosahedronGeometry args={[0.7, 0]} />;
    case 'octahedron':
      return <octahedronGeometry args={[0.75, 0]} />;
    case 'torus':
      return <torusGeometry args={[0.58, 0.22, 20, 56]} />;
  }
}

function Shape({ def }: { def: ShapeDef }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const hovered = useRef(false);
  const scale = useRef(1);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    const { damp } = THREE.MathUtils;
    const h = hovered.current ? 1 : 0;
    scale.current = damp(scale.current, 1 + h * 0.3, 5, delta);
    m.scale.setScalar(scale.current);
    m.rotation.x += delta * (0.25 + h * 0.9);
    m.rotation.y += delta * (0.35 + h * 1.1);
    if (mat.current) {
      mat.current.emissiveIntensity = damp(mat.current.emissiveIntensity, 0.5 + h * 1.8, 5, delta);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh
        ref={mesh}
        position={def.position}
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
        }}
        onPointerOut={() => (hovered.current = false)}
      >
        <ShapeGeometry kind={def.kind} />
        <meshStandardMaterial
          ref={mat}
          color={def.color}
          emissive={def.color}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
          flatShading={def.kind === 'icosahedron' || def.kind === 'octahedron'}
        />
      </mesh>
    </Float>
  );
}

export default function ServicesCluster() {
  const group = useRef<THREE.Group>(null);
  const scale = useRef(0);
  const isDesktop = useIsDesktop();

  const position = useMemo(() => {
    const p = new THREE.Vector3(...CENTERS.services);
    if (!isDesktop) return p;
    const backward = new THREE.Vector3(...CAM_POINTS[1]).sub(p).normalize();
    const right = new THREE.Vector3(0, 1, 0).cross(backward).normalize();
    return p.add(right.multiplyScalar(DESKTOP_SHIFT));
  }, [isDesktop]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = presence(1);
    g.visible = p > 0.02;
    if (!g.visible) return;
    scale.current = THREE.MathUtils.damp(scale.current, p, 4, delta);
    g.scale.setScalar(Math.max(scale.current, 0.0001));
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <group ref={group} position={position}>
      {SHAPES.map((def) => (
        <Shape key={def.kind} def={def} />
      ))}
      <Glow color={SECTIONS[1].accent} scale={9} opacity={0.28} />
      <pointLight color={SECTIONS[1].accent} intensity={140} distance={28} position={[0, 2, 4]} />
      <pointLight color={SECTIONS[1].glow} intensity={60} distance={22} position={[-3, -2, 2]} />
    </group>
  );
}
