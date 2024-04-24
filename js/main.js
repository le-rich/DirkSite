import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0)
const renderer = new THREE.WebGLRenderer({
    alpha: true
});

var webGLContainer = document.getElementById('WebGLCanvasWrapper');
webGLContainer.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new GLTFLoader();
let dirkLogo = null;

loader.load(
    'assets/3d/Dirk3DLogoFull.glb', // Path to your GLB file
    function (gltf) {
        // Called when the model is loaded
        const newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, metalness: 0.0, roughness: 1, opacity: 1, transparent: true, side: THREE.DoubleSide});
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                // Adjusting the existing material
                child.material = newMaterial;
            }
        });
        gltf.scene.position.set(0,0,-5)
        dirkLogo = gltf.scene;
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Optional: console logging loading progress
    },
    function (error) {
        console.log('An error happened'); // Optional: console logging loading errors
    }
);
  

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 1, 1); // coming from the top
scene.add(directionalLight);

// // Add a cube
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

const clock = new THREE.Clock()

const tick = () => 
{
    const elapsedTime = clock.getElapsedTime();
    // dirkLogo.rotation.x += 0.01;
    // dirkLogo.rotation.y += 0.01;


    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();


// Responsive Listener
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}