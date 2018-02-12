import * as THREE from 'three';
import { update as updateTween, Tween, Easing } from 'tween.js';

import store from '../store';
import shapes from './objects/shapes';

//TODO: PARTICLE SHADER  : https://stackoverflow.com/questions/40041335/three-js-particle-texture-shader
store.subscribe(() => {
    const { lastAction } = store.getState();

    switch (lastAction.type) {
        case 'TOGGLE_VISIBILITY':
            dollyZoom(lastAction.isVisible);
            break;
    }
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
);

scene.add(shapes.instance);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);

document.querySelector('.scene').appendChild(renderer.domElement);
scene.fog = new THREE.FogExp2(new THREE.Color('#000'), 0.0005);
scene.background = new THREE.Color('#202020');

camera.position.z = 1500;
camera.updateProjectionMatrix();
console.log(camera.zoom);

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

const dollyZoom = isVisible => {
    const zoom = {
        value: isVisible ? 1.8 : 1,
        position: isVisible ? 1500 : 1800
    };

    const zoomEnd = {
        value: isVisible ? 1 : 1.8,
        position: isVisible ? 1800 : 1500
    };

    const tween = new Tween(zoom)
        .to(zoomEnd, 2000)
        .easing(Easing.Exponential.InOut);
    tween.onUpdate(() => {
        camera.zoom = zoom.value;
        camera.position.z = zoom.position;
        camera.updateProjectionMatrix();
    });

    tween.start();
};
