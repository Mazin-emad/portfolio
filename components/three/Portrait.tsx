"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Ready } from "./Ready";

/**
 * Mazin's photo rebuilt from particles.
 *  - on load the particles drift in from depth and assemble the portrait
 *  - the cursor (or a dragging finger) pushes particles aside, they swirl and settle back
 *  - a click / tap sends a ripple through the whole portrait
 *  - the portrait leans gently toward the cursor (particles carry a little relief, so it reads as 3D)
 *
 * Source: /portrait/points.png — a 232×290 RGBA cut-out (alpha = silhouette).
 */

const SRC = "/portrait/points.png";
const PLANE_H = 4.0; // world height of the portrait
const CAM_Z = 8;
const FOV = 30;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform vec2 uPointer;
  uniform float uPower;
  uniform float uRipple;
  uniform vec2 uRippleAt;
  uniform float uSize;
  attribute vec3 aStart;
  attribute vec3 aColor;
  attribute float aRand;
  attribute vec2 aShape; // x: size weight, y: opacity
  varying vec3 vColor;
  varying float vAlpha;
  varying float vHot;

  void main() {
    // staggered assembly: lower rows and random particles arrive slightly later
    float t = clamp(uIntro * 1.7 - aRand * 0.55 - (0.5 - position.y / 4.0) * 0.15, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - t, 3.0);
    vec3 p = mix(aStart, position, e);

    // idle life: soft breathing in depth + tiny shimmer
    p.z += sin(uTime * 0.9 + position.y * 2.2 + aRand * 6.2831) * 0.025;
    p.xy += vec2(sin(uTime * 1.7 + aRand * 40.0), cos(uTime * 1.3 + aRand * 31.0)) * 0.006;

    // cursor: a soft lens — particles under it spread out (no hole), lift toward the viewer and swirl a little
    vec2 d = p.xy - uPointer;
    float dist = length(d);
    float f = smoothstep(0.7, 0.0, dist) * uPower * e;
    p.xy += d * f * 0.38 + vec2(-d.y, d.x) * f * 0.12;
    p.z += f * (0.35 + aRand * 0.25);

    // ripple from a click / tap
    float rd = length(position.xy - uRippleAt);
    float wave = uRipple > 0.0 ? sin(rd * 9.0 - (1.0 - uRipple) * 22.0) * smoothstep(0.0, 0.25, uRipple) : 0.0;
    float band = uRipple > 0.0 ? exp(-pow(rd - (1.0 - uRipple) * 3.2, 2.0) * 6.0) : 0.0;
    p.z += wave * band * 0.3;
    p.xy += (position.xy - uRippleAt) / max(rd, 1e-3) * band * uRipple * 0.06;

    // slow scan line sweeping down the portrait
    float scanY = 2.4 - mod(uTime * 0.55, 7.0);
    float scan = exp(-pow(position.y - scanY, 2.0) * 40.0);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (aShape.x + f * 0.35 + scan * 0.2) * (${CAM_Z.toFixed(1)} / -mv.z);

    vColor = aColor;
    vHot = clamp(f * 0.4 + scan * 0.3 + band * uRipple * 0.7, 0.0, 1.0);
    vAlpha = smoothstep(0.0, 0.35, t) * clamp(aShape.y + vHot * 0.6, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uAccent;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vHot;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.18, d) * vAlpha;
    if (a < 0.02) discard;
    vec3 c = mix(vColor, uAccent, vHot * 0.7);
    gl_FragColor = vec4(c, a);
  }
