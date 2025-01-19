import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {GrannyKnot} from 'three/examples/jsm/curves/CurveExtras.js';

// Projekt von Simon, Moritz und Lukas

const VERSCHIEBUNG_X = 100;
const VERSCHIEBUNG_Y = 0;
const VERSCHIEBUNG_Z = -252;

const TESTTIME = 40;
const ACTUALTIME = TESTTIME;

// Szene, Kamera und Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({antialias: true});
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
    new THREE.Vector3(-10, 0, 0),
);

const cubicBezierCurve = new THREE.CubicBezierCurve3(
    // new THREE.Vector3(-10, 0, 0),
    line.v2,
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(-20, 0, 0),
    new THREE.Vector3(-20, -10, 0),
)

const line2 = new THREE.LineCurve3(
    new THREE.Vector3(-20, -10, 0),
    new THREE.Vector3(-20, -30, 0),
);

const cubicBezierCurve2 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-20, -30, 0),
    new THREE.Vector3(-20, -40, 0),
    new THREE.Vector3(-30, -50, 0),
    new THREE.Vector3(-40, -50, 0)
);

const cubicBezierCurve3 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-40, -50, 0),
    new THREE.Vector3(-40, -50, 0),
    new THREE.Vector3(-50, -50, 0),
    new THREE.Vector3(-50, -50, 10)
);

const line3 = new THREE.LineCurve3(
    new THREE.Vector3(-50, -50, 10),
    new THREE.Vector3(-50, -50, 50)
);

const cubicBezierCurve4 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-50, -50, 50),
    new THREE.Vector3(-50, -50, 50),
    new THREE.Vector3(-50, -50, 60),
    new THREE.Vector3(-60, -50, 60)
);

const line4 = new THREE.LineCurve3(
    new THREE.Vector3(-60, -50, 60),
    new THREE.Vector3(-120, -50, 60)
);

const cubicBezierCurve5 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-120, -50, 60),
    new THREE.Vector3(-120, -50, 60),
    new THREE.Vector3(-130, -50, 60),
    new THREE.Vector3(-130, -60, 60)
);

const line5 = new THREE.LineCurve3(
    new THREE.Vector3(-130, -60, 60),
    new THREE.Vector3(-130, -70, 60)
);

const cubicBezierCurve6 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-130, -70, 60),
    new THREE.Vector3(-130, -70, 60),
    new THREE.Vector3(-130, -80, 60),
    new THREE.Vector3(-120, -80, 60)
);

const cubicBezierCurve7 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-120, -80, 60),
    new THREE.Vector3(-120, -80, 60),
    new THREE.Vector3(-110, -80, 60),
    new THREE.Vector3(-110, -80, 70)
);

const line6 = new THREE.LineCurve3(
    new THREE.Vector3(-110, -80, 70),
    new THREE.Vector3(-110, -80, 280)
);

const cubicBezierCurve8 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-110, -80, 280),
    new THREE.Vector3(-110, -80, 280),
    new THREE.Vector3(-110, -80, 290),
    new THREE.Vector3(-120, -80, 290)
);

const cubicBezierCurve9 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-120, -80, 290),
    new THREE.Vector3(-120, -80, 290),
    new THREE.Vector3(-130, -80, 290),
    new THREE.Vector3(-130, -90, 290)
);

const line7 = new THREE.LineCurve3(
    new THREE.Vector3(-130, -90, 290),
    new THREE.Vector3(-130, -180, 290)
);

const cubicBezierCurve10 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-130, -180, 290),
    new THREE.Vector3(-130, -180, 290),
    new THREE.Vector3(-130, -190, 290),
    new THREE.Vector3(-140, -190, 290)
);

const cubicBezierCurve11 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-140, -190, 290),
    new THREE.Vector3(-140, -190, 290),
    new THREE.Vector3(-150, -190, 290),
    new THREE.Vector3(-150, -190, 300)
);

const line8 = new THREE.LineCurve3(
    new THREE.Vector3(-150, -190, 300),
    new THREE.Vector3(-150, -190, 340)
);

const cubicBezierCurve12 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-150, -190, 340),
    new THREE.Vector3(-150, -190, 340),
    new THREE.Vector3(-150, -190, 350),
    new THREE.Vector3(-140, -190, 350)
);

