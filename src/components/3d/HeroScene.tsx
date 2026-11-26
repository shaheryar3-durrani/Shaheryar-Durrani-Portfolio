"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Image as ScreenImage, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { heroPanels } from "@/components/3d/heroPanels";

const PANEL_W = 3.2;
const PANEL_H = 2;
const BAR = 0.26;
const DOTS = ["#9f553c", "#b29762", "#c0c26b"];

// Pointer is tracked on window so the scene reacts even while the cursor is over the hero text.
const pointer = { x: 0, y: 0 };

// Seeded PRNG keeps the particle field deterministic (and render pure).
function particlePositions(count: number, seed = 7) {
  let t = seed;
  const rand = () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  const a = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    a[i * 3] = (rand() - 0.5) * 16;
    a[i * 3 + 1] = (rand() - 0.5) * 10;
    a[i * 3 + 2] = (rand() - 0.5) * 8 - 2;
  }
  return a;
}

function BrowserPanel({ url, index }: { url: string; index: number }) {
  const p = heroPanels[index];
  return (
    <Float speed={1.2 + index * 0.3} rotationIntensity={0.15} floatIntensity={0.35}>
      <group position={p.position} rotation={p.rotation}>
        <RoundedBox args={[PANEL_W + 0.14, PANEL_H + BAR + 0.14, 0.05]} radius={0.07} smoothness={4} position={[0, BAR / 2, -0.03]}>
          <meshStandardMaterial color="#2a2329" roughness={0.45} metalness={0.15} />
        </RoundedBox>
        {DOTS.map((c, i) => (
          <mesh key={c} position={[-PANEL_W / 2 + 0.16 + i * 0.13, PANEL_H / 2 + BAR / 2 + 0.01, 0.001]}>
            <circleGeometry args={[0.04, 24]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}
        <ScreenImage url={url} scale={[PANEL_W, PANEL_H]} radius={0.04} transparent toneMapped={false} />
      </group>
    </Float>
  );
}

function Particles({ count = 650 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => particlePositions(count), [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#c8704f" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.28 - 0.12, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.16, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, scroll * 1.6, 0.1);
    g.position.z = THREE.MathUtils.lerp(g.position.z, -scroll * 2.5, 0.1);
  });
  return (
    <group position={[0.35, 0.2, 0]}>
      <group ref={group}>{children}</group>
    </group>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.06;
    if (b.current) b.current.rotation.z -= dt * 0.04;
  });
  return (
    <group position={[0.2, 0, -2.2]}>
      <mesh ref={a} rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[3.4, 0.008, 8, 160]} />
        <meshBasicMaterial color="#c8704f" transparent opacity={0.55} />
      </mesh>
      <mesh ref={b} rotation={[1.35, -0.35, 0]}>
        <torusGeometry args={[4.1, 0.006, 8, 160]} />
        <meshBasicMaterial color="#b29762" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export default function HeroScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <fog attach="fog" args={["#1a1519", 8, 16]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} color="#f2ece5" />
      <pointLight position={[-4, -2, 2]} intensity={18} color="#9f553c" />
      <Rig>
        <Rings />
        <Suspense fallback={null}>
          {heroPanels.map((p, i) => (
            <BrowserPanel key={p.src} url={p.src} index={i} />
          ))}
          <Ready onReady={onReady} />
        </Suspense>
      </Rig>
      <Particles />
    </Canvas>
  );
}
