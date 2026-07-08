'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { buildCameraCurve, LOOK_POINTS } from '@/lib/path';
import { cameraT, presence, scrollState } from '@/lib/scroll';
import { useStore } from '@/lib/store';
import { clamp, smoothstep01 } from '@/lib/utils';

/**
 * Flies the camera along a Catmull-Rom curve through the section waypoints.
 * Scroll drives the path parameter; pointer adds parallax; scroll velocity
 * adds a subtle roll and FOV kick so fast travel feels fast.
 */
export default function CameraRig() {
  const curve = useMemo(buildCameraCurve, []);
  const looks = useMemo(
    () => LOOK_POINTS.map((p) => new THREE.Vector3(...p)),
    []
  );

  const smoothPos = useRef(new THREE.Vector3().copy(curve.getPoint(0)));
  const smoothLook = useRef(looks[0].clone());
  const parallax = useRef({ x: 0, y: 0 });
  const roll = useRef(0);
  const fov = useRef(50);

  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const { damp } = THREE.MathUtils;
    const last = looks.length - 1;

    // damp the path parameter itself so everything reading it stays smooth
    scrollState.t = damp(scrollState.t, cameraT(scrollState.y), 5, delta);
    const t = scrollState.t;

    curve.getPoint(t / last, targetPos);
    const i = Math.floor(Math.min(t, last - 1e-4));
    targetLook.lerpVectors(looks[i], looks[Math.min(i + 1, last)], smoothstep01(t - i));

    const p = smoothPos.current;
    const l = smoothLook.current;
    p.x = damp(p.x, targetPos.x, 4.2, delta);
    p.y = damp(p.y, targetPos.y, 4.2, delta);
    p.z = damp(p.z, targetPos.z, 4.2, delta);
    l.x = damp(l.x, targetLook.x, 4, delta);
    l.y = damp(l.y, targetLook.y, 4, delta);
    l.z = damp(l.z, targetLook.z, 4, delta);

    cam.position.copy(p);
    cam.lookAt(l);

    // narrow screens crop the horizontal FOV — pull back so locations fit
    const aspect = state.size.width / state.size.height;
    if (aspect < 0.8) cam.translateZ(2.4);
    else if (aspect < 1.1) cam.translateZ(1.2);

    if (useStore.getState().reducedMotion) return;

    // pointer parallax (applied as a post-lookAt rotation) — faded out near
    // the hero so it doesn't fight the globe's own drag-to-spin interaction
    const parallaxStrength = 1 - presence(0, t);
    parallax.current.x = damp(parallax.current.x, state.pointer.x, 4, delta);
    parallax.current.y = damp(parallax.current.y, state.pointer.y, 4, delta);
    cam.rotation.y -= parallax.current.x * 0.035 * parallaxStrength;
    cam.rotation.x += parallax.current.y * 0.025 * parallaxStrength;

    // velocity roll + FOV kick
    roll.current = damp(
      roll.current,
      clamp(-scrollState.velocity * 0.0008, -0.05, 0.05),
      3,
      delta
    );
    cam.rotateZ(roll.current);

    const targetFov = 50 + clamp(Math.abs(scrollState.velocity) * 0.05, 0, 8);
    fov.current = damp(fov.current, targetFov, 3, delta);
    if (Math.abs(cam.fov - fov.current) > 0.01) {
      cam.fov = fov.current;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
