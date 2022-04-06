import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import React, { Component } from "react";
import "pathseg";

class Octane extends Component {
  async componentDidMount() {
    //Debug Console
    // const gui = new dat.GUI();

    //canvas
    const canvas = document.querySelector("canvas.webgl");

    /* Scene Setup and Base configuration
      - Best settings were found by playing with debug console sliders
    */
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x000000, 0);

    //camera
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 2000);
    camera.rotation.x = -2.7;
    camera.rotation.y = 0.89;
    camera.rotation.z = 2.8;
    camera.position.x = 215;
    camera.position.y = 55;
    camera.position.z = -159;
    camera.zoom = 2;

    //renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvas,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth/2, window.innerWidth/2);

    // Orbital Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI/2; 
    controls.minDistance = 260;
    controls.maxDistance = 260;
    controls.addEventListener("change", renderer);

    //Plane
    const material = new THREE.MeshPhongMaterial({
      color: 0x181818,
      dithering: true,
    });
    const geometry = new THREE.CylinderGeometry(70, 70, 0.0001, 32 );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -2, 0);
    mesh.receiveShadow = true;
    scene.add(mesh);

    //Lights
    const spotLight = new THREE.SpotLight(0xfff0df, 100, 368, -0.22, 1, 1.54);
    spotLight.position.set(1, 332, 23);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;
    scene.add(spotLight);

    //EDITED
    const directionalLight = new THREE.DirectionalLight(0xffffff, 15);
    directionalLight.position.set(0.1, 0, 0.2);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 15);
    directionalLight2.position.set(-0.1, 0, -0.2);
    directionalLight2.castShadow = true;
    scene.add(directionalLight2);

    //Animation
    const clock = new THREE.Clock();
    let car;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      car.rotation.z = 0.3 * elapsedTime;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    const loader = new GLTFLoader();

    //Renderer/Resizing
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    let resized = false;
    window.addEventListener("resize", () => {
      // if (!resized) {
      //   camera.position.y = camera.position.y;
      //   camera.position.x = camera.position.x;
      //   camera.position.z = camera.position.z;
      //   resized = true;
      // }
      // Update sizes
      sizes.width = window.innerWidth/2;
      sizes.height = window.innerWidth/2;

      // Update camera
      // camera.aspect = sizes.width / sizes.height;
      // camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    loader.load("octane/scene.gltf", function (gltf) {
      gltf.scene.traverse(function (node) {
        if (node.isObject3D) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      car = gltf.scene.children[0];
      car.scale.set(0.8, 0.8, 0.8);
      const carPaint = car.children[0].children[0].children[0].children.find(
        (o) => o.name == "Octane_Octane_Body_0"
      ).material.color;
      const carTrim = car.children[0].children[0].children[0].children.find(
        (o) => o.name == "Octane_Paint_0"
      ).material.color;
      carPaint.r = 0.07;
      carPaint.g = 0.04;
      carPaint.b = 0.19;
      carTrim.r = 0.8;
      carTrim.g = 0.8;
      carTrim.b = 0.8;
      scene.add(gltf.scene);

      animate();
    });
  }

  render() {
    return <canvas class="webgl"></canvas>;
  }
}

export default Octane;