`;

/** Deterministic pseudo-random in [0,1). */
function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Built = { geometry: THREE.BufferGeometry; cell: number };

/** Turn the RGBA cut-out into particle attributes. */
function build(img: HTMLImageElement, light: boolean): Built {
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);
  const px = ctx.getImageData(0, 0, W, H).data;

  const cell = PLANE_H / H;
  const width = W * cell;

  // per-row silhouette span → a soft "bulge" so the portrait has relief when it turns
  const rowMin = new Int32Array(H).fill(W);
  const rowMax = new Int32Array(H).fill(-1);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (px[(y * W + x) * 4 + 3] > 120) {
        if (x < rowMin[y]) rowMin[y] = x;
        rowMax[y] = x;
      }

  const pos: number[] = [];
  const start: number[] = [];
  const col: number[] = [];
  const rnd: number[] = [];
  const shape: number[] = [];
  const alphaAt = (x: number, y: number) =>
    // below the crop the body continues, so the bottom border is not an outline
    x < 0 || y < 0 || x >= W ? 0 : px[(Math.min(y, H - 1) * W + x) * 4 + 3];
  const accent = new THREE.Color(light ? "#3d6b00" : "#c5f82a");
  const c = new THREE.Color();

  let i = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const k = (y * W + x) * 4;
      const al = px[k + 3] / 255;
      i++;
      if (al < 0.45) continue;
      // thin the edge so the silhouette dissolves rather than ending in a hard line
      if (al < 0.9 && hash(i * 3.1) > al) continue;

      const r = px[k] / 255;
      const g = px[k + 1] / 255;
      const b = px[k + 2] / 255;
      const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      const jx = hash(i * 1.7) - 0.5;
      const jy = hash(i * 2.3) - 0.5;
      const hx = (x + 0.5 + jx * 0.3) * cell - width / 2;
      const hy = PLANE_H / 2 - (y + 0.5 + jy * 0.3) * cell;

      let bulge = 0;
      if (rowMax[y] > rowMin[y]) {
        const mid = (rowMin[y] + rowMax[y]) / 2;
        const half = (rowMax[y] - rowMin[y]) / 2;
        const u = Math.min(1, Math.abs(x - mid) / half);
        bulge = Math.sqrt(1 - u * u) * Math.min(0.42, half * cell * 0.45);
      }
      pos.push(hx, hy, bulge + (L - 0.5) * 0.08);

      // assembly origin: pushed back in depth and outward, a loose cloud around home
      const a = hash(i * 5.3) * Math.PI * 2;
      const rad = 0.6 + hash(i * 7.9) * 1.6;
      start.push(hx + Math.cos(a) * rad, hy + Math.sin(a) * rad * 0.7, -1.5 - hash(i * 9.7) * 3.5);

      // the silhouette's outline (any transparent pixel within 2px) becomes an accent rim
      let edge = false;
      for (let oy = -2; oy <= 2 && !edge; oy++)
        for (let ox = -2; ox <= 2 && !edge; ox++) if (alphaAt(x + ox, y + oy) < 110) edge = true;

      // tone curve: lift mid-tones of the face, let the black suit fall back
      const T = Math.pow(THREE.MathUtils.smoothstep(L, 0.03, 0.7), 0.75);
      // shader writes these straight to the sRGB canvas, so keep them in sRGB
      c.setRGB(r, g, b);
      const grey = L;
      c.lerp(new THREE.Color(grey, grey, grey), 0.25); // a touch desaturated, more "rendered"
      if (light) {
        c.multiplyScalar(0.78);
        if (edge) c.copy(accent);
        // on paper the ink is the shadow: a gentler curve keeps skin tones present
        const D = 1 - THREE.MathUtils.smoothstep(L, 0.05, 0.98);
        shape.push(edge ? 0.85 : 0.5 + 0.7 * D, edge ? 0.95 : 0.3 + 0.7 * D);
      } else {
        c.multiplyScalar(1.3);
        if (edge) c.copy(accent);
        shape.push(edge ? 0.8 : 0.4 + 0.85 * T, edge ? 0.85 : 0.16 + 0.84 * T);
      }
      col.push(c.r, c.g, c.b);
      rnd.push(hash(i * 11.3));
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geometry.setAttribute("aStart", new THREE.Float32BufferAttribute(start, 3));
  geometry.setAttribute("aColor", new THREE.Float32BufferAttribute(col, 3));
  geometry.setAttribute("aRand", new THREE.Float32BufferAttribute(rnd, 1));
  geometry.setAttribute("aShape", new THREE.Float32BufferAttribute(shape, 2));
  return { geometry, cell };
}

function Particles({ light, still }: { light: boolean; still: boolean }) {
  const img = useLoader(THREE.ImageLoader, SRC);
  const { geometry, cell } = useMemo(() => build(img, light), [img, light]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { gl, viewport, size } = useThree();
  // keep the whole bust visible in narrow canvases
  const scale = Math.min(1, viewport.height / (PLANE_H * 1.02));

  const target = useRef(new THREE.Vector2(99, 99));
  const smooth = useRef(new THREE.Vector2(99, 99));
  const tilt = useRef(new THREE.Vector2());
  const power = useRef(0);
  const lastMove = useRef(-10);
  const clock = useRef(0);
  const ripple = useRef({ v: 0, at: new THREE.Vector2() });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: still ? 1 : 0 },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uPower: { value: 0 },
      uRipple: { value: 0 },
      uRippleAt: { value: new THREE.Vector2() },
      uSize: { value: 3 },
      uAccent: { value: new THREE.Color("#c5f82a") },
    }),
    [still],
  );

  useEffect(() => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uAccent.value.set(light ? "#3d6b00" : "#c5f82a");
  }, [light]);

  // pointer in portrait-plane coordinates, measured against this canvas
  useEffect(() => {
    if (still) return;
    const el = gl.domElement;
    const toPlane = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      const visH = 2 * CAM_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const visW = visH * (r.width / r.height);
      return { x: (nx * visW) / 2, y: (ny * visH) / 2, nx, ny };
    };
    const move = (e: PointerEvent) => {
      const p = toPlane(e);
      target.current.set(p.x, p.y);
      tilt.current.set(
        THREE.MathUtils.clamp(p.nx, -1.5, 1.5),
        THREE.MathUtils.clamp(p.ny, -1.5, 1.5),
      );
      lastMove.current = clock.current;
    };
    const down = (e: PointerEvent) => {
      const p = toPlane(e);
      if (Math.abs(p.nx) > 1 || Math.abs(p.ny) > 1) return;
      ripple.current.v = 1;
      ripple.current.at.set(p.x, p.y);
    };
    const away = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") target.current.set(99, 99);
    };
    const leave = () => target.current.set(99, 99);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", away, { passive: true });
    window.addEventListener("pointercancel", away, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", away);
      window.removeEventListener("pointercancel", away);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [gl, still]);

  /* eslint-disable react-hooks/immutability -- three.js uniforms and transforms are animated imperatively */
  useFrame((state, dt) => {
    const u = mat.current?.uniforms;
    const g = group.current;
    if (!u || !g) return;
    dt = Math.min(dt, 0.05);
    clock.current += dt;
    // one grid cell in device pixels, slightly overlapped so the portrait reads as a surface
    const pxPerUnit = (size.height * state.viewport.dpr) / viewport.height;
    u.uSize.value = cell * pxPerUnit * scale * 1.15;
    if (still) return;

    u.uTime.value += dt;
    u.uIntro.value = Math.min(1, u.uIntro.value + dt / 2.2);

    // the cursor's influence fades if it sits still for a while, so a resting mouse doesn't leave a hole
    const idle = clock.current - lastMove.current;
    const want = target.current.x > 50 ? 0 : idle < 1.6 ? 1 : 0.35;
    power.current += (want - power.current) * (1 - Math.pow(0.02, dt));
    u.uPower.value = power.current;

    if (target.current.x < 50) {
      if (smooth.current.x > 50) smooth.current.copy(target.current);
      smooth.current.lerp(target.current, 1 - Math.pow(0.0005, dt));
    }
    u.uPointer.value.copy(smooth.current);

    ripple.current.v = Math.max(0, ripple.current.v - dt / 1.6);
    u.uRipple.value = ripple.current.v;
    u.uRippleAt.value.copy(ripple.current.at);

    // lean toward the cursor + slow idle sway
    const ry = tilt.current.x * 0.2 + Math.sin(u.uTime.value * 0.35) * 0.04;
    const rx = -tilt.current.y * 0.1 + Math.sin(u.uTime.value * 0.27) * 0.02;
    const k = 1 - Math.pow(0.004, dt);
    g.rotation.y += (ry - g.rotation.y) * k;
    g.rotation.x += (rx - g.rotation.x) * k;
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group scale={scale} position={[0, (viewport.height - PLANE_H * scale) / 2, 0]}>
      <group ref={group}>
        <points geometry={geometry}>
          <shaderMaterial
            ref={mat}
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </points>
      </group>
    </group>
  );
}

export default function PortraitCanvas({
  active,
  light,
  still = false,
  onReady,
}: {
  active: boolean;
  light: boolean;
  /** render the fully-assembled portrait with no motion (used for the poster) */
  still?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: still,
      }}
      style={{ pointerEvents: "none" }}
    >
      <Particles light={light} still={still} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
