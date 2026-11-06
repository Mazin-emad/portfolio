"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Ready } from "./Ready";

/* ------------------------------------------------------------------ */
/* A stylized 3D bust of Mazin, modelled entirely in code.              */
/* Proportions, skin tone, hair, brows, smile and light stubble are     */
/* taken from reference photos. No glasses by design.                   */
/* ------------------------------------------------------------------ */

const SKIN = "#c68e67";
const SKIN_SHADE = "#b5805a";
const HAIR = "#17120f";
const LIP = "#9a5646";

const { smoothstep, lerp, clamp } = THREE.MathUtils;

/** Cheap deterministic noise in roughly [-1, 1]; keeps geometry generation pure. */
const noise3 = (x: number, y: number, z: number) =>
  Math.sin(x * 7.3 + y * 3.1) * Math.cos(y * 6.1 + z * 4.7) * 0.5 +
  Math.sin(z * 9.7 + x * 5.3) * 0.5;

/** Head proportions: taper into a defined jaw, flatten the chin, then scale. */
function shapeHead(v: THREE.Vector3) {
  const jaw = smoothstep(-v.y, 0, 0.95);
  v.x *= 1 - 0.2 * jaw;
  v.z *= 1 - 0.12 * jaw;
  if (v.y < -0.62) v.y = -0.62 + (v.y + 0.62) * 0.55;
  v.x *= 0.77;
  v.y *= 1.09;
  v.z *= 0.94;
  return v;
}

