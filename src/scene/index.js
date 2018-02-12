import * as THREE from 'three';
import { update as updateTween } from 'tween.js';

import store from '../store';
import shapes from './objects/shapes';

store.subscribe(() => {
    const { lastAction } = store.getState();
});

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
scene.fog = new THREE.FogExp2(new THREE.Color('#202020'), 0.0005);
scene.background = new THREE.Color('#202020');

const render = () => {
    shapes.update();
    updateTween();
    renderer.render(scene, camera);
};

const animate = () => {
    render();
    requestAnimationFrame(animate);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
