import { ShaderMaterial, Uniform, Vector2 } from "three";

const fragment = "#include <common>\r\n\r\nuniform sampler2D tDiffuse;\r\nuniform vec2 center;\r\nuniform float aspect;\r\nuniform float waveSize;\r\nuniform float radius;\r\nuniform float maxRadius;\r\nuniform float amplitude;\r\n\r\nvarying vec2 vUv;\r\nvarying float vSize;\r\n\r\nvoid main() {\r\n\r\n\tvec2 aspectCorrection = vec2(aspect, 1.0);\r\n\r\n\tvec2 difference = vUv * aspectCorrection - center * aspectCorrection;\r\n\tfloat distance = sqrt(dot(difference, difference)) * vSize;\r\n\r\n\tvec2 displacement = vec2(0.0);\r\n\r\n\tif(distance > radius) {\r\n\r\n\t\tif(distance < radius + waveSize) {\r\n\r\n\t\t\tfloat angle = (distance - radius) * PI2 / waveSize;\r\n\t\t\tfloat cosSin = (1.0 - cos(angle)) * 0.5;\r\n\r\n\t\t\tfloat extent = maxRadius + waveSize;\r\n\t\t\tfloat decay = max(extent - distance * distance, 0.0) / extent;\r\n\r\n\t\t\tdisplacement = ((cosSin * amplitude * difference) / distance) * decay;\r\n\r\n\t\t}\r\n\r\n\t}\r\n\r\n\tgl_FragColor = texture2D(tDiffuse, vUv - displacement);\r\n\r\n}\r\n";
const vertex = "uniform float size;\r\nuniform float scale;\r\nuniform float cameraDistance;\r\n\r\nvarying vec2 vUv;\r\nvarying float vSize;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tvSize = (0.1 * cameraDistance) / size;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A shock wave shader material.
 *
 * Based on a Gist by Jean-Philippe Sarda:
 *  https://gist.github.com/jpsarda/33cea67a9f2ecb0a0eda
 */

export class ShockWaveMaterial extends ShaderMaterial {

	/**
	 * Constructs a new shock wave material.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.waveSize=0.2] - The wave size.
	 * @param {Number} [options.amplitude=0.05] - The distortion amplitude.
	 */

	constructor(options = {}) {

		const settings = Object.assign({
			maxRadius: 1.0,
			waveSize: 0.2,
			amplitude: 0.05
		}, options);

		super({

			type: "ShockWaveMaterial",

			uniforms: {

				tDiffuse: new Uniform(null),

				center: new Uniform(new Vector2(0.5, 0.5)),
				aspect: new Uniform(1.0),
				cameraDistance: new Uniform(1.0),

				size: new Uniform(1.0),
				radius: new Uniform(-settings.waveSize),
				maxRadius: new Uniform(settings.maxRadius),
				waveSize: new Uniform(settings.waveSize),
				amplitude: new Uniform(settings.amplitude)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
