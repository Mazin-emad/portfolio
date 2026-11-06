"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, useTexture } from "@react-three/drei";
import { Ready } from "./Ready";

/** Laptop (+ optional phone) showing a project's real screenshots; tilts with the cursor. */

const LAPTOP_ASPECT = 4.1 / 2.56;
const PHONE_ASPECT = 1.0 / 2.16;

/** Cover-fit a screenshot onto a screen, anchored to the top like a real page. */
function fit(tex: THREE.Texture, target: number) {
  const img = tex.image as { width: number; height: number } | undefined;
  if (!img) return;
  const a = img.width / img.height;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (a < target) {
    tex.repeat.set(1, a / target);
    tex.offset.set(0, 1 - a / target);
  } else {
    tex.repeat.set(target / a, 1);
    tex.offset.set((1 - target / a) / 2, 0);
  }
  tex.needsUpdate = true;
}

function Devices({ desktop, mobile, rtl }: { desktop: string[]; mobile: string[]; rtl: boolean }) {
  const hasPhone = mobile.length > 0;
  const desktopTex = useTexture(desktop);
  const mobileTex = useTexture(hasPhone ? mobile : desktop.slice(0, 1));
  const group = useRef<THREE.Group>(null);
  const dMat = useRef<THREE.MeshBasicMaterial>(null);
  const mMat = useRef<THREE.MeshBasicMaterial>(null);
  const clock = useRef(0);
  const idx = useRef(0);
  const kick = useRef(0);
  const pointer = useRef(new THREE.Vector2());
  const { viewport, gl } = useThree();

  useMemo(() => {
    desktopTex.forEach((t) => fit(t, LAPTOP_ASPECT));
    if (hasPhone) mobileTex.forEach((t) => fit(t, PHONE_ASPECT));
  }, [desktopTex, mobileTex, hasPhone]);

  useEffect(() => {
    const el = gl.domElement;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.set(
        THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1.2, 1.2),
        THREE.MathUtils.clamp(-(((e.clientY - r.top) / r.height) * 2 - 1), -1.2, 1.2),
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [gl]);

  /* eslint-disable react-hooks/immutability -- three.js objects are animated imperatively */
  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    clock.current += dt;
    if (clock.current > 4.5 && (desktopTex.length > 1 || (hasPhone && mobileTex.length > 1))) {
      clock.current = 0;
      idx.current += 1;
      kick.current = 1;
      if (dMat.current) dMat.current.map = desktopTex[idx.current % desktopTex.length];
      if (mMat.current && hasPhone) mMat.current.map = mobileTex[idx.current % mobileTex.length];
    }
    kick.current *= Math.pow(0.02, dt);
    const tx = pointer.current.x * 0.32 + kick.current * 0.8;
    const ty = -pointer.current.y * 0.16;
    g.rotation.y += (tx - g.rotation.y) * (1 - Math.pow(0.002, dt));
    g.rotation.x += (ty - g.rotation.x) * (1 - Math.pow(0.002, dt));
  });
  /* eslint-enable react-hooks/immutability */

  // fit the group to the visible width (so phones get a full-width laptop), never bigger than 1.08
  const s = Math.min(1.08, viewport.width / (hasPhone ? 6.8 : 5.0));
  const px = rtl ? 2.4 : -2.4;
  return (
    <group scale={s} position={[hasPhone ? (rtl ? -0.4 : 0.4) : 0, 0, 0]}>
      <group ref={group}>
        <Float
          speed={1.3}
          rotationIntensity={0.12}
          floatIntensity={0.8}
          floatingRange={[-0.1, 0.12]}
        >
          <RoundedBox args={[4.3, 2.72, 0.12]} radius={0.09} smoothness={4}>
            <meshStandardMaterial color="#262b35" metalness={0.55} roughness={0.32} />
          </RoundedBox>
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[4.1, 2.56]} />
            <meshBasicMaterial ref={dMat} map={desktopTex[0]} toneMapped={false} />
          </mesh>
          {hasPhone && (
            <group position={[px, -0.95, 0.7]} rotation={[0, rtl ? -0.18 : 0.18, 0]}>
              <RoundedBox args={[1.12, 2.3, 0.12]} radius={0.15} smoothness={4}>
                <meshStandardMaterial color="#222731" metalness={0.6} roughness={0.3} />
              </RoundedBox>
              <mesh position={[0, 0, 0.065]}>
                <planeGeometry args={[1.0, 2.16]} />
                <meshBasicMaterial ref={mMat} map={mobileTex[0]} toneMapped={false} />
              </mesh>
            </group>
          )}
        </Float>
      </group>
    </group>
  );
}

export default function DevicesCanvas({
  desktop,
  mobile,
  rtl,
  active,
  onReady,
}: {
  desktop: string[];
  mobile: string[];
  rtl: boolean;
  active: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 8.4], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <directionalLight position={[5, 1.5, -3]} intensity={2.4} color="#c5f82a" />
      <directionalLight position={[-5, 2, -3]} intensity={1.6} color="#8fb4ff" />
      <Devices desktop={desktop} mobile={mobile} rtl={rtl} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
