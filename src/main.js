// 🌐 Import Three.js core and your custom modules
import * as THREE from 'three';
import { createHeaders } from './components/headers.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { createRocks } from './components/rocks.js';
import { createInstructions } from './components/instructions.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 🎮 CONTROL STATE
const keys = {
  ArrowUp: false, ArrowDown: false,
  ArrowLeft: false, ArrowRight: false,
  w: false, a: false, s: false, d: false,
};

window.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

// 🧱 SCENE SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(50, 10, 60);
camera.lookAt(new THREE.Vector3(50, 2, 0));

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 💡 LIGHTING
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 20, 20);
directionalLight.castShadow = true;
scene.add(directionalLight);

// 🛣️ FLOOR
const floorGeometry = new THREE.PlaneGeometry(200, 200);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x5A7CA5,
  roughness: 1,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor);

// 🏔️ ROCKS
scene.add(createRocks(20));

// 🏷️ HEADERS
createHeaders().then((headerGroup) => {
  scene.add(headerGroup);
});

// ✍️ FONT TEXT
const fontLoader = new FontLoader();
fontLoader.load(
  new URL('./assets/fonts/Helvetiker_Regular.typeface.json', import.meta.url),
  (font) => {
    const nameGeometry = new TextGeometry('Roger Baptiste', {
      font,
      size: 4,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.1,
      bevelSegments: 3,
    });

    const nameMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffcc,
      metalness: 0.5,
      roughness: 0.2,
    });

    const nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);
    nameMesh.position.set(20, 0.5, 20);
    nameMesh.castShadow = true;
    nameMesh.scale.set(1, 1, 0.03);
    scene.add(nameMesh);

    scene.add(createInstructions(font));
  }
);

// 🚗 LOAD VEHICLE MODEL
const gltfLoader = new GLTFLoader();
let vehicle;

gltfLoader.load('/src/assets/models/alfa_romeo_stradale_1967.glb', (gltf) => {
  vehicle = gltf.scene;
  vehicle.position.set(0, 0, 0);
  vehicle.scale.set(20, 20, 20);
  vehicle.castShadow = true;
  scene.add(vehicle);

  animate(); // 🟢 Start only after model is added
});

// 🎞️ ANIMATION LOOP
const speed = 0.5;
const rotationSpeed = 0.05;

function animate() {
  requestAnimationFrame(animate);

  if (vehicle) {
    const followOffset = new THREE.Vector3(0, 5, 10);
    const targetCameraPos = vehicle.position.clone().add(followOffset);
    camera.position.lerp(targetCameraPos, 0.1);
    camera.lookAt(vehicle.position);

    if (keys.ArrowUp || keys.w) vehicle.translateZ(-speed);
    if (keys.ArrowDown || keys.s) vehicle.translateZ(speed);
    if (keys.ArrowLeft || keys.a) vehicle.rotation.y += rotationSpeed;
    if (keys.ArrowRight || keys.d) vehicle.rotation.y -= rotationSpeed;
  }

  renderer.render(scene, camera);
}

// 📐 WINDOW RESIZE HANDLER
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});