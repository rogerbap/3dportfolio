// contactZone.js
import * as THREE from 'three';
import gsap from 'gsap';

export function createContactZone(scene, position) {
  // Main Zone Box
  const geometry = new THREE.BoxGeometry(10, 10, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: '#66ff66' });
  const box = new THREE.Mesh(geometry, material);
  box.position.copy(position);
  box.name = 'ContactZone';
  scene.add(box);

  // Starry Background (optional texture)
  const loader = new THREE.TextureLoader();
  loader.load('/textures/starscape.jpg', (texture) => {
    scene.background = texture;
  });

  // Glowing Mail Orb
  const orbGeo = new THREE.SphereGeometry(1.5, 64, 64);
  const orbMat = new THREE.MeshStandardMaterial({
    color: '#66ff66',
    emissive: '#00cc66',
    emissiveIntensity: 0.6
  });
  const orb = new THREE.Mesh(orbGeo, orbMat);
  orb.position.set(position.x, position.y + 2.5, position.z);
  orb.name = 'MailOrb';
  scene.add(orb);

  // QR Halo Ring
  loader.load('/textures/qr-code.png', (qrTexture) => {
    const ringGeo = new THREE.TorusGeometry(2, 0.2, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ map: qrTexture });
    const halo = new THREE.Mesh(ringGeo, ringMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.copy(orb.position);
    halo.name = 'QRHalo';
    scene.add(halo);

    // Continuous rotation animation
    gsap.to(halo.rotation, {
      z: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: 'linear'
    });
  });

  // Floating pulse on orb
  gsap.to(orb.scale, {
    x: 1.1, y: 1.1, z: 1.1,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}