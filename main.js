import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
const directionalLight = new THREE.AmbientLight( 0xffffff, 40 );
directionalLight.position.z = 7;
directionalLight.position.y=20
directionalLight.castShadow = true
scene.add( directionalLight );


const loader = new GLTFLoader();

loader.load( './uploads_files_2569780_lian+li+pc.glb', function ( gltf ) {
    console.log("test")
    scene.add( gltf.scene );

}, undefined, function ( error ) {

    console.error( error );

} );

camera.position.z = -5;
camera.position.x = 5;
var rot = 0;
camera.rotation.x = 3
camera.rotation.z = 3.2

function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    camera.rotation.y = .7

    rot += 0.01
    console.log(rot)
    renderer.render( scene, camera );

}