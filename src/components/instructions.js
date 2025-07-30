import * as THREE from 'three';

export function createInstructions(font) {
  const instructionGroup = new THREE.Group();

  // 📜 "Use" instruction text
  const useShapes = font.generateShapes('Use', 1.2);
  const useGeometry = new THREE.ShapeGeometry(useShapes);
  const useMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const useMesh = new THREE.Mesh(useGeometry, useMaterial);
  useMesh.rotation.x = -Math.PI / 2;
  useMesh.position.set(-8, 0.02, -15);
  instructionGroup.add(useMesh);

  // 📜 Tail Text
  const tailShapes = font.generateShapes(' keys to move around', 1.2);
  const tailGeometry = new THREE.ShapeGeometry(tailShapes);
  const tailMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const tailMesh = new THREE.Mesh(tailGeometry, tailMaterial);
  tailMesh.rotation.x = -Math.PI / 2;
  tailMesh.position.set(4, 0.02, -15);
  instructionGroup.add(tailMesh);

  // ⌨️ Arrow Block Layout (plus formation)
  const blockMaterial = new THREE.MeshStandardMaterial({ color: 0x33543 });
  const spacing = 2.5;

const arrowLayout = [
  { char: '↑', x: 0, z: -2.5 },  // Up arrow above center
  { char: '↓', x: 0, z: 0 },     // Down arrow center
  { char: '←', x: -2.5, z: 0 },  // Left arrow left of center
  { char: '→', x: 2.5, z: 0 },   // Right arrow right of center
];

  arrowLayout.forEach(({ char, x, z }) => {
  const block = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.5, 2),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  block.position.set(x, 0.25, z - 15); // base Z shift
  instructionGroup.add(block);
});

  return instructionGroup;
}