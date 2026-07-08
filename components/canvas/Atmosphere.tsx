'use client';

import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { SECTIONS } from '@/lib/palette';
import { scrollState } from '@/lib/scroll';
import { useStore } from '@/lib/store';

/**
 * Blends scene background + fog between section palettes as the camera
 * travels, and provides the base lighting. Local colored lights live with
 * each section's objects.
 */
export default function Atmosphere() {
  const scene = useThree((s) => s.scene);
  const quality = useStore((s) => s.quality);

  const bgColor = useMemo(() => new THREE.Color(SECTIONS[0].bg), []);
  const palette = useMemo(
    () => SECTIONS.map((s) => new THREE.Color(s.bg)),
    []
  );

  useEffect(() => {
    scene.background = bgColor;
    const fog = new THREE.FogExp2('#000000', quality === 'low' ? 0.05 : 0.042);
    fog.color = bgColor; // share the instance so the lerp drives both
    scene.fog = fog;
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [scene, bgColor, quality]);

  useFrame(() => {
    const t = scrollState.t;
    const i = Math.floor(Math.min(t, palette.length - 1 - 1e-4));
    bgColor.copy(palette[i]).lerp(palette[Math.min(i + 1, palette.length - 1)], t - i);
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 10, 8]} intensity={1.6} />
    </>
  );
}
