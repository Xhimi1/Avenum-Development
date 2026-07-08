'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { CENTERS } from '@/lib/path';
import { presence, sectionLocal } from '@/lib/scroll';
import { useStore } from '@/lib/store';
import { clamp, smoothstep01 } from '@/lib/utils';

/** Oversized on purpose: only the upper cap of the globe is in frame at rest. */
const R_DESKTOP = 7.2;
const R_MOBILE = 5.2;

/** Index into SECTIONS/CAM_POINTS — the globe now lives at hero. */
const HERO_INDEX = 0;

/** Scroll window (0..1 of hero's pinned range) the peek→reveal happens over. */
const REVEAL_START = 0.15;
const REVEAL_END = 0.65;
/** Shrink applied at full reveal so the whole sphere clears the frame. */
const REVEAL_SCALE = 0.62;

const CYAN = '#00e5ff';

const MOBILE_QUERY = '(max-width: 820px)';

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

/** Equirectangular land/ocean mask (water bright, land dark). jsDelivr serves
 *  it with permissive CORS so we can read its pixels for the halftone dots. */
const EARTH_MAP =
  'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-water.png';

let cachedEarth: HTMLImageElement | null = null;

/** lat/lon (degrees) → unit vector. lon 0 faces the camera (+z), east right. */
function toUnit(lat: number, lon: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(lat);
  const th = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    Math.cos(phi) * Math.sin(th),
    Math.sin(phi),
    Math.cos(phi) * Math.cos(th)
  );
}

/** Studio + client hubs the connection arcs travel between. */
const HUBS: Record<string, [number, number]> = {
  tirana: [41.33, 19.82],
  berlin: [52.52, 13.4],
  london: [51.51, -0.12],
  newYork: [40.71, -74.01],
  dubai: [25.2, 55.27],
  singapore: [1.35, 103.82],
  tokyo: [35.68, 139.69],
};

const ROUTES: [string, string][] = [
  ['tirana', 'berlin'],
  ['tirana', 'london'],
  ['berlin', 'newYork'],
  ['tirana', 'dubai'],
  ['dubai', 'singapore'],
  ['singapore', 'tokyo'],
];

/** Soft round sprite shared by the halftone dots and dust. */
let cachedDot: THREE.CanvasTexture | null = null;
function dotTexture(): THREE.CanvasTexture {
  if (cachedDot) return cachedDot;
  const s = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  cachedDot = new THREE.CanvasTexture(canvas);
  return cachedDot;
}

/** Halftone the land mask into Fibonacci-distributed on-sphere dots. */
function sampleLandDots(img: HTMLImageElement, count: number, R: number) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const golden = Math.PI * (3 - Math.sqrt(5));
  const pos: number[] = [];
  const rDot = R * 1.012; // float dots just above the surface

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    const x = Math.cos(th) * r;
    const z = Math.sin(th) * r;
    const lat = Math.asin(y);
    const lon = Math.atan2(x, z);
    const px = Math.min(canvas.width - 1, Math.floor((lon / (Math.PI * 2) + 0.5) * canvas.width));
    const py = Math.min(canvas.height - 1, Math.floor((0.5 - lat / Math.PI) * canvas.height));
    // mask is bright water / dark land — keep only land samples
    if (data[(py * canvas.width + px) * 4] < 128) {
      pos.push(x * rDot, y * rDot, z * rDot);
    }
  }
  return new Float32Array(pos);
}

/** Lat/lon grid — parallels and meridians, like the Cloudflare reference's
 *  globe wireframe (full pole-to-pole coverage, fairly dense). */
function buildGraticule(R: number): THREE.BufferGeometry {
  const pts: number[] = [];
  const seg = 96;
  const rG = R * 1.004;
  // parallels, pole to pole
  for (let lat = -80; lat <= 80; lat += 10) {
    const phi = THREE.MathUtils.degToRad(lat);
    const r = rG * Math.cos(phi);
    const y = rG * Math.sin(phi);
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      const b = ((i + 1) / seg) * Math.PI * 2;
      pts.push(Math.sin(a) * r, y, Math.cos(a) * r, Math.sin(b) * r, y, Math.cos(b) * r);
    }
  }
  // meridians, full circles pole to pole
  for (let lon = 0; lon < 360; lon += 15) {
    const th = THREE.MathUtils.degToRad(lon);
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI - Math.PI / 2;
      const b = ((i + 1) / seg) * Math.PI - Math.PI / 2;
      pts.push(
        Math.sin(th) * rG * Math.cos(a), rG * Math.sin(a), Math.cos(th) * rG * Math.cos(a),
        Math.sin(th) * rG * Math.cos(b), rG * Math.sin(b), Math.cos(th) * rG * Math.cos(b)
      );
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
  return g;
}

