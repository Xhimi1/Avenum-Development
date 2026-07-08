'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { buildCameraCurve } from '@/lib/path';
import { SECTIONS } from '@/lib/palette';
import { useStore } from '@/lib/store';

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute vec3 aColor;
  attribute float aScale;
  attribute float aPhase;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.25 + aPhase) * 0.6;
    p.y += cos(uTime * 0.2 + aPhase * 1.7) * 0.6;
    p.z += sin(uTime * 0.15 + aPhase * 2.3) * 0.6;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = min(uSize * aScale / max(-mv.z, 0.1), 60.0);
    gl_Position = projectionMatrix * mv;

    vColor = aColor;
    vFade = smoothstep(45.0, 12.0, -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * 0.75 * vFade;
    gl_FragColor = vec4(vColor * a, a);
    #include <colorspace_fragment>
  }
`;

/**
 * Additive point field scattered along the whole camera path, colored by the
 * palette of whichever section each point drifts near. The group shifts with
 * the pointer for a parallax layer independent of the camera.
 */
export default function Particles() {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const quality = useStore((s) => s.quality);
  const count = quality === 'low' ? 180 : 500;

  const { positions, colors, scales, phases } = useMemo(() => {
    const curve = buildCameraCurve();
    const accents = SECTIONS.map((s) => new THREE.Color(s.accent));
    const glows = SECTIONS.map((s) => new THREE.Color(s.glow));

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);

    const point = new THREE.Vector3();
    const offset = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      curve.getPoint(u, point);
      offset
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(2.5 + Math.random() * 9.5);
      point.add(offset);
      positions.set([point.x, point.y, point.z], i * 3);

      const t = u * (SECTIONS.length - 1);
      const si = Math.floor(Math.min(t, SECTIONS.length - 2));
      const source = Math.random() > 0.5 ? accents : glows;
      color.copy(source[si]).lerp(source[si + 1], t - si);
      colors.set([color.r, color.g, color.b], i * 3);

      scales[i] = 0.5 + Math.random() * 1.1;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, scales, phases };
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uSize: { value: 60 } }),
    []
  );

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.uSize.value = 60 * state.viewport.dpr;
    }
    if (group.current && !useStore.getState().reducedMotion) {
      const { damp } = THREE.MathUtils;
      group.current.position.x = damp(group.current.position.x, state.pointer.x * 1.1, 2.5, delta);
      group.current.position.y = damp(group.current.position.y, state.pointer.y * 0.7, 2.5, delta);
    }
  });

  return (
    <group ref={group}>
      <points key={count} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={VERTEX}
          fragmentShader={FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
