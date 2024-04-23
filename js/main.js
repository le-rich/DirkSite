import * as THREE from 'three';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    alpha: true
});

var webGLContainer = document.getElementById('WebGLCanvasWrapper');
webGLContainer.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

// Add a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const clock = new THREE.Clock()

const tick = () => 
{
    const elapsedTime = clock.getElapsedTime();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;


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