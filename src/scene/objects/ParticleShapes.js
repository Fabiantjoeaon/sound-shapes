import * as THREE from 'three';
import { Tween, Easing } from 'tween.js';
import { vertexShader, fragmentShader } from '../shaders/particleShapes';
import ParticleSystem from './ParticleSystem';

export default class ParticleShapes {
    constructor() {
        this.obj = new THREE.Object3D();
        this.particleMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            // lights: true,
            uniforms: {}
        });
        this.instancedGeometry = new THREE.Geometry();
        this.initShapes();
        this.animate();
    }

    initShapes() {
        this.leftSystem = new ParticleSystem({
            instancedGeometry: this.instancedGeometry.clone(),
            material: this.particleMaterial,
            particleCount: 500,
            initialPosition: new THREE.Vector3(-650, 0, 0)
        });
        this.midSystem = new ParticleSystem({
            instancedGeometry: this.instancedGeometry.clone(),
            material: this.particleMaterial,
            particleCount: 300,
            initialPosition: new THREE.Vector3(0, 0, 0)
        });
        this.rightSystem = new ParticleSystem({
            instancedGeometry: this.instancedGeometry.clone(),
            material: this.particleMaterial,
            particleCount: 500,
            initialPosition: new THREE.Vector3(650, 0, 0)
        });
        this.obj.add(this.leftSystem.obj);
        this.obj.add(this.midSystem.obj);
        this.obj.add(this.rightSystem.obj);
    }

    animate() {
        const tweenPos = { y: 0 };
        const upPos = { y: 200 };
        const downPos = { y: -100 };

        const updateShapePositions = () => {
            this.leftSystem.updatePosition({ y: tweenPos.y + 20 });
            this.midSystem.updatePosition({ y: tweenPos.y + 10 });
            this.rightSystem.updatePosition({ y: tweenPos.y });
        };

        const moveUp = new Tween(tweenPos)
            .to(upPos, 7000)
            .easing(Easing.Quadratic.InOut)
            .onUpdate(updateShapePositions);
        const moveDown = new Tween(tweenPos)
            .to(downPos, 7000)
            .easing(Easing.Quadratic.InOut)
            .onUpdate(updateShapePositions);

        moveDown.chain(moveUp);
        moveUp.chain(moveDown);
        moveUp.start();
    }
}