const cubicBezierCurve13 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-140, -190, 350),
    new THREE.Vector3(-140, -190, 350),
    new THREE.Vector3(-130, -190, 350),
    new THREE.Vector3(-130, -180, 350)
);

const line9 = new THREE.LineCurve3(
    new THREE.Vector3(-130, -180, 350),
    new THREE.Vector3(-130, -150, 350)
);

const cubicBezierCurve14 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-130, -150, 350),
    new THREE.Vector3(-130, -150, 350),
    new THREE.Vector3(-130, -140, 350),
    new THREE.Vector3(-120, -140, 350)
);

const line10 = new THREE.LineCurve3(
    new THREE.Vector3(-120, -140, 350),
    new THREE.Vector3(0, -140, 350)
);

const cubicBezierCurve15 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -140, 350),
    new THREE.Vector3(0, -140, 350),
    new THREE.Vector3(10, -140, 350),
    new THREE.Vector3(10, -150, 350)
);

const line11 = new THREE.LineCurve3(
    new THREE.Vector3(10, -150, 350),
    new THREE.Vector3(10, -340, 350)
);

const cubicBezierCurve16 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(10, -340, 350),
    new THREE.Vector3(10, -340, 350),
    new THREE.Vector3(10, -350, 350),
    new THREE.Vector3(0, -350, 350)
);

const cubicBezierCurve17 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -350, 350),
    new THREE.Vector3(0, -350, 350),
    new THREE.Vector3(-10, -350, 350),
    new THREE.Vector3(-10, -350, 360)
);

const cubicBezierCurve18 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-10, -350, 360),
    new THREE.Vector3(-10, -350, 360),
    new THREE.Vector3(-10, -350, 370),
    new THREE.Vector3(-20, -350, 370)
);

const line12 = new THREE.LineCurve3(
    new THREE.Vector3(-20, -350, 370),
    new THREE.Vector3(-100, -350, 370)
);

const cubicBezierCurve19 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-100, -350, 370),
    new THREE.Vector3(-100, -350, 370),
    new THREE.Vector3(-110, -350, 370),
    new THREE.Vector3(-110, -350, 360)
);

const line13 = new THREE.LineCurve3(
    new THREE.Vector3(-110, -350, 360),
    new THREE.Vector3(-110, -350, 150)
);

const cubicBezierCurve20 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-110, -350, 150),
    new THREE.Vector3(-110, -350, 150),
    new THREE.Vector3(-110, -350, 140),
    new THREE.Vector3(-110, -360, 140)
);

const line14 = new THREE.LineCurve3(
    new THREE.Vector3(-110, -360, 140),
    new THREE.Vector3(-110, -400, 140)
);

const cubicBezierCurve21 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-110, -400, 140),
    new THREE.Vector3(-110, -400, 140),
    new THREE.Vector3(-110, -410, 140),
    new THREE.Vector3(-110, -410, 130)
);

const line15 = new THREE.LineCurve3(
    new THREE.Vector3(-110, -410, 130),
    new THREE.Vector3(-110, -410, 50)
);

const cubicBezierCurve22 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-110, -410, 50),
    new THREE.Vector3(-110, -410, 50),
    new THREE.Vector3(-110, -410, 40),
    new THREE.Vector3(-100, -410, 40)
);

const line16 = new THREE.LineCurve3(
    new THREE.Vector3(-100, -410, 40),
    new THREE.Vector3(-60, -410, 40)
);

const cubicBezierCurve23 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-60, -410, 40),
    new THREE.Vector3(-60, -410, 40),
    new THREE.Vector3(-50, -410, 40),
    new THREE.Vector3(-50, -410, 30)
);

const cubicBezierCurve24 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-50, -410, 30),
    new THREE.Vector3(-50, -410, 30),
    new THREE.Vector3(-50, -410, 20),
    new THREE.Vector3(-50, -400, 20)
);

const line17 = new THREE.LineCurve3(
    new THREE.Vector3(-50, -400, 20),
    new THREE.Vector3(-50, -200, 20)
);

