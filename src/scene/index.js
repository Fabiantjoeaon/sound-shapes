import store from '../store';
import * as THREE from 'three';

const listener = () => {};
store.subscribe(listener);

const width = window.innerWidth;
const height = window.innerHeight;
const viewAngle = 45;
const aspect = width / height;
const near = 0.1;
const far = 10000;

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);

const scene = new THREE.Scene();
scene.add(camera);
renderer.setSize(width, height);
document.querySelector('.scene').appendChild(renderer.domElement);
