import * as THREE from 'three';
import { Tween, Easing } from 'tween.js';

const shapes = new THREE.Object3D();
const shapeMaterial = new THREE.MeshLambertMaterial({
    color: 0x7f7f7f
});

const leftShape = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    shapeMaterial
);
leftShape.name = 'leftShape';
leftShape.position.x = -650;
shapes.add(leftShape);

const midShape = new THREE.Mesh(
    new THREE.BoxGeometry(300, 300, 300),
    shapeMaterial
);
midShape.name = 'midShape';
shapes.add(midShape);

const rightShape = leftShape.clone();
rightShape.name = 'rightShape';
rightShape.position.x = 650;
shapes.add(rightShape);

const tweenPos = { y: 0 };
const upPos = { y: 200 };
const downPos = { y: -100 };

const updateShapePositions = () => {
    leftShape.position.y = tweenPos.y + 20;
    midShape.position.y = tweenPos.y + 10;
    rightShape.position.y = tweenPos.y + 0;
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

const animate = () => {
    leftShape.rotation.x += 0.005;
    leftShape.rotation.y += 0.002;
    leftShape.rotation.z += 0.001;
    midShape.rotation.y += 0.005;
    midShape.rotation.z += 0.005;
    rightShape.rotation.z += 0.005;
};

export default { instance: shapes, animate };
