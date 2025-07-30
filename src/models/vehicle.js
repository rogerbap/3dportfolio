// import * as THREE from 'three';

// export function createVehicle() {
//   const group = new THREE.Group();

//   // Car Body
//   const bodyGeo = new THREE.BoxGeometry(2, 0.5, 1);
//   const bodyMat = new THREE.MeshStandardMaterial({ color: 0xff4444 });
//   const body = new THREE.Mesh(bodyGeo, bodyMat);
//   body.position.y = 0.5;
//   group.add(body);

//   // Wheels
//   const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 16);
//   const wheelMat = new THREE.MeshStandardMaterial({ color: 0x000000 });

//   const wheelPositions = [
//     [-0.8, 0.25, 0.5],
//     [0.8, 0.25, 0.5],
//     [-0.8, 0.25, -0.5],
//     [0.8, 0.25, -0.5],
//   ];

//   wheelPositions.forEach(([x, y, z]) => {
//     const wheel = new THREE.Mesh(wheelGeo, wheelMat);
//     wheel.rotation.z = Math.PI / 2;
//     wheel.position.set(x, y, z);
//     group.add(wheel);
//   });

//   group.position.set(0, 0, 0);
//   group.name = 'vehicle';

//   return group;
// }