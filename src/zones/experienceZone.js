// experienceZone.js
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Creates interactive panels in the experience zone.
 * @param {THREE.Scene} scene - The Three.js scene to add panels to.
 * @param {Array} entries - Array of objects with label, pos, color, texturePath, and details.
 */
export function createExperienceZone(scene, entries) {
  const loader = new THREE.TextureLoader();

  entries.forEach(({ label, pos, color, texturePath, details }) => {
    // Load texture if available, otherwise use color
    let material;
    if (texturePath) {
      const texture = loader.load(texturePath);
      material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    } else {
      material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide });
    }

    // Create panel mesh
    const geometry = new THREE.PlaneGeometry(6, 3);
    const panel = new THREE.Mesh(geometry, material);
    panel.position.copy(pos);
    panel.name = label;

    // Animation loop (gentle rotation and scale pulse)
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(panel.rotation, { y: 0.1, duration: 1 })
      .to(panel.scale, { x: 1.05, y: 1.05, duration: 1 }, '<');

    // Set initial hover state
    panel.userData.hovered = false;

    // Attach project details for click events
    panel.userData.details = details;

    // Add to scene
    scene.add(panel);
  });
}