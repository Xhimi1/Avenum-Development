'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Glow from '@/components/canvas/Glow';

const CYAN = '#00e5ff';
const ACCENT = '#4d6bff';

/** Desktop/mobile core radius — everything else (rings, dots, glow) scales off it. */
const R_DESKTOP = 1.05;
const R_MOBILE = 0.75;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uDistort;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;

  float wave(vec3 p, float t) {
    return sin(p.x * 2.3 + t) * sin(p.y * 2.1 + t * 1.3) * sin(p.z * 2.6 + t * 0.7);
  }

  void main() {
    vec3 p = position;
    float n = wave(normalize(position) * 2.6, uTime);
    p += normal * n * uDistort;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(-mv.xyz);
    vPos = position;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying vec3 vPos;

  void main() {
    vec3 n = normalize(vPos);
    float angle = uTime * 0.12;
    float c = cos(angle);
    float s = sin(angle);
    float raw = n.y * c - n.x * s;
    float mixer = sin(raw * 2.6);

    vec3 col = mix(uColorA, uColorB, smoothstep(-0.55, 0.15, mixer));
    col = mix(col, uColorC, smoothstep(0.05, 0.6, sin((raw + n.z * 0.5) * 2.6)) * 0.65);

    float fres = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 2.2);
    col += fres * 0.5;

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/**
 * The chatbot page's hero object: a shifting multicolor (blue → teal →
 * amber, deliberately not the usual purple/pink AI gradient) distorted core
 * orbited by two thin rings carrying glowing message dots — data circling
 * the brain. The whole cluster tilts toward the cursor.
 */
function Orb({ x, y, R, isDesktop }: { x: number; y: number; R: number; isDesktop: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const dots = useRef<Array<THREE.Mesh | null>>([]);
  const ringRadiusA = R * 1.6;
  const ringRadiusB = R * 2.0;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uDistort: { value: R * 0.22 },
          uColorA: { value: new THREE.Color('#1c3fae') },
          uColorB: { value: new THREE.Color('#00d9a3') },
          uColorC: { value: new THREE.Color('#ffb84d') },
        },
      }),
    [R]
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { damp } = THREE.MathUtils;
    const t = state.clock.elapsedTime;
    material.uniforms.uTime.value = t;

    // tilt toward the cursor
    g.rotation.x = damp(g.rotation.x, state.pointer.y * 0.25, 3, delta);
    g.rotation.y = damp(g.rotation.y, state.pointer.x * 0.35, 3, delta);

    if (ringA.current) {
      ringA.current.rotation.x = 1.15 + Math.sin(t * 0.3) * 0.1;
      ringA.current.rotation.y = t * 0.28;
    }
    if (ringB.current) {
      ringB.current.rotation.x = -0.85 + Math.cos(t * 0.25) * 0.1;
      ringB.current.rotation.y = -t * 0.2;
    }

    // message dots circle ring A's plane
    dots.current.forEach((d, i) => {
      if (!d) return;
      const a = t * 0.8 + i * 2.1;
      d.position.set(Math.cos(a) * ringRadiusA, Math.sin(a) * ringRadiusA, 0);
    });
  });

  return (
    <group ref={group} position={[x, y, 0]}>
      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.9}>
        <mesh material={material}>
          <sphereGeometry args={[R, 96, 96]} />
        </mesh>
      </Float>

      <group ref={ringA}>
        <mesh>
          <torusGeometry args={[ringRadiusA, R * 0.015, 8, 96]} />
          <meshBasicMaterial
            color={CYAN}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              dots.current[i] = el;
            }}
          >
            <sphereGeometry args={[R * 0.05, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      <group ref={ringB}>
        <mesh>
          <torusGeometry args={[ringRadiusB, R * 0.011, 8, 96]} />
          <meshBasicMaterial
            color={ACCENT}
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {isDesktop ? (
        <>
          <Glow color={ACCENT} scale={R * 5.6} opacity={0.35} />
          <Glow color={CYAN} scale={R * 9} opacity={0.12} />
        </>
      ) : (
        <Glow color={ACCENT} scale={R * 2.4} opacity={0.1} />
      )}
      <pointLight color={CYAN} intensity={110} distance={26} position={[3, 3, 4]} />
      <pointLight color={ACCENT} intensity={50} distance={22} position={[-4, -2, 2]} />
    </group>
  );
}

export default function AssistantOrb() {
  const isDesktop = useIsDesktop();
  const R = isDesktop ? R_DESKTOP : R_MOBILE;
  return (
    <div className="absolute inset-x-0 top-0 h-dvh" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 7.5] }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <Orb x={isDesktop ? 2.4 : 0} y={isDesktop ? 0 : -1.8} R={R} isDesktop={isDesktop} />
      </Canvas>
    </div>
  );
}
