'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import CameraRig from './CameraRig';
import Atmosphere from './Atmosphere';
import HeroBlob from './HeroBlob';
import ServicesCluster from './ServicesCluster';
import WorkGallery from './WorkGallery';
import AboutOrbit from './AboutOrbit';
import Globe from './Globe';
import Particles from './Particles';
import Shards from './Shards';
import { useStore } from '@/lib/store';
import { CAM_POINTS } from '@/lib/path';

/**
 * The fixed full-viewport WebGL world behind the DOM. Every section of the
 * page is a location in this scene; the camera travels between them on scroll.
 */
export default function Scene() {
  const quality = useStore((s) => s.quality);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    setDpr(quality === 'low' ? 1.5 : Math.min(window.devicePixelRatio, 2));
  }, [quality]);

  return (
    <div className="webgl-wrap fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={dpr}
        camera={{ fov: 50, near: 0.1, far: 90, position: CAM_POINTS[0] }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() =>
            setDpr(quality === 'low' ? 1.5 : Math.min(window.devicePixelRatio, 2))
          }
        >
          <Atmosphere />
          <CameraRig />
          <HeroBlob />
          <ServicesCluster />
          <WorkGallery />
          <AboutOrbit />
          <Globe />
          <Particles />
          <Shards />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
