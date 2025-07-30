import * as THREE from 'three';

export function createRamp() {
  const geo = new THREE.BoxGeometry(5, 0.5, 3);
  const mat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  const ramp = new THREE.Mesh(geo, mat);
  ramp.rotation.x = -Math.PI / 6;
  ramp.position.set(20, 0.25, 0);
  ramp.castShadow = true;
  return ramp;
}