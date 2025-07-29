import * as THREE from 'three';

export function createRocks(count = 10) {
  const group = new THREE.Group();

  const geo = new THREE.DodecahedronGeometry(0.5);
  const mat = new THREE.MeshStandardMaterial({ color: 0x777777 });

  for (let i = 0; i < count; i++) {
    const rock = new THREE.Mesh(geo, mat);
    rock.position.set(
      Math.random() * 60 - 30, // spread across X
      0.25,
      Math.random() * 30 - 15  // spread across Z
    );
    rock.name = `rock_${i}`;
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);
  }

  return group;
}