const cubicBezierCurve25 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-50, -200, 20),
    new THREE.Vector3(-50, -200, 20),
    new THREE.Vector3(-50, -190, 20),
    new THREE.Vector3(-60, -190, 20)
);

const line18 = new THREE.LineCurve3(
    new THREE.Vector3(-60, -190, 20),
    new THREE.Vector3(-100, -190, 20)
);

const cubicBezierCurve26 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-100, -190, 20),
    new THREE.Vector3(-100, -190, 20),
    new THREE.Vector3(-110, -190, 20),
    new THREE.Vector3(-110, -180, 20)
);

const line19 = new THREE.LineCurve3(
    new THREE.Vector3(-110, -180, 20),
    new THREE.Vector3(-110, -80, 20)
);

const cubicBezierCurve27 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-110, -80, 20),
    new THREE.Vector3(-110, -80, 20),
    new THREE.Vector3(-110, -70, 20),
    new THREE.Vector3(-100, -70, 20)
);

const line20 = new THREE.LineCurve3(
    new THREE.Vector3(-100, -70, 20),
    new THREE.Vector3(0, -70, 20)
);

const cubicBezierCurve28 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -70, 20),
    new THREE.Vector3(0, -70, 20),
    new THREE.Vector3(10, -70, 20),
    new THREE.Vector3(10, -60, 20)
);

const line21 = new THREE.LineCurve3(
    new THREE.Vector3(10, -60, 20),
    new THREE.Vector3(10, -10, 20)
);

const cubicBezierCurve29 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(10, -10, 20),
    new THREE.Vector3(10, -10, 20),
    new THREE.Vector3(10,  0, 20),
    new THREE.Vector3(10, 0, 10)
);

const cubicBezierCurve30 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(10, 0, 10),
    new THREE.Vector3(10, 0, 10),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(0, 0, 0)
);




const curve = new THREE.CurvePath();
curve.curves = Array(
    line, cubicBezierCurve,
    line2, cubicBezierCurve2,
    cubicBezierCurve3, line3, cubicBezierCurve4,
    line4, cubicBezierCurve5, line5, cubicBezierCurve6,
    cubicBezierCurve7, line6, cubicBezierCurve8,
    cubicBezierCurve9, line7, cubicBezierCurve10,
    cubicBezierCurve11, line8, cubicBezierCurve12,
    cubicBezierCurve13, line9, cubicBezierCurve14,
    line10, cubicBezierCurve15,
    line11, cubicBezierCurve16,
    cubicBezierCurve17, cubicBezierCurve18, line12,
    cubicBezierCurve19, line13,
    cubicBezierCurve20, line14, cubicBezierCurve21,
    line15, cubicBezierCurve22, line16,
    cubicBezierCurve23, cubicBezierCurve24, line17,
    cubicBezierCurve25, line18, cubicBezierCurve26,
    line19, cubicBezierCurve27, line20,
    cubicBezierCurve28, line21, cubicBezierCurve29,
    cubicBezierCurve30
    );

const geometryCurve = new THREE.TubeGeometry(curve, 400, 3 , 15, false);
const materialCurve = new THREE.MeshStandardMaterial({color: 0xFFFFFF, wireframe: true, side: THREE.DoubleSide});
const tube = new THREE.Mesh(geometryCurve, materialCurve);
scene.add(tube);
tube.position.set(VERSCHIEBUNG_X, VERSCHIEBUNG_Y, VERSCHIEBUNG_Z);
tube.updateMatrix();
// tube.visible = false;
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
loader.load('./untitled.glb', (gltf) => {
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
    const loopTime = ACTUALTIME;
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
    console.log(pos, pos2)

    camera.position.copy(pos);
    const tangent = tube.geometry.parameters.path.getTangentAt(t);
    const lookAtTangent = tube.geometry.parameters.path.getTangentAt(t2);

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, -1), // Standardrichtung der Kamera
        lookAtTangent.clone().normalize() // Richtung entlang der Kurve
    );

    camera.quaternion.copy(quaternion);
}

// Haupt-Animationsfunktion
function animate() {
    updateCamera();
    // updateCurveColor();

    console.log(tube.position);

    renderer.render(scene, camera);
}
