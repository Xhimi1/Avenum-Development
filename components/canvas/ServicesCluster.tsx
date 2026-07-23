'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import Glow from './Glow';
import { CENTERS, CAM_POINTS } from '@/lib/path';
import { presence } from '@/lib/scroll';

/** Card copy is left-aligned on desktop, so the cluster shifts screen-right to clear it. */
const DESKTOP_QUERY = '(min-width: 1024px)';
const DESKTOP_SHIFT = 4.2;

/** Brand-logo purple — the two shapes stand in for the logo's triangle + circle. */
const BRAND_PURPLE = '#6367FF';
const BRAND_PURPLE_DEEP = '#4f52e0';

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

/** Shared float + hover behavior: hovering swells the shape and brightens its glow. */
function useHoverShape(swell: number, spin: number) {
  const mesh = useRef<THREE.Mesh>(null);
  const hovered = useRef(false);
  const scale = useRef(1);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    const { damp } = THREE.MathUtils;
    const h = hovered.current ? 1 : 0;
    scale.current = damp(scale.current, 1 + h * swell, 5, delta);
    m.scale.setScalar(scale.current);
    m.rotation.x += delta * (0.2 + h * 0.7);
    m.rotation.y += delta * (0.3 + h * spin);
  });

  const handlers = {
    onPointerOver: (e: THREE.Event) => {
      (e as unknown as { stopPropagation: () => void }).stopPropagation();
      hovered.current = true;
    },
    onPointerOut: () => {
      hovered.current = false;
    },
  };

  return { mesh, hovered, handlers };
}

/** The "circle" of the logo — the distorted core reused from the About orbit, in brand purple. */
function CoreSphere({ position }: { position: [number, number, number] }) {
  const { mesh, hovered, handlers } = useHoverShape(0.25, 0.9);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (!mat.current) return;
    const h = hovered.current ? 1 : 0;
    mat.current.emissiveIntensity = THREE.MathUtils.damp(
      mat.current.emissiveIntensity,
      0.5 + h * 1.6,
      5,
      delta
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={mesh} position={position} {...handlers}>
        <icosahedronGeometry args={[0.95, 5]} />
        <MeshDistortMaterial
          ref={mat as never}
          color={BRAND_PURPLE}
          emissive={BRAND_PURPLE_DEEP}
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.4}
          distort={0.28}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

/** The "triangle" of the logo — a shiny purple pyramid. */
function Pyramid({ position }: { position: [number, number, number] }) {
  const { mesh, hovered, handlers } = useHoverShape(0.3, 1.1);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (!mat.current) return;
    const h = hovered.current ? 1 : 0;
    mat.current.emissiveIntensity = THREE.MathUtils.damp(
      mat.current.emissiveIntensity,
      0.5 + h * 1.8,
      5,
      delta
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} {...handlers}>
        <tetrahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial
          ref={mat}
          color={BRAND_PURPLE}
          emissive={BRAND_PURPLE}
          emissiveIntensity={0.5}
          metalness={0.4}
          roughness={0.2}
          flatShading
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
      {/* triangle + circle of the brand logo, alternating so no two of the
          same shape sit on the same side */}
      <Pyramid position={[-2.6, 1.5, 0.3]} /> {/* top-left */}
      <CoreSphere position={[2.5, 1.7, -0.4]} /> {/* top-right */}
      <CoreSphere position={[-2.0, -1.7, -0.3]} /> {/* bottom-left */}
      <Pyramid position={[2.2, -1.5, 0.4]} /> {/* bottom-right */}

      <Glow color={BRAND_PURPLE} scale={11} opacity={0.3} />
      <pointLight color={BRAND_PURPLE} intensity={140} distance={28} position={[0, 2, 4]} />
      <pointLight color={BRAND_PURPLE_DEEP} intensity={60} distance={22} position={[-3, -2, 2]} />
    </group>
  );
}
