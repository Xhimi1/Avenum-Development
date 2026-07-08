'use client';

import { Suspense, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import Glow from './Glow';
import './materials/GradientMaterial';
import type { GradientMaterialImpl } from './materials/GradientMaterial';
import { CENTERS, CAM_POINTS } from '@/lib/path';
import { presence, scrollState, sectionLocal } from '@/lib/scroll';
import { PROJECTS } from '@/lib/projects';
import { SECTIONS } from '@/lib/palette';
import { useStore } from '@/lib/store';
import { clamp } from '@/lib/utils';

const WORK_INDEX = 2;
const RADIUS = 3.4;
const STEP = (Math.PI * 2) / PROJECTS.length;
/** Lifts the carousel clear of the white content card anchored at the bottom. */
const GALLERY_Y_OFFSET = 1.7;
/** Panel plane's own width/height ratio — used to cover-fit each photo. */
const PLANE_ASPECT = 3.4 / 2.15;

useTexture.preload(PROJECTS.map((p) => p.image));

interface PanelsProps {
  materials: MutableRefObject<Array<GradientMaterialImpl | null>>;
  hoveredIdx: MutableRefObject<number>;
  panelSegments: number;
}

/**
 * Loads the front-face photos and renders the panel meshes. Split out so
 * only this piece suspends on `useTexture` — the rest of WorkGallery (and
 * the whole Scene, since this component never unmounts) keeps rendering
 * while the images are still downloading.
 */
function Panels({ materials, hoveredIdx, panelSegments }: PanelsProps) {
  const textures = useTexture(PROJECTS.map((p) => p.image));

  const coverScales = useMemo(
    () =>
      textures.map((t) => {
        const imgAspect = t.image.width / t.image.height;
        return imgAspect > PLANE_ASPECT
          ? new THREE.Vector2(PLANE_ASPECT / imgAspect, 1)
          : new THREE.Vector2(1, imgAspect / PLANE_ASPECT);
      }),
    [textures]
  );

  return (
    <>
      {PROJECTS.map((project, i) => {
        const angle = i * STEP;
        return (
          <mesh
            key={project.name}
            position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
            rotation={[0, angle, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              hoveredIdx.current = i;
            }}
            onPointerOut={() => (hoveredIdx.current = -1)}
          >
            <planeGeometry args={[3.4, 2.15, panelSegments, panelSegments]} />
            <gradientMaterial
              ref={(m: GradientMaterialImpl | null) => {
                materials.current[i] = m;
              }}
              uColorA={new THREE.Color(project.colorA)}
              uColorB={new THREE.Color(project.colorB)}
              uMap={textures[i]}
              uHasMap={1}
              uCoverScale={coverScales[i]}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </>
  );
}

/**
 * Interactive 3D showcase: gradient-shader panels arranged in a carousel
 * around the section center. Scrolling through the pinned section rotates
 * the carousel; the panel facing the camera becomes the active project
 * (mirrored to the store for the DOM overlay). Hover warps + brightens.
 */
export default function WorkGallery() {
  const group = useRef<THREE.Group>(null);
  const carousel = useRef<THREE.Group>(null);
  const materials = useRef<Array<GradientMaterialImpl | null>>([]);
  const hoveredIdx = useRef(-1);
  const scale = useRef(0);

  // yaw at which a panel faces the camera (horizontal center->camera direction)
  const facingPhase = useMemo(() => {
    const c = CENTERS.work;
    const cam = CAM_POINTS[WORK_INDEX];
    return Math.atan2(cam[0] - c[0], cam[2] - c[2]);
  }, []);

  const quality = useStore((s) => s.quality);
  const panelSegments = quality === 'low' ? 12 : 28;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { damp } = THREE.MathUtils;
    const p = presence(WORK_INDEX);
    g.visible = p > 0.02;
    if (!g.visible) return;

    scale.current = damp(scale.current, p, 4, delta);
    g.scale.setScalar(Math.max(scale.current, 0.0001));
    g.position.y = CENTERS.work[1] + GALLERY_Y_OFFSET + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;

    // scroll through the pinned section spins the carousel
    const activeT = sectionLocal(WORK_INDEX) * (PROJECTS.length - 1);
    if (carousel.current) {
      carousel.current.rotation.y = damp(
        carousel.current.rotation.y,
        facingPhase - activeT * STEP,
        4,
        delta
      );
    }

    const idx = clamp(Math.round(activeT), 0, PROJECTS.length - 1);
    if (useStore.getState().activeWork !== idx) useStore.setState({ activeWork: idx });

    materials.current.forEach((mat, i) => {
      if (!mat) return;
      mat.uTime = state.clock.elapsedTime;
      mat.uHover = damp(mat.uHover, hoveredIdx.current === i ? 1 : 0, 6, delta);
    });
  });

  return (
    <group ref={group} position={CENTERS.work}>
      <group ref={carousel}>
        <Suspense fallback={null}>
          <Panels materials={materials} hoveredIdx={hoveredIdx} panelSegments={panelSegments} />
        </Suspense>
      </group>

      <Glow color={SECTIONS[2].accent} scale={10} opacity={0.22} />
      <pointLight color={SECTIONS[2].accent} intensity={130} distance={30} position={[0, 3, 5]} />
      <pointLight color={SECTIONS[2].glow} intensity={50} distance={22} position={[-4, -2, -3]} />
    </group>
  );
}
