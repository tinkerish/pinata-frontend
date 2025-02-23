import React, { forwardRef, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import plateTexture from "../../assets/TerrazzoSlab018/TerrazzoSlab018_Sphere.png";
const CustomIrregularShape = forwardRef(
  ({ position, color, scale, colorMap }, ref) => {
    console.log(colorMap);
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 8, 0, Math.PI * 2, false);

    const numPoints = 30;
    const baseRadius = 8; // Base radius of the circle

    // Add controlled irregularities to the points around the circle
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;

      // Add smooth perturbations for more controlled irregularity
      // const radius = baseRadius + Math.sin(angle * 2) * 0.5 + Math.cos(angle * 3) * 0.3; // Smooth wave-like perturbations

      // const x = radius * Math.cos(angle);
      // const y = radius * Math.sin(angle);
      // points.push(new THREE.Vector2(x, y)); // Generate the points with controlled perturbation
    }

    // Define the irregular circular path
    // shape.splineThru(points);
    return (
      <mesh position={position} scale={scale} ref={ref}>
        <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: false }]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    );
  }
);

const Cycle = ({ colorMap }) => {
  const RADIUS = 25; // Radius of the circle
  const SHAPES = 5; // Number of shapes
  const colors = ["#409198", "red", "yellow", "black", "white"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const speedMultiplier = 0.2;

  // Calculate points for the circular path
  const points = [];
  for (let i = 0; i < SHAPES; i++) {
    // const angle = (i / SHAPES) * Math.PI * 2;
    const angle = (i * 2 * Math.PI) / SHAPES + Math.PI / 2;

    const x = RADIUS * Math.cos(angle);
    const y = RADIUS * Math.sin(angle);
    points.push(new THREE.Vector3(x, y, 0));
  }

  // Reference array for the shapes
  const shapesRef = useRef([]);

  // Animation logic
  useFrame(() => {
    const time = Date.now() * 0.001 * speedMultiplier; // Track the time for rotation
    const index = Math.floor(time * 2) % SHAPES; // Control the index of the active shape

    // Update the current index based on time
    setCurrentIndex(index);

    // Make one shape bigger at a time based on index
    points.forEach((_, i) => {
      const scaleValue = i === index ? 1.3 : 1; // Make the active shape bigger
      shapesRef.current[i].scale.set(scaleValue, scaleValue, 1);
    });
  });
  const curve = new THREE.CatmullRomCurve3(points);

  // Get the points along the curve (to draw the path)
  const pathPoints = curve.getPoints(50); // Get 5
  // Create the path by connecting the points
  const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const pathMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

  const path = new THREE.LineLoop(pathGeometry, pathMaterial);
  return (
    <>
      <primitive object={path} />
      {points.map((point, i) => (
        <CustomIrregularShape
          key={i}
          position={[point.x, point.y, point.z]}
          color={colors[i]}
          scale={new THREE.Vector3(1, 1, 1)}
          colorMap={colorMap}
          ref={(el) => (shapesRef.current[i] = el)} // Store the reference for each shape
        />
      ))}
    </>
  );
};

const FeatureCycle = () => {
  const colorMap = useLoader(THREE.TextureLoader, plateTexture);
  return (
    <Canvas camera={{ position: [0, 0, 48] }} style={{ height: "100vh" }}>
      <ambientLight />
      <Cycle colorMap={colorMap} />
    </Canvas>
  );
};

export default FeatureCycle;
