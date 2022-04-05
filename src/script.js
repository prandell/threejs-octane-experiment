import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from 'dat.gui'

//Debug Console
// const gui = new dat.GUI();

//canvas
const canvas = document.querySelector('canvas.webgl')

/* Scene Setup and Base configuration
- Best settings were found by playing with debug console sliders
*/
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

//camera
const camera = new THREE.PerspectiveCamera(40, 1, 1, 2000);
camera.rotation.x = -2.7;
camera.rotation.y = 0.89;
camera.rotation.z = 2.8;
camera.position.x = 215
camera.position.y = 55;
camera.position.z = -159;
camera.zoom = 2;

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas});
renderer.setSize(window.innerWidth, window.innerWidth);

// Orbital Controls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener("change", renderer);

//Lights
const hlight = new THREE.AmbientLight(0x404040, 100);
scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 15.5);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight2.position.set(-2, 0.7, -0.3);
directionalLight2.castShadow = true;
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xf5885f, 4.5);
directionalLight3.position.set(-0.09, -0.04, -0.13);
directionalLight3.castShadow = true;
scene.add(directionalLight3);

// OPTIONAL EXTRA LIGHTS FOR DEBUG CONSOLE

// const light = new THREE.PointLight(0xc4c4c4, 0);
// light.position.set(0, 300, 500);
// scene.add(light);
// const light2 = new THREE.PointLight(0xc4c4c4, 0);
// light2.position.set(500, 100, 0);
// scene.add(light2);
// const light3 = new THREE.PointLight(0xc4c4c4, 10);
// light3.position.set(0, 100, -500);
// scene.add(light3);
// const light4 = new THREE.PointLight(0xc4c4c4, 10);
// light4.position.set(-500, 300, 500);
// scene.add(light4);

// DEBUG CONSOLE
/*
const lightFolder = gui.addFolder('Light');
lightFolder.add(light.position, 'x').min(-100).max(1000).step(1);
lightFolder.add(light.position, 'y').min(-1000).max(1000).step(1);
lightFolder.add(light.position, 'z').min(-1000).max(1000).step(1);
lightFolder.add(light, 'intensity').min(0).max(20).step(1);
const light2Folder = gui.addFolder('Light 2');
light2Folder.add(light2.position, 'x').min(-1000).max(0).step(1);
light2Folder.add(light2.position, 'y').min(-500).max(500).step(1);
light2Folder.add(light2.position, 'z').min(-500).max(500).step(1);
light2Folder.add(light2, 'intensity').min(0).max(20).step(1);
const light3Folder = gui.addFolder('Light 3');
light3Folder.add(light3.position, 'x').min(-250).max(250).step(1);
light3Folder.add(light3.position, 'y').min(0).max(500).step(1);
light3Folder.add(light3.position, 'z').min(-750).max(-250).step(1);
light3Folder.add(light3, 'intensity').min(0).max(20).step(1);
const light4Folder = gui.addFolder('Light 4');
light4Folder.add(light4.position, 'x').min(-750).max(-250).step(1);
light4Folder.add(light4.position, 'y').min(0).max(500).step(1);
light4Folder.add(light4.position, 'z').min(250).max(750).step(1);
light4Folder.add(light4, 'intensity').min(0).max(20).step(1);
const directionalLightFolder = gui.addFolder('Directional Light');
directionalLightFolder.add(directionalLight.position, 'x').min(-2).max(2).step(0.1);
directionalLightFolder.add(directionalLight.position, 'y').min(-2).max(2).step(0.1);
directionalLightFolder.add(directionalLight.position, 'z').min(-2).max(2).step(0.1);
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(20).step(0.5);
const directionalLightFolder2 = gui.addFolder('Directional Light 2');
directionalLightFolder2.add(directionalLight2.position, 'x').min(-2).max(2).step(0.1);
directionalLightFolder2.add(directionalLight2.position, 'y').min(-2).max(2).step(0.1);
directionalLightFolder2.add(directionalLight2.position, 'z').min(-2).max(2).step(0.1);
directionalLightFolder2.add(directionalLight2, 'intensity').min(0).max(20).step(0.5);
const directionalLightFolder3 = gui.addFolder('Directional Light 3');
directionalLightFolder3.add(directionalLight3.position, 'x').min(-2).max(2).step(0.01);
directionalLightFolder3.add(directionalLight3.position, 'y').min(-2).max(2).step(0.01);
directionalLightFolder3.add(directionalLight3.position, 'z').min(-2).max(2).step(0.01);
directionalLightFolder3.add(directionalLight3, 'intensity').min(0).max(20).step(0.5);
const light3Colour = {
  color: 0xffffff
}
directionalLightFolder3.addColor(light3Colour, 'color').onChange(()=> {
  directionalLight3.color.set(light3Colour.color)
})
const ambientLightFolder = gui.addFolder('Ambient Light');
ambientLightFolder.add(hlight, 'intensity').min(0).max(200).step(5);
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x').min(0).max(1000).step(10);
cameraFolder.add(camera.position, 'y').min(0).max(1000).step(10);
cameraFolder.add(camera.position, 'z').min(-500).max(200).step(10);
cameraFolder.add(camera.rotation, 'x').min(0).max(6.4).step(0.01);
cameraFolder.add(camera.rotation, 'y').min(0).max(6.4).step(0.01);
cameraFolder.add(camera.rotation, 'z').min(0).max(6.4).step(0.01);
*/

//Animation
const clock = new THREE.Clock()
let car;

const animate = () => {
  const elapsedTime = clock.getElapsedTime()
  car.rotation.z = .3 * elapsedTime;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
const loader = new GLTFLoader();

//Renderer/Resizing
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const resized = false;
window.addEventListener("resize", () => {
  if (!resized) {
    camera.position.y = 95;
  }
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


loader.load("/static/octane/scene.gltf", function (gltf) {
  car = gltf.scene.children[0];
  const carPaint = car.children[0].children[0].children[0].children.find(o=>o.name == 'Octane_Octane_Body_0').material.color;
  const carTrim = car.children[0].children[0].children[0].children.find(o=>o.name =='Octane_Paint_0').material.color;
  carPaint.r = 0.07;
  carPaint.g = 0.04;
  carPaint.b = 0.19;
  carTrim.r = 0.8;
  carTrim.g = 0.8;
  carTrim.b = 0.8;
  scene.add(gltf.scene);

  //More debug console
  /*
  const carColour = gui.addFolder('Car Colour');
  const edgeColour = gui.addFolder('Car Edge');
  carColour.add(carPaint, 'r').min(0).max(1).step(0.01);
  carColour.add(carPaint, 'g').min(0).max(1).step(0.01);
  carColour.add(carPaint, 'b').min(0).max(1).step(0.01);
  edgeColour.add(carTrim, 'r').min(0).max(1).step(0.01);
  edgeColour.add(carTrim, 'g').min(0).max(1).step(0.01);
  edgeColour.add(carTrim, 'b').min(0).max(1).step(0.01);
  */
  animate();
});

//rgb
// 0.06, 0.04, 0.62
// 0.07, 0.04, 0.19

//direc 1
//-2, 0.7, -0.3, 2

//direc 2
//0, 1, 0, 15.5