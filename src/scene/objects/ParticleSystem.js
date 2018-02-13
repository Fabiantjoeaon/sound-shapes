import { Points, Vector3 } from 'three';
import { Tween, Easing } from 'tween.js';
import shuffle from 'lodash/shuffle';
import getRandomArbitrary from '../../helpers/getRandomArbitrary';

export default class ParticleSystem {
    constructor({
        instancedGeometry,
        material,
        particleCount,
        initialPosition
    }) {
        if (!instancedGeometry)
            throw new Error('Pass instanced geometry first!');

        this.particleCount = particleCount;
        this.obj = new Points(instancedGeometry, material);

        this.initParticles();
        this.updatePosition(initialPosition);
    }

    initParticles() {
        [...this.particleCount].forEach(i => {
            const point = new Vector3(
                Math.random() * 800 - 100,
                Math.random() * 800 - 100,
                Math.random() * 800 - 100
            );
            this.obj.geometry.vertices.push(point);
        });
        this.obj.geometry.verticesNeedUpdate = true;
        this.obj.geometry.computeVertexNormals();
    }

    formShape(geometry) {
        const targetVertices = shuffle(geometry.vertices);
        const currentGeometry = this.obj.geometry;

        currentGeometry.vertices.map((systemVertex, i) => {
            if (i <= this.particleCount) {
                const { x, y, z } = targetVertices[i];
                const targetVertex = {};
                targetVertex.x = getRandomArbitrary(x, x + 10);
                targetVertex.y = getRandomArbitrary(y, y + 10);
                targetVertex.z = getRandomArbitrary(z, z + 10);
                const tween = new Tween(systemVertex)
                    .to(targetVertex, 1000)
                    .easing(Easing.Exponential.InOut)
                    .onUpdate(() => {
                        currentGeometry.vertices[i].set(
                            systemVertex.x,
                            systemVertex.y,
                            systemVertex.z
                        );
                        currentGeometry.verticesNeedUpdate = true;
                    })
                    .start();
            }
        });
    }

    updatePosition({
        x = this.obj.position.x,
        y = this.obj.position.y,
        z = this.obj.position.z
    }) {
        this.obj.position.set(x, y, z);
    }
}
