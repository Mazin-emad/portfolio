"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, useTexture } from "@react-three/drei";

export type SceneMode = "particles" | "full";

export interface DevicePair {
  desktop: string;
  mobile: string;
}

/* ------------------------------------------------------------------ */
/* Shared pointer state (window-level, so the canvas can stay inert)   */
/* ------------------------------------------------------------------ */
function usePointer() {
  const target = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return target;
}

/* ------------------------------------------------------------------ */
/* Particle field — GPU displaced, reacts to the cursor                 */
/* ------------------------------------------------------------------ */
const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  attribute float aRand;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.z += sin(p.x * 0.55 + uTime * 0.55) * 0.28 + cos(p.y * 0.7 + uTime * 0.45) * 0.28;
    vec2 d = p.xy - uPointer;
    float dist = length(d);
    float f = smoothstep(2.6, 0.0, dist);
    p.xy += normalize(d + 1e-4) * f * 0.55;
    p.z += f * 1.1;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (0.55 + aRand * 0.9 + f * 1.4) * (6.0 / -mv.z);
    vAlpha = (0.22 + aRand * 0.25 + f * 0.7) * smoothstep(14.5, 9.5, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const fragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

/** Deterministic pseudo-random in [0,1) so geometry generation stays pure. */
function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleField({ light, count }: { light: boolean; count: { x: number; y: number } }) {
  const pointer = usePointer();
  const smooth = useRef(new THREE.Vector2());
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const w = 22;
    const h = 13;
    const positions = new Float32Array(count.x * count.y * 3);
    const rands = new Float32Array(count.x * count.y);
    let i = 0;
    for (let ix = 0; ix < count.x; ix++) {
      for (let iy = 0; iy < count.y; iy++) {
        positions[i * 3] = (ix / (count.x - 1) - 0.5) * w;
        positions[i * 3 + 1] = (iy / (count.y - 1) - 0.5) * h;
        positions[i * 3 + 2] = 0;
        rands[i] = hash(i);
        i++;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));
    return g;
  }, [count.x, count.y]);

  // Initial values only; after mount the uniforms are driven through the material ref.
  const initialUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uSize: { value: 5 },
      uColor: { value: new THREE.Color("#c5f82a") },
    }),
    [],
  );

  useEffect(() => {
    matRef.current?.uniforms.uColor.value.set(light ? "#4a7a00" : "#c5f82a");
  }, [light]);

  /* eslint-disable react-hooks/immutability -- three.js uniforms are mutated every frame by design */
  useFrame((state, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value += delta;
    smooth.current.lerp(pointer.current, 1 - Math.pow(0.001, delta));
    // Map NDC to the (tilted) plane's local XY.
    u.uPointer.value.set(smooth.current.x * 10, smooth.current.y * 5.2);
    u.uSize.value = 5 * Math.min(state.viewport.dpr, 1.5);
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <points geometry={geometry} rotation={[-0.62, 0, 0]} position={[0, -1.1, -2.5]}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={initialUniforms}
        transparent
        depthWrite={false}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Floating laptop + phone mockups showing real project screenshots     */
/* ------------------------------------------------------------------ */
function Devices({ pairs, rtl }: { pairs: DevicePair[]; rtl: boolean }) {
  const urls = useMemo(() => pairs.flatMap((p) => [p.desktop, p.mobile]), [pairs]);
  const textures = useTexture(urls);
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const index = useRef(0);
  const kick = useRef(0);
  const clock = useRef(0);
  const desktopMat = useRef<THREE.MeshBasicMaterial>(null);
  const mobileMat = useRef<THREE.MeshBasicMaterial>(null);
  const { size } = useThree();

  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    clock.current += delta;
    if (clock.current > 5) {
      clock.current = 0;
      index.current = (index.current + 1) % pairs.length;
      kick.current = 1;
      if (desktopMat.current) desktopMat.current.map = textures[index.current * 2];
      if (mobileMat.current) mobileMat.current.map = textures[index.current * 2 + 1];
    }
    kick.current *= Math.pow(0.02, delta);
    const tx = pointer.current.x * 0.35 + (rtl ? 0.25 : -0.25) + kick.current * 0.9;
    const ty = -pointer.current.y * 0.18;
    g.rotation.y += (tx - g.rotation.y) * (1 - Math.pow(0.002, delta));
    g.rotation.x += (ty - g.rotation.x) * (1 - Math.pow(0.002, delta));
  });

  // Keep the pair on the "free" side of the layout; scale with canvas width.
  const s = Math.min(1, size.width / 1500) * 0.82;
  const x = (rtl ? -1 : 1) * 2.55;

  return (
    <group position={[x, 0.1, 0]} scale={s}>
      <group ref={group}>
        <Float
          speed={1.4}
          rotationIntensity={0.15}
          floatIntensity={0.9}
          floatingRange={[-0.1, 0.12]}
        >
          {/* laptop screen slab */}
          <RoundedBox args={[4.3, 2.72, 0.12]} radius={0.09} smoothness={4}>
            <meshStandardMaterial color="#12141a" metalness={0.7} roughness={0.35} />
          </RoundedBox>
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[4.1, 2.56]} />
            <meshBasicMaterial ref={desktopMat} map={textures[0]} toneMapped={false} />
          </mesh>
          {/* phone */}
          <group position={[rtl ? 2.35 : -2.35, -0.95, 0.7]} rotation={[0, rtl ? -0.18 : 0.18, 0]}>
            <RoundedBox args={[1.12, 2.3, 0.12]} radius={0.15} smoothness={4}>
              <meshStandardMaterial color="#0c0d10" metalness={0.8} roughness={0.3} />
            </RoundedBox>
            <mesh position={[0, 0, 0.065]}>
              <planeGeometry args={[1.0, 2.16]} />
              <meshBasicMaterial ref={mobileMat} map={textures[1]} toneMapped={false} />
            </mesh>
          </group>
        </Float>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scene                                                                */
/* ------------------------------------------------------------------ */
export default function Scene({
  mode,
  light,
  rtl,
  pairs,
  active,
}: {
  mode: SceneMode;
  light: boolean;
  rtl: boolean;
  pairs: DevicePair[];
  active: boolean;
}) {
  const count = mode === "full" ? { x: 120, y: 70 } : { x: 70, y: 44 };
  return (
    <Canvas
      dpr={[1, mode === "full" ? 1.75 : 1.25]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <ParticleField light={light} count={count} />
      {mode === "full" && <Devices pairs={pairs} rtl={rtl} />}
    </Canvas>
  );
}
