import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GrannyKnot } from 'three/examples/jsm/curves/CurveExtras.js';

// Projekt von Simon, Moritz und Lukas

const VERSCHIEBUNG_X =  100;
const VERSCHIEBUNG_Y = 0;
const VERSCHIEBUNG_Z = -252;

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

const line = new THREE.LineCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(10, 0, 0),
);

const line1 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(20, 0, 0),
    new THREE.Vector3(20, 10, 0),

)

const line2 = new THREE.LineCurve3(
    new THREE.Vector3(20, 10, 0),
    new THREE.Vector3(20, 20, 0),
);

const line3 = new THREE.LineCurve3(
    new THREE.Vector3(10, 15, 10),
    new THREE.Vector3(10, 20, 15),
);

const curve = new THREE.CurvePath();
curve.curves = Array(line);

const geometryCurve = new THREE.TubeGeometry(curve, 200, 2, 8, false);
const materialCurve = new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true, side: THREE.DoubleSide });
const tube = new THREE.Mesh(geometryCurve, materialCurve);
scene.add(tube);
tube.position.set(VERSCHIEBUNG_X,VERSCHIEBUNG_Y,VERSCHIEBUNG_Z);
tube.updateMatrix();
tube.updateMatrixWorld();

// Dynamischer Farbwechsel für die Wasserkühlung
function updateCurveColor() {
  const time = clock.getElapsedTime();
  const colorIntensity = (Math.sin(time * 3) + 1) / 2; // Farbwert zwischen 0 und 1
  materialCurve.color.setHSL(colorIntensity * 0.7, 1, 0.5);
}

// Laden des GLB-Modells
const loader = new GLTFLoader();
let pc;
loader.load('./uploads_files_2569780_lian+li+pctransparent.glb', (gltf) => {
  pc = gltf.scene;
  pc.scale.setScalar(300);
  pc.position.set(0, -500, 0);
  scene.add(pc);
}, undefined, (error) => {
  console.error(error);
});

// Kamera als Achterbahn entlang der Kurve
function updateCamera() {
  const time = clock.getElapsedTime();
  const loopTime = 5;
  const t = (time % loopTime) / loopTime;
  const t2 = ((time + 0.1) % loopTime) / loopTime;

  const pos = tube.geometry.parameters.path.getPointAt(t);
  console.log(pos)
  pos.x += VERSCHIEBUNG_X;
  pos.y += VERSCHIEBUNG_Y;
  pos.z += VERSCHIEBUNG_Z;
  const pos2 = tube.geometry.parameters.path.getPointAt(t2);
  pos2.x += VERSCHIEBUNG_X;
  pos2.y += VERSCHIEBUNG_Y;
  pos2.z += VERSCHIEBUNG_Z;
  console.log(pos,pos2)

  camera.position.copy(pos);
  const tangent = tube.geometry.parameters.path.getTangentAt(t);
  const lookAtTangent = tube.geometry.parameters.path.getTangentAt(t2);

  const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1), // Standardrichtung der Kamera
      lookAtTangent.clone().normalize() // Richtung entlang der Kurve
  );

  camera.quaternion.copy(quaternion);
}

// Haupt-Animationsfunktion
function animate() {
  updateCamera();
  updateCurveColor();

  console.log(tube.position);

  renderer.render(scene, camera);
}
