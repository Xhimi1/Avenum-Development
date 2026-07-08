'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { buildCameraCurve } from '@/lib/path';
import { SECTIONS } from '@/lib/palette';
import { useStore } from '@/lib/store';

interface ShardData {
  base: THREE.Vector3;
  u: number;
  speed: number;
  phase: number;
  amp: number;
  scale: number;
}

/**
 * Instanced tetrahedra drifting near the camera path — tactile debris that
 * catches each section's colored lights as the camera flies past.
 */
export default function Shards() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const quality = useStore((s) => s.quality);
  const count = quality === 'low' ? 18 : 45;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const shards = useMemo<ShardData[]>(() => {
    const curve = buildCameraCurve();
    const point = new THREE.Vector3();
    const offset = new THREE.Vector3();
    return Array.from({ length: count }, () => {
      const u = Math.random();
      curve.getPoint(u, point);
      offset
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(2 + Math.random() * 6);
      return {
        base: point.clone().add(offset),
        u,
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        amp: 0.3 + Math.random() * 0.7,
        scale: 0.045 + Math.random() * 0.075,
      };
    });
  }, [count]);

  // tint each shard toward the accent of the section it floats near
  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const accents = SECTIONS.map((s) => new THREE.Color(s.accent));
    const color = new THREE.Color();
    shards.forEach((s, i) => {
      const t = s.u * (SECTIONS.length - 1);
      const si = Math.floor(Math.min(t, SECTIONS.length - 2));
      color.copy(accents[si]).lerp(accents[si + 1], t - si).lerp(new THREE.Color('#ffffff'), 0.35);
      m.setColorAt(i, color);
    });
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [shards]);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    shards.forEach((s, i) => {
      dummy.position.copy(s.base);
      dummy.position.y += Math.sin(t * s.speed + s.phase) * s.amp;
      dummy.position.x += Math.cos(t * s.speed * 0.7 + s.phase) * s.amp * 0.5;
      dummy.rotation.set(t * s.speed * 1.4 + s.phase, t * s.speed + s.phase * 2, 0);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      key={count}
      args={[undefined, undefined, count] as unknown as [THREE.BufferGeometry, THREE.Material, number]}
      frustumCulled={false}
    >
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial metalness={0.5} roughness={0.3} flatShading />
    </instancedMesh>
  );
}
