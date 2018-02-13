import * as THREE from 'three';
import { Tween, Easing } from 'tween.js';
import { vertexShader, fragmentShader } from '../shaders/particleShapes';
import ParticleSystem from './ParticleSystem';
// import tex from '../sphereTexture.png';

export default class ParticleShapes {
    constructor() {
        this.obj = new THREE.Object3D();
        const tex = new THREE.TextureLoader().load(
            process.env.PUBLIC_URL + '/sphereTexture.png'
        );
        console.log(tex);
        this.particleMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            // lights: true,
            uniforms: {
                uTexture: {
                    value: tex
                },
                uResolution: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    )
                }
            }
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
        this.leftSystem.obj.position.y = 200;
        this.midSystem = new ParticleSystem({
            instancedGeometry: this.instancedGeometry.clone(),
            material: this.particleMaterial,
            particleCount: 300,
            initialPosition: new THREE.Vector3(0, 0, 0)
        });
        this.midSystem.obj.position.y = -200;
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
        const upPos = { y: 400 };
        const downPos = { y: -100 };

        const updateShapePositions = () => {
            const { y } = tweenPos;
            this.leftSystem.updatePosition({ y });
            this.midSystem.updatePosition({ y });
            this.rightSystem.updatePosition({ y });
        };

        const moveUp = new Tween(tweenPos)
            .to(upPos, 8000)
            .easing(Easing.Quadratic.InOut)
            .onUpdate(updateShapePositions);
        const moveDown = new Tween(tweenPos)
            .to(downPos, 8000)
            .easing(Easing.Quadratic.InOut)
            .onUpdate(updateShapePositions);

        moveDown.chain(moveUp);
        moveUp.chain(moveDown);
        moveUp.start();
    }
}
