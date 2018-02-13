import * as THREE from 'three';
import { update as updateTween, Tween, Easing } from 'tween.js';

import store from '../store';
import ParticleShapes from './objects/ParticleShapes';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);

document.querySelector('.scene').appendChild(renderer.domElement);
scene.fog = new THREE.FogExp2(new THREE.Color('#000'), 0.0005);
scene.background = new THREE.Color('#202020');

camera.position.z = 1800;
camera.zoom = 1;
camera.updateProjectionMatrix();

const shapes = new ParticleShapes();
scene.add(shapes.obj);

const render = () => {
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
        value: isVisible ? 2 : 1,
        position: isVisible ? 1500 : 1800
    };

    const zoomEnd = {
        value: isVisible ? 1 : 2,
        position: isVisible ? 1800 : 1500
    };

    const tween = new Tween(zoom)
        .to(zoomEnd, 1700)
        .easing(Easing.Exponential.InOut)
        .onUpdate(() => {
            camera.zoom = zoom.value;
            camera.position.z = zoom.position;
            camera.updateProjectionMatrix();
        })
        .start();
};

//TODO: PARTICLE SHADER  : https://stackoverflow.com/questions/40041335/three-js-particle-texture-shader
store.subscribe(() => {
    const { lastAction } = store.getState();

    switch (lastAction.type) {
        case 'TOGGLE_VISIBILITY':
            dollyZoom(lastAction.isVisible);
            break;

        case 'SET_PARAMETER':
            switch (lastAction.parameter) {
                case 'type':
                    switch (lastAction.module) {
                        case 'oscillatorA':
                            switch (lastAction.value) {
                                case 'sine':
                                    shapes.leftSystem.formShape(
                                        new THREE.SphereGeometry(150, 150, 20)
                                    );
                                    break;
                                case 'triangle':
                                    shapes.leftSystem.formShape(
                                        new THREE.ConeGeometry(70, 200, 50, 50)
                                    );
                                    break;
                                case 'square':
                                    shapes.leftSystem.formShape(
                                        new THREE.BoxGeometry(
                                            200,
                                            200,
                                            200,
                                            20,
                                            20
                                        )
                                    );
                                    break;
                            }
                            break;

                        case 'oscillatorB':
                            switch (lastAction.value) {
                                case 'sine':
                                    shapes.rightSystem.formShape(
                                        new THREE.SphereGeometry(150, 150, 20)
                                    );
                                    break;
                                case 'triangle':
                                    shapes.rightSystem.formShape(
                                        new THREE.ConeGeometry(70, 200, 50, 50)
                                    );
                                    break;
                                case 'square':
                                    shapes.rightSystem.formShape(
                                        new THREE.BoxGeometry(
                                            200,
                                            200,
                                            200,
                                            20,
                                            20
                                        )
                                    );
                                    break;
                            }

                            break;
                    }
                    break;
            }
    }
});
