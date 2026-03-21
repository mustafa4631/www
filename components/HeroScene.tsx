"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  LIGHT BEAM — mouse-tracking line from cursor toward sphere center */
/* ------------------------------------------------------------------ */

function LightBeam() {

  const dotRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const mouse = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const opacity = useRef(0.35);
  const targetOpacity = useRef(0.35);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints([
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(0, 0, 0),
    ]);
    return geo;
  }, []);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#3dd68c",
        transparent: true,
        opacity: 0.35,
      }),
    []
  );

  const lineObj = useMemo(
    () => new THREE.Line(lineGeo, lineMat),
    [lineGeo, lineMat]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / size.width - 0.5) * 2;
      mouse.current.y = -(e.clientY / size.height - 0.5) * 2;

      // Reset opacity on move
      targetOpacity.current = 0.35;

      // Reset idle timer
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        targetOpacity.current = 0;
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [size.width, size.height]);

  useFrame(() => {
    // Smooth lerp toward mouse
    smoothPos.current.x += (mouse.current.x - smoothPos.current.x) * 0.08;
    smoothPos.current.y += (mouse.current.y - smoothPos.current.y) * 0.08;

    // Smooth opacity
    opacity.current += (targetOpacity.current - opacity.current) * 0.04;

    const positions = lineGeo.attributes.position as THREE.BufferAttribute;
    if (positions) {
      // Beam start (near camera, follows mouse)
      positions.setXYZ(0, smoothPos.current.x * 4, smoothPos.current.y * 4, 2);
      // Beam end (sphere center)
      positions.setXYZ(1, 0, 0, 0);
      positions.needsUpdate = true;
    }

    lineMat.opacity = opacity.current;

    // Move dot to beam start
    if (dotRef.current) {
      dotRef.current.position.set(
        smoothPos.current.x * 4,
        smoothPos.current.y * 4,
        2
      );
      const dotMat = dotRef.current.material as THREE.MeshBasicMaterial;
      dotMat.opacity = opacity.current * (0.8 / 0.35);
    }
  });

  return (
    <>
      <primitive object={lineObj} />
      {/* Small glow dot at beam origin */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#3dd68c" transparent opacity={0.8} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  WIREFRAME SPHERE — with scroll-based recession                    */
/* ------------------------------------------------------------------ */

function WireframeSphere() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const { size } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / size.width - 0.5;
      mouse.current.y = -(e.clientY / size.height - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size.width, size.height]);

  useEffect(() => {
    const handleScroll = () => {
      scrollProgress.current = Math.min(
        window.scrollY / window.innerHeight,
        1
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ clock }) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const torus = torusRef.current;
    const group = groupRef.current;
    const p = scrollProgress.current;

    if (outer) {
      outer.rotation.y += (mouse.current.x * 0.8 - outer.rotation.y) * 0.05;
      outer.rotation.x += (mouse.current.y * 0.5 - outer.rotation.x) * 0.05;
      outer.rotation.y += 0.001;

      // Scroll recession — outer sphere
      const targetZ = -p * 8;
      const targetScale = 1 - p * 0.4;
      outer.position.z += (targetZ - outer.position.z) * 0.06;
      const currentScale = outer.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.06;
      outer.scale.setScalar(newScale);
    }

    if (inner) {
      inner.rotation.y +=
        (mouse.current.x * 0.6 - inner.rotation.y) * 0.035;
      inner.rotation.x +=
        (mouse.current.y * 0.35 - inner.rotation.x) * 0.035;
      inner.rotation.y += 0.0007;

      // Scroll recession — inner sphere (faster = more depth)
      const targetZ = -p * 10;
      const targetScale = 1 - p * 0.5;
      inner.position.z += (targetZ - inner.position.z) * 0.06;
      const currentScale = inner.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.06;
      inner.scale.setScalar(newScale);
    }

    if (torus) {
      torus.rotation.y +=
        (mouse.current.x * 0.8 - torus.rotation.y) * 0.05;
      torus.rotation.x +=
        (mouse.current.y * 0.5 - torus.rotation.x) * 0.05;
      torus.rotation.y += 0.001;

      // Scroll recession — torus
      const targetZ = -p * 6;
      const targetScale = 1 - p * 0.3;
      torus.position.z += (targetZ - torus.position.z) * 0.06;
      const currentScale = torus.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.06;
      torus.scale.setScalar(newScale);
    }

    if (group) {
      group.position.y =
        Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer sphere */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#3dd68c"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Inner sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial
          color="#2a9e6e"
          wireframe
          transparent
          opacity={0.10}
        />
      </mesh>

      {/* Outer ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[2.8, 0.008, 16, 120]} />
        <meshBasicMaterial color="#1a6b4a" transparent opacity={0.20} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  CANVAS EXPORT                                                      */
/* ------------------------------------------------------------------ */

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.5]}
      gl={{ toneMapping: 0, alpha: true }}
      frameloop="always"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} color="#3dd68c" intensity={0.5} />
      <WireframeSphere />
      <LightBeam />
    </Canvas>
  );
}
