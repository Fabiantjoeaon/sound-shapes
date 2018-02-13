import * as THREE from 'three';
import { update as updateTween, Tween, Easing } from 'tween.js';
import { EffectComposer, ShaderPass, RenderPass } from 'postprocessing';

import store from '../store';
import ParticleShapes from './objects/ParticleShapes';

import {
    grainVertexShader,
    grainFragmentShader
} from './shaders/postProcessing';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
);
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({ antialias: true });
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

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
let time = 0;

const grainShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: grainVertexShader,
    fragmentShader: grainFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    uniforms: {
        uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        uPassTexture: {
            value: 0
        },
        uTime: {
            value: 0
        }
    }
});

const grainPass = new ShaderPass(grainShaderMaterial, 'uPassTexture');
grainPass.renderToScreen = true;

composer.addPass(renderPass);
composer.addPass(grainPass);

const render = () => {
    const delta = clock.getDelta();
    time += delta * 0.5 * 1.0;

    grainPass.material.uniforms['uTime'].value = time;
    updateTween();
    shapes.leftSystem.obj.rotation.x += 0.001;
    shapes.leftSystem.obj.rotation.z -= 0.001;
    shapes.midSystem.obj.rotation.x -= 0.001;
    shapes.midSystem.obj.rotation.z -= 0.001;
    shapes.rightSystem.obj.rotation.x += 0.001;
    shapes.rightSystem.obj.rotation.z += 0.001;
    composer.render();
};

const animate = () => {
    render();
    requestAnimationFrame(animate);
};
animate();

window.addEventListener('resize', () => {
    grainPass.material.uniforms['uResolution'].value = new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
    );
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
    console.log(lastAction.module);
    switch (lastAction.type) {
        case 'TOGGLE_VISIBILITY':
            dollyZoom(lastAction.isVisible);
            break;

        case 'SET_PARAMETER':
            switch (lastAction.parameter) {
                case 'type':
                    switch (lastAction.module) {
                        case 'oscillatorA':
                            switchOscillatorType(
                                shapes.leftSystem,
                                lastAction.value
                            );
                            break;
                        case 'oscillatorB':
                            switchOscillatorType(
                                shapes.rightSystem,
                                lastAction.value
                            );
                            break;
                        case 'lowFrequencyOscillator':
                            switchOscillatorType(
                                shapes.midSystem,
                                lastAction.value
                            );
                            break;
                    }
                    break;
            }
    }
});

function CustomSinCurve(scale = 0) {
    THREE.Curve.call(this);

    this.scale = scale;
}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function(t) {
    var tx = t * 3 - 1.5;
    var ty = Math.sin(2 * Math.PI * t);
    var tz = 0;

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
};

const switchOscillatorType = (shape, val) => {
    switch (val) {
        case 'sine':
            shape.formShape(new THREE.SphereGeometry(150, 150, 20));
            break;
        case 'triangle':
            shape.formShape(new THREE.ConeGeometry(120, 250, 50, 50));
            break;
        case 'square':
            shape.formShape(new THREE.BoxGeometry(200, 200, 200, 20, 20, 20));
            break;
        case 'sawtooth':
            shape.formShape(
                new THREE.TubeGeometry(
                    new CustomSinCurve(200),
                    16,
                    16,
                    32,
                    false
                )
            );
            break;
    }
};
