// 🌐 Import Three.js core and your custom modules
import * as THREE from 'three';
import { createHeaders } from './components/headers.js';
import { createVehicle } from './components/vehicle.js';

const scene = new THREE.Scene(); // Create scene container

// 🎥 CAMERA SETUP
const camera = new THREE.PerspectiveCamera(
  60, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping
  1000 // Far clipping
);
camera.position.set(50, 10, 60); // Pull back and elevate the camera
camera.lookAt(new THREE.Vector3(50, 2, 0)); // Focus on your "Experience" header

// 🚗 VEHICLE MESH
const vehicle = createVehicle(); // Load custom mesh from vehicle.js
scene.add(vehicle); // Add vehicle to the scene

// 🖼️ RENDERER CONFIGURATION
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Optional: Enables shadows if used
document.body.appendChild(renderer.domElement); // Append to webpage

// 💡 LIGHTING
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft fill light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Sunlight-like
directionalLight.position.set(0, 20, 20);
directionalLight.castShadow = true;
scene.add(directionalLight);

// ✅ FLOOR / ROAD SURFACE
const floorGeometry = new THREE.PlaneGeometry(200, 200); // Width × Depth
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x5A7CA5, // Slate gray (bluish tint)
  roughness: 1,    // Matte finish, no gloss

});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Lay flat on the XZ plane
floor.position.y = 0; // Align with base of scene
floor.receiveShadow = true;
scene.add(floor);

// 🏷️ ADD HEADER ELEMENTS
createHeaders().then((headerGroup) => {
  scene.add(headerGroup); // Async fetch headers and add to scene
});

// 🕹️ INPUT TRACKING
const keys = {
  ArrowUp: false, ArrowDown: false,
  ArrowLeft: false, ArrowRight: false,
  w: false, a: false, s: false, d: false,
};

window.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = true; // Press = true
});

window.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = false; // Release = false
});

// 🚀 MOVEMENT PARAMETERS
const speed = 0.5; // Forward/backward movement speed
const rotationSpeed = 0.05; // Y-axis turning speed

// 🔁 ANIMATION LOOP — Called every frame (~60 fps)
function animate() {
  requestAnimationFrame(animate);

  // 🚗 VEHICLE CONTROLS
  if (keys.ArrowUp || keys.w) vehicle.translateZ(-speed); // Move forward
  if (keys.ArrowDown || keys.s) vehicle.translateZ(speed); // Move backward
  if (keys.ArrowLeft || keys.a) vehicle.rotation.y += rotationSpeed; // Turn left
  if (keys.ArrowRight || keys.d) vehicle.rotation.y -= rotationSpeed; // Turn right

  renderer.render(scene, camera); // Draw everything from camera's POV
}
animate(); // Start the loop

// 📐 HANDLE WINDOW RESIZING
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Update aspect
  camera.updateProjectionMatrix(); // Recalculate perspective
  renderer.setSize(window.innerWidth, window.innerHeight); // Match new size
});