const VERTEX = /* glsl */ `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  void main() {
    gl_FragColor = vec4(uBase, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/**
 * The hero's data-globe: dark sphere, faint graticule, continents halftoned
 * into glowing dots (sampled from a real Earth mask), and animated connection
 * arcs with traveling pulses between studio/client hubs. It starts peeking up
 * from under the CTA button, cropped and close to camera; scrolling through
 * hero's pinned range recedes and centers it into full view while a quote
 * fades in, then hero unpins and the page continues normally. Drag to spin it
 * with inertia at any point; it also auto-rotates slowly.
 */
export default function Globe() {
  const group = useRef<THREE.Group>(null); // presence scale-in
  const globe = useRef<THREE.Group>(null); // user + auto rotation
  const stars = useRef<THREE.Group>(null);
  const pulseRefs = useRef<Array<THREE.Mesh | null>>([]);
  const scale = useRef(0);
  const spin = useRef({ x: 0, y: 0 }); // extra angular velocity from dragging
  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });

  const quality = useStore((s) => s.quality);
  const isMobile = useIsMobile();
  const R = isMobile ? R_MOBILE : R_DESKTOP;
  const dotCount = quality === 'low' ? 16000 : 42000;
  const starCount = quality === 'low' ? 260 : 600;

  const [dots, setDots] = useState<Float32Array | null>(null);

  // Load the Earth mask once, then halftone it into land dots.
  useEffect(() => {
    let cancelled = false;
    const apply = (img: HTMLImageElement) => {
      if (!cancelled) setDots(sampleLandDots(img, dotCount, R));
    };
    if (cachedEarth) {
      apply(cachedEarth);
    } else {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        cachedEarth = img;
        apply(img);
      };
      img.src = EARTH_MAP;
    }
    return () => {
      cancelled = true;
    };
  }, [dotCount, R]);

  // Graticule + connection arcs (rebuilt only when R flips breakpoints).
  const { wires, curves } = useMemo(() => {
    const wires = new THREE.Group();
    wires.add(
      new THREE.LineSegments(
        buildGraticule(R),
        new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.16 })
      )
    );
    const curves = ROUTES.map(([a, b]) => {
      const va = toUnit(HUBS[a][0], HUBS[a][1]).multiplyScalar(R * 1.015);
      const vb = toUnit(HUBS[b][0], HUBS[b][1]).multiplyScalar(R * 1.015);
      const lift = va.distanceTo(vb) * 0.3;
      const mid = va.clone().add(vb).normalize().multiplyScalar(R + lift);
      const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
      wires.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)),
          new THREE.LineBasicMaterial({
            color: CYAN,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        )
      );
      return curve;
    });
    return { wires, curves };
  }, [R]);

  useEffect(
    () => () => {
      wires.traverse((o) => {
        if (o instanceof THREE.Line || o instanceof THREE.LineSegments) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
    },
    [wires]
  );

  const markers = useMemo(
    () => Object.values(HUBS).map(([la, lo]) => toUnit(la, lo).multiplyScalar(R * 1.015)),
    [R]
  );

  const { starPositions, starColors } = useMemo(() => {
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const dir = new THREE.Vector3();
    const c = new THREE.Color();
    for (let i = 0; i < starCount; i++) {
      dir
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(R * (1.15 + Math.random() * 1.6));
      starPositions.set([dir.x, dir.y, dir.z], i * 3);
      const brightness = 0.35 + Math.random() * 0.65;
      c.setScalar(brightness);
      starColors.set([c.r, c.g, c.b], i * 3);
    }
    return { starPositions, starColors };
  }, [starCount, R]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uBase: { value: new THREE.Color('#05070f') },
        },
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      spin.current.y += (e.clientX - prev.current.x) * 0.0003;
      spin.current.x += (e.clientY - prev.current.y) * 0.0003;
      prev.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dragging.current = true;
    prev.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
  };

  // Peek state: sunk low and pulled toward the camera, so only a cropped cap
  // rises from under the CTA button. Reveal state: centered and pulled back
  // far enough that the whole sphere fits in frame.
  const { peek, reveal } = useMemo(() => {
    const peek = isMobile
      ? new THREE.Vector3(CENTERS.hero[0], CENTERS.hero[1] - 6, CENTERS.hero[2] + 3.4)
      : new THREE.Vector3(CENTERS.hero[0], CENTERS.hero[1] - 9, CENTERS.hero[2] + 4);
    const reveal = isMobile
      ? new THREE.Vector3(CENTERS.hero[0], CENTERS.hero[1], CENTERS.hero[2] - 6)
      : new THREE.Vector3(CENTERS.hero[0], CENTERS.hero[1] + 1.2, CENTERS.hero[2] - 7);
    return { peek, reveal };
  }, [isMobile]);

  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = presence(HERO_INDEX);
    g.visible = p > 0.02;
    if (!g.visible) return;

    const { damp, lerp } = THREE.MathUtils;
    scale.current = damp(scale.current, p, 4, delta);

    // scrolling through hero's pinned range recedes the globe into full view,
    // shrinking it a little so the whole sphere clears the frame with margin
    const revealT = smoothstep01(
      (sectionLocal(HERO_INDEX) - REVEAL_START) / (REVEAL_END - REVEAL_START)
    );
    const revealScale = lerp(1, REVEAL_SCALE, revealT);
    g.scale.setScalar(Math.max(scale.current, 0.0001) * revealScale);

    target.lerpVectors(peek, reveal, revealT);
    g.position.x = damp(g.position.x, target.x, 3, delta);
    g.position.y = damp(g.position.y, target.y, 3, delta);
    g.position.z = damp(g.position.z, target.z, 3, delta);

    const reduced = useStore.getState().reducedMotion;
    const t = state.clock.elapsedTime;
    const gl = globe.current;
    if (gl) {
      // slow, real-globe rotation; drag adds responsive inertia
      const auto = dragging.current || reduced ? 0 : 0.05;
      gl.rotation.y += auto * delta + spin.current.y * delta * 60;
      gl.rotation.x = clamp(gl.rotation.x + spin.current.x * delta * 60, -0.5, 0.5);
      spin.current.y = damp(spin.current.y, 0, 2.5, delta);
      spin.current.x = damp(spin.current.x, 0, 2.5, delta);
    }

    // pulses travel their arcs on offset phases
    curves.forEach((curve, i) => {
      const m = pulseRefs.current[i];
      if (m) curve.getPoint(reduced ? 0.5 : (t * 0.1 + i * 0.37) % 1, m.position);
    });

    if (stars.current && !reduced) stars.current.rotation.y -= delta * 0.015;
  });

  return (
    <group ref={group} position={peek}>
      <group ref={globe}>
        {/* dark body — occludes back-side dots, arcs and grid */}
        <mesh material={material} onPointerDown={onPointerDown}>
          <sphereGeometry args={[R * 0.995, 96, 96]} />
        </mesh>

        {/* halftone continents */}
        {dots && (
          <points key={`${R}-${dots.length}`} frustumCulled={false}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dots, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={R * 0.022}
              map={dotTexture()}
              color={CYAN}
              transparent
              depthWrite={false}
              sizeAttenuation
              blending={THREE.AdditiveBlending}
            />
          </points>
        )}

        {/* graticule + connection arcs */}
        <primitive object={wires} />

        {/* hub markers */}
        {markers.map((v, i) => (
          <mesh key={i} position={[v.x, v.y, v.z]}>
            <sphereGeometry args={[R * 0.011, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}

        {/* traveling pulses along the arcs */}
        {curves.map((_, i) => (
          <mesh
            key={i}
            ref={(m) => {
              pulseRefs.current[i] = m;
            }}
          >
            <sphereGeometry args={[R * 0.009, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* stars scattered around the globe */}
      <group ref={stars}>
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            map={dotTexture()}
            vertexColors
            transparent
            depthWrite={false}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