function makeHead() {
  const g = new THREE.SphereGeometry(1, 72, 56);
  const p = g.attributes.position;
  const colors = new Float32Array(p.count * 3);
  const skin = new THREE.Color(SKIN);
  const stubble = new THREE.Color("#9a6a4d");
  const blush = new THREE.Color("#d39a76");
  const c = new THREE.Color();
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const ox = v.x;
    const oy = v.y;
    const oz = v.z;
    shapeHead(v);
    p.setXYZ(i, v.x, v.y, v.z);

    // light stubble over the lower face and above the lip, a warm blush on the cheeks
    const front = smoothstep(oz, 0.05, 0.55);
    const lower = smoothstep(-oy, 0.1, 0.6);
    const mask = clamp(lower * front * 0.55, 0, 1);
    const cheek =
      smoothstep(Math.abs(ox), 0.3, 0.55) *
      (1 - smoothstep(Math.abs(ox), 0.7, 0.9)) *
      smoothstep(oy, -0.35, -0.05) *
      (1 - smoothstep(oy, 0.1, 0.3)) *
      front *
      0.28;
    c.copy(skin).lerp(blush, cheek).lerp(stubble, mask);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

/** Short, textured hair: high on the forehead, tight at the sides, volume on top. */
function makeHair() {
  const g = new THREE.SphereGeometry(1, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const theta = Math.acos(clamp(v.y, -1, 1));
    const phi = Math.atan2(v.x, v.z); // 0 = front
    const a = Math.abs(phi);
    const tmax =
      0.98 + 0.52 * smoothstep(a, 0.15, Math.PI / 2) + 0.2 * smoothstep(a, Math.PI / 2, Math.PI);
    const t = (theta / (Math.PI / 2)) * tmax;
    const dir = new THREE.Vector3(
      Math.sin(t) * Math.sin(phi),
      Math.cos(t),
      Math.sin(t) * Math.cos(phi),
    );
    const r =
      1.03 +
      0.11 * smoothstep(dir.y, 0.3, 0.95) +
      0.045 * smoothstep(dir.y, 0.5, 0.9) * smoothstep(dir.z, -0.2, 0.7) +
      0.018 * noise3(dir.x, dir.y, dir.z);
    p.setXYZ(i, dir.x * r, dir.y * r, dir.z * r);
    v.fromBufferAttribute(p, i);
    shapeHead(v);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/** Surface helper: where does a ray along -z hit the head at (x, y)? */
function makeSurface(geometry: THREE.BufferGeometry) {
  const mesh = new THREE.Mesh(geometry);
  const ray = new THREE.Raycaster();
  const origin = new THREE.Vector3();
  const dir = new THREE.Vector3(0, 0, -1);
  return (x: number, y: number, lift = 0) => {
    origin.set(x, y, 4);
    ray.set(origin, dir);
    const hit = ray.intersectObject(mesh, false)[0];
    return new THREE.Vector3(x, y, (hit ? hit.point.z : 0) + lift);
  };
}

function tubeAlong(points: THREE.Vector3[], radius: number, segments = 32) {
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 10, false);
}

/** A set of small curls scattered across the crown for a textured, natural cut. */
function makeCurls() {
  const out: { pos: THREE.Vector3; r: number }[] = [];
  const v = new THREE.Vector3();
  const rand = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 90; i++) {
    const y = 0.5 + rand(i * 3 + 1) * 0.47; // upper cap only
    const phi = (rand(i * 3 + 2) - 0.5) * Math.PI * 1.7 + (rand(i + 9) > 0.5 ? 0.2 : -0.2);
    const front = Math.cos(phi);
    // keep curls behind the hairline on the forehead
    if (front > 0.2 && y < 0.62 + front * 0.12) continue;
    const rr = Math.sqrt(1 - y * y);
    v.set(Math.sin(phi) * rr, y, Math.cos(phi) * rr).multiplyScalar(1.08 + rand(i * 7) * 0.05);
    shapeHead(v);
    out.push({ pos: v.clone(), r: 0.085 + rand(i * 5 + 4) * 0.06 });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Pointer → look target, measured from the avatar itself               */
/* ------------------------------------------------------------------ */
function useLookTarget() {
  const target = useRef(new THREE.Vector2(0, 0));
  const lastMove = useRef(-10);
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.36;
      target.current.set(
        clamp((e.clientX - cx) / (window.innerWidth * 0.5), -1, 1),
        clamp(-(e.clientY - cy) / (window.innerHeight * 0.5), -1, 1),
      );
      lastMove.current = performance.now() / 1000;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);
  return { target, lastMove };
}

/* ------------------------------------------------------------------ */
/* The avatar                                                           */
/* ------------------------------------------------------------------ */
function Mazin({ interactive, still }: { interactive: boolean; still: boolean }) {
  const { target, lastMove } = useLookTarget();

  const built = useMemo(() => {
    const head = makeHead();
    const surf = makeSurface(head);
    const hair = makeHair();
    const curls = makeCurls();

    const eyeY = 0.13;
    const eyeX = 0.335;
    const eyeZ = surf(eyeX, eyeY).z - 0.055;

    const browPts = (sign: number) =>
      [
        [0.13, 0.37],
        [0.26, 0.415],
        [0.4, 0.42],
        [0.5, 0.385],
      ].map(([x, y]) => surf(sign * x, y, 0.012));
    const brows = [tubeAlong(browPts(-1), 0.04), tubeAlong(browPts(1), 0.04)];

    const smile = (yy: number, half: number, sag: number) =>
      Array.from({ length: 9 }, (_, i) => {
        const t = (i / 8) * 2 - 1;
        const x = half * t;
        const y = yy + sag * t * t;
        return surf(x, y, 0.014);
      });
    const lipUpper = tubeAlong(smile(-0.435, 0.3, 0.075), 0.022, 40);
    const teeth = tubeAlong(smile(-0.468, 0.235, 0.06), 0.03, 40);
    const lipLower = tubeAlong(smile(-0.512, 0.2, 0.05), 0.026, 40);

    return {
      head,
      hair,
      curls,
      eyeX,
      eyeY,
      eyeZ,
      brows,
      lipUpper,
      teeth,
      lipLower,
      noseTip: surf(0, -0.19, 0.05),
      noseL: surf(-0.092, -0.215, 0.012),
      noseR: surf(0.092, -0.215, 0.012),
    };
  }, []);

  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Group>(null);
  const eyeR = useRef<THREE.Group>(null);
  const lidL = useRef<THREE.Group>(null);
  const lidR = useRef<THREE.Group>(null);
  const look = useRef(new THREE.Vector2());
  const eyeLook = useRef(new THREE.Vector2());
  const blink = useRef({ next: 1.8, t: -1 });
  const clock = useRef(0);

  /* eslint-disable react-hooks/immutability -- three.js objects are animated imperatively every frame */
  useFrame((_, dt) => {
    clock.current += dt;
    const time = clock.current;

    // Where to look: the pointer, or a slow idle drift when it has been still for a while.
    const now = performance.now() / 1000;
    const idle = !interactive || now - lastMove.current > 4;
    const tx = still ? 0.12 : idle ? Math.sin(time * 0.45) * 0.28 : target.current.x;
    const ty = still ? 0.04 : idle ? Math.sin(time * 0.31 + 1) * 0.1 : target.current.y;

    look.current.x += (tx - look.current.x) * (1 - Math.exp(-5 * dt));
    look.current.y += (ty - look.current.y) * (1 - Math.exp(-5 * dt));
    eyeLook.current.x += (tx - eyeLook.current.x) * (1 - Math.exp(-14 * dt));
    eyeLook.current.y += (ty - eyeLook.current.y) * (1 - Math.exp(-14 * dt));

    const h = head.current;
    if (h) {
      h.rotation.y = look.current.x * 0.62;
      h.rotation.x = -look.current.y * 0.36 + 0.03;
      h.rotation.z = -look.current.x * 0.05;
      h.position.y = Math.sin(time * 1.5) * 0.012;
    }
    const b = body.current;
    if (b) {
      b.rotation.y = look.current.x * 0.14;
      b.scale.y = 1 + Math.sin(time * 1.5) * 0.006;
    }
    // eyes lead the head: they rotate a little further than the head turns
    for (const e of [eyeL.current, eyeR.current]) {
      if (!e) continue;
      e.rotation.y = clamp(eyeLook.current.x - look.current.x, -1, 1) * 0.5 + look.current.x * 0.08;
      e.rotation.x =
        -clamp(eyeLook.current.y - look.current.y, -1, 1) * 0.35 - look.current.y * 0.05;
    }

    // blinking
    const bl = blink.current;
    let lid = -0.78; // relaxed, slightly lowered lid
    if (!still && bl.t < 0 && time > bl.next) bl.t = 0;
    if (bl.t >= 0) {
      bl.t += dt;
      const k = Math.sin(clamp(bl.t / 0.17, 0, 1) * Math.PI);
      lid = lerp(-0.78, 1.5, k);
      if (bl.t > 0.17) {
        bl.t = -1;
        bl.next = time + 2.2 + ((Math.sin(time * 12.9) + 1) / 2) * 3.2;
      }
    }
    if (lidL.current) lidL.current.rotation.x = lid;
    if (lidR.current) lidR.current.rotation.x = lid;
  });
  /* eslint-enable react-hooks/immutability */

  const skinMat = <meshStandardMaterial color={SKIN} roughness={0.62} metalness={0} />;
  const shadeMat = <meshStandardMaterial color={SKIN_SHADE} roughness={0.7} />;

  return (
    <group ref={root} position={[0, 0.25, 0]}>
      {/* torso: dark jacket, white shirt, collar */}
      <group ref={body}>
        <mesh position={[0, -2.3, -0.15]} scale={[2.15, 1.25, 1]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshStandardMaterial color="#0e0e11" roughness={0.55} />
        </mesh>
        {/* shirt front */}
        <mesh position={[0, -1.65, 0.78]} rotation={[-0.34, 0, 0]}>
          <shapeGeometry
            args={[
              (() => {
                const s = new THREE.Shape();
                s.moveTo(-0.34, 0.2);
                s.lineTo(0.34, 0.2);
                s.lineTo(0.05, -0.8);
                s.lineTo(-0.05, -0.8);
                s.closePath();
                return s;
              })(),
            ]}
          />
          <meshStandardMaterial color="#ecebe7" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
        {/* collar */}
        <mesh position={[0, -1.4, 0.02]} rotation={[Math.PI / 2 - 0.12, 0, 0]}>
          <torusGeometry args={[0.53, 0.09, 14, 40]} />
          <meshStandardMaterial color="#f2f1ee" roughness={0.8} />
        </mesh>
        {/* neck */}
        <mesh position={[0, -1.12, -0.06]}>
          <cylinderGeometry args={[0.42, 0.5, 1.0, 32]} />
          {shadeMat}
        </mesh>
      </group>

      {/* head */}
      <group ref={head} position={[0, 0, 0]}>
        <mesh geometry={built.head}>
          <meshStandardMaterial vertexColors roughness={0.62} />
        </mesh>

        {/* ears */}
        {[-1, 1].map((s) => (
          <mesh
            key={s}
            position={[s * 0.75, -0.02, -0.07]}
            scale={[0.5, 1, 0.75]}
            rotation={[0, 0, s * 0.12]}
          >
            <sphereGeometry args={[0.17, 24, 18]} />
            {shadeMat}
          </mesh>
        ))}

        {/* hair */}
        <mesh geometry={built.hair}>
          <meshStandardMaterial color={HAIR} roughness={0.78} side={THREE.DoubleSide} />
        </mesh>
        {built.curls.map((c, i) => (
          <mesh key={i} position={c.pos}>
            <sphereGeometry args={[c.r, 12, 10]} />
            <meshStandardMaterial color={HAIR} roughness={0.8} />
          </mesh>
        ))}

        {/* brows */}
        {built.brows.map((g, i) => (
          <mesh key={i} geometry={g}>
            <meshStandardMaterial color="#120e0b" roughness={0.9} />
          </mesh>
        ))}

        {/* eyes: sclera + iris track the pointer, lids blink */}
        {[-1, 1].map((s) => (
          <group key={s} position={[s * built.eyeX, built.eyeY, built.eyeZ]} scale={0.88}>
            <group ref={s < 0 ? eyeL : eyeR}>
              <mesh>
                <sphereGeometry args={[0.135, 28, 20]} />
                <meshStandardMaterial color="#f6f2ec" roughness={0.35} />
              </mesh>
              <mesh position={[0, 0, 0.118]} scale={[1, 1, 0.4]}>
                <sphereGeometry args={[0.072, 24, 16]} />
                <meshStandardMaterial color="#3a2216" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0, 0.134]} scale={[1, 1, 0.3]}>
                <sphereGeometry args={[0.036, 16, 12]} />
                <meshBasicMaterial color="#050403" />
              </mesh>
              <mesh position={[0.026, 0.03, 0.152]}>
                <sphereGeometry args={[0.012, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
            <group ref={s < 0 ? lidL : lidR}>
              <mesh>
                <sphereGeometry args={[0.145, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color={SKIN} roughness={0.62} side={THREE.DoubleSide} />
              </mesh>
            </group>
          </group>
        ))}

        {/* nose */}
        <mesh position={built.noseTip}>
          <sphereGeometry args={[0.088, 24, 18]} />
          {skinMat}
        </mesh>
        {[built.noseL, built.noseR].map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.052, 16, 12]} />
            {shadeMat}
          </mesh>
        ))}

        {/* smile */}
        <mesh geometry={built.teeth}>
          <meshStandardMaterial color="#f4f0ea" roughness={0.4} />
        </mesh>
        <mesh geometry={built.lipUpper}>
          <meshStandardMaterial color={LIP} roughness={0.55} />
        </mesh>
        <mesh geometry={built.lipLower}>
          <meshStandardMaterial color="#a45a49" roughness={0.55} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas wrapper                                                       */
/* ------------------------------------------------------------------ */
export default function AvatarCanvas({
  active,
  interactive = true,
  still = false,
  onReady,
  dpr = 1.75,
}: {
  active: boolean;
  interactive?: boolean;
  still?: boolean;
  onReady?: () => void;
  dpr?: number;
}) {
  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, -0.1, 9.8], fov: 26 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <hemisphereLight args={["#fff4e8", "#2a2f3a", 0.9]} />
      {/* key: warm, from the front-left */}
      <directionalLight position={[-2.5, 3, 5]} intensity={2.3} color="#fff0de" />
      {/* lime rim from behind-right, picks up the site accent */}
      <directionalLight position={[4, 1.5, -4]} intensity={1.9} color="#c5f82a" />
      {/* cool fill */}
      <directionalLight position={[4, 0, 3]} intensity={0.7} color="#8fb4ff" />
      <Mazin interactive={interactive} still={still} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
