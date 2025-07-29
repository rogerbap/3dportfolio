// skillsZone.js
import * as THREE from 'three';
import gsap from 'gsap';

export function createSkillsZone(scene, positions) {
  positions.forEach(({ label, pos }) => {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(pos);
    sphere.name = label;
    scene.add(sphere);

    gsap.to(sphere.position, {
      y: pos.y + 1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
}