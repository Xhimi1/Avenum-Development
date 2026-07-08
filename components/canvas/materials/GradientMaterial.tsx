'use client';

import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

/**
 * Custom animated gradient shader used by the work-gallery panels:
 * a flowing two-color gradient with noise, a traveling light band,
 * a vertex wave, and a hover uniform that brightens + warps the surface.
 */
const GradientMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uColorA: new THREE.Color('#ffb300'),
    uColorB: new THREE.Color('#ff3d6e'),
    uMap: null,
    uHasMap: 0,
    uCoverScale: new THREE.Vector2(1, 1),
  },
  /* glsl */ `
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 p = position;
      float w = sin(p.x * 2.2 + uTime * 1.4) * cos(p.y * 2.6 + uTime * 1.1);
      p.z += w * (0.05 + uHover * 0.16);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  /* glsl */ `
    uniform float uTime;
    uniform float uHover;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform sampler2D uMap;
    uniform float uHasMap;
    uniform vec2 uCoverScale;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    // Custom sampler2D reads come back as stored sRGB bytes (three only
    // auto-decodes its own built-in map slots) — decode before lighting math.
    vec3 avnSrgbToLinear(vec3 c) {
      return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
    }

    // Local copy of three's ACESFilmicToneMapping. This material sets
    // toneMapped=false so it can apply tonemapping to the gradient only —
    // the front-face photo skips it entirely, since running R3F's default
    // ACES curve over an already-dark photo crushed it to near-black instead
    // of showing it at its real brightness.
    vec3 avnACESFilmic(vec3 color) {
      const mat3 ACESInputMat = mat3(
        vec3(0.59719, 0.07600, 0.02840),
        vec3(0.35458, 0.90834, 0.13383),
        vec3(0.04823, 0.01566, 0.83777)
      );
      const mat3 ACESOutputMat = mat3(
        vec3( 1.60475, -0.10208, -0.00327),
        vec3(-0.53108,  1.10813, -0.07276),
        vec3(-0.07367, -0.00605,  1.07602)
      );
      color = ACESInputMat * (color / 0.6);
      vec3 a = color * (color + 0.0245786) - 0.000090537;
      vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;
      color = ACESOutputMat * (a / b);
      return clamp(color, 0.0, 1.0);
    }

    void main() {
      vec2 uv = vUv;
      float n = noise(uv * 3.0 + uTime * 0.15);

      float g = uv.y + (uv.x - 0.5) * 0.35 + (n - 0.5) * 0.5;
      vec3 col = mix(uColorA, uColorB, smoothstep(0.05, 0.95, g));

      float band = sin((uv.x + uv.y) * 6.0 - uTime * 0.8 + n * 3.0) * 0.5 + 0.5;
      col += band * band * 0.16;

      float edge = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x) *
                   smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);
      col *= mix(0.5, 1.0, edge);
      col *= 1.0 + uHover * 0.35;

      // Front face only: swap the gradient for a cover-fit photo. The back
      // face falls straight through to the untouched gradient look above.
      if (gl_FrontFacing && uHasMap > 0.5) {
        vec2 cuv = (uv - 0.5) * uCoverScale + 0.5;
        vec3 photo = avnSrgbToLinear(texture2D(uMap, cuv).rgb);
        photo *= mix(0.5, 1.0, edge);
        photo *= 1.0 + uHover * 0.35;
        col = photo;
      } else {
        col = avnACESFilmic(col);
      }

      gl_FragColor = vec4(col, 1.0);
      #include <colorspace_fragment>
    }
  `
);

extend({ GradientMaterial });

export type GradientMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uHover: number;
  uColorA: THREE.Color;
  uColorB: THREE.Color;
  uMap: THREE.Texture | null;
  uHasMap: number;
  uCoverScale: THREE.Vector2;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientMaterial: any;
    }
  }
}

export default GradientMaterial;
