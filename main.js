import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GrannyKnot } from 'three/examples/jsm/curves/CurveExtras.js';

// Szene, Kamera und Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Anpassung der Fenstergröße
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Ambient Light für Grundbeleuchtung und Directional Light als Hauptlichtquelle
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 20, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Wasserkühlung mit dynamischer Farbe
const curve = new GrannyKnot();
const geometryCurve = new THREE.TubeGeometry(curve, 100, 2, 8, true);
const materialCurve = new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true, side: THREE.DoubleSide });
const tube = new THREE.Mesh(geometryCurve, materialCurve);
scene.add(tube);

// Dynamischer Farbwechsel für die Wasserkühlung
function updateCurveColor() {
  const time = clock.getElapsedTime();
  const colorIntensity = (Math.sin(time * 3) + 1) / 2; // Farbwert zwischen 0 und 1
  materialCurve.color.setHSL(colorIntensity * 0.7, 1, 0.5);
}

// Laden des GLB-Modells
const loader = new GLTFLoader();
let pc;
loader.load('./uploads_files_2569780_lian+li+pc.glb', (gltf) => {
  pc = gltf.scene;
  pc.scale.setScalar(300);
  pc.position.set(0, -500, 0);
  scene.add(pc);
}, undefined, (error) => {
  console.error(error);
});

// Leichte, schwebende Animation für den PC
function updatePcPosition() {
  if (pc) {
    const time = clock.getElapsedTime();
    pc.position.y = Math.sin(time * 1.5) * 0.5 - 5;
    pc.rotation.y = time * 0.5; // langsame Rotation für einen realistischen Effekt
  }
}

// Kamera als Achterbahn entlang der Kurve
function updateCamera() {
  const time = clock.getElapsedTime();
  const loopTime = 20;
  const t = (time % loopTime) / loopTime;
  const t2 = ((time + 0.1) % loopTime) / loopTime;

  const pos = tube.geometry.parameters.path.getPointAt(t);
  const pos2 = tube.geometry.parameters.path.getPointAt(t2);

  camera.position.copy(pos);
  camera.lookAt(pos2);
}

// Haupt-Animationsfunktion
function animate() {
  updateCamera();
  updateCurveColor();
  updatePcPosition();

  renderer.render(scene, camera);
}
