import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export async function createHeaders() {
  const loader = new FontLoader();
  const font = await loader.loadAsync(
    new URL('../assets/fonts/Helvetiker_Regular.typeface.json', import.meta.url)
  );

  const group = new THREE.Group(); // Container for all header meshes

  // 🏷️ Section Titles & Positions
  const headers = [
{ text: 'Experience', position: [50, 2, 0] },
    { text: 'Projects', position: [30, 2, -10] },
    { text: 'Skills', position: [70, 2, -10] },
    { text: 'Contact', position: [50, 2, -20] },
  ];

  headers.forEach(({ text, position }) => {
    // 🔤 Create text geometry from string
    const geometry = new TextGeometry(text, {
      font: font,
      size: 2,
      height: 0.3,
      curveSegments: 12,
      bevelEnabled: false,
    });

    // 🎨 Stylize material
    const material = new THREE.MeshStandardMaterial({
      color: 0xffcc00,     // Golden yellow — tweak for theme
      metalness: 0.3,      // Slight metallic feel
      roughness: 0.8,      // Matte-ish finish
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position); // Drop into scene
    mesh.castShadow = true;         // Nice touch for depth
    group.add(mesh);                // Add to group
  });

  return group; // Return group for use in main.js
}