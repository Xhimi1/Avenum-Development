'use client';

import * as THREE from 'three';

let cachedTexture: THREE.CanvasTexture | null = null;

/** Procedural radial-gradient sprite texture (no asset downloads). */
function glowTexture(): THREE.CanvasTexture {
  if (cachedTexture) return cachedTexture;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  cachedTexture = new THREE.CanvasTexture(canvas);
  return cachedTexture;
}

interface GlowProps {
  color?: string;
  scale?: number;
  opacity?: number;
  position?: [number, number, number];
}

/** Additive halo sprite — cheap bloom stand-in that keeps the frame budget. */
export default function Glow({
  color = '#ffffff',
  scale = 6,
  opacity = 0.5,
  position = [0, 0, 0],
}: GlowProps) {
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial
        map={glowTexture()}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}
