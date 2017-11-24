import * as THREE from 'three';
import { update } from 'tween.js';

import store from '../store';
import shapes from './objects/shapes';

const listener = e => {
    console.log('e', e);
};
store.subscribe(listener);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
);
camera.position.z = 1000;

scene.add(shapes.instance);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);

document.querySelector('.scene').appendChild(renderer.domElement);
scene.fog = new THREE.FogExp2('#ffa977', 0.0005);
scene.background = new THREE.Color(0xffffff);

function animate() {
    shapes.animate();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    update();
}

animate();
