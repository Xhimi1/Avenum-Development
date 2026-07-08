import * as THREE from 'three';

/**
 * The 3D world layout: one camera waypoint + look target per section.
 * Sections descend and drift through space so each feels like a distinct place.
 */
export const CAM_POINTS: [number, number, number][] = [
  [0, 0, 9], // hero
  [16, 1.5, -1], // services
  [12, -10, -18], // work
  [-6, -20, -34], // about
  [0, -31, -51], // contact
];

export const LOOK_POINTS: [number, number, number][] = [
  [0, 0, 0],
  [20.5, 0, -8.5],
  [8, -12, -26],
  [-12, -22, -42],
  [0, -34, -62],
];

/** Object cluster centers per section (same as look targets). */
export const CENTERS = {
  hero: LOOK_POINTS[0],
  services: LOOK_POINTS[1],
  work: LOOK_POINTS[2],
  about: LOOK_POINTS[3],
  contact: LOOK_POINTS[4],
} as const;

export function buildCameraCurve(): THREE.CatmullRomCurve3 {
  return new THREE.CatmullRomCurve3(
    CAM_POINTS.map((p) => new THREE.Vector3(...p)),
    false,
    'catmullrom',
    0.5
  );
}
