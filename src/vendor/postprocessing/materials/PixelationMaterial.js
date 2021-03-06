import { ShaderMaterial, Uniform, Vector2 } from "three";

const fragment = "uniform sampler2D tDiffuse;\r\nuniform float granularity;\r\nuniform float dx;\r\nuniform float dy;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel;\r\n\r\n\tif(granularity > 0.0) {\r\n\r\n\t\tvec2 coord = vec2(\r\n\t\t\tdx * (floor(vUv.x / dx) + 0.5),\r\n\t\t\tdy * (floor(vUv.y / dy) + 0.5)\r\n\t\t);\r\n\r\n\t\ttexel = texture2D(tDiffuse, coord);\r\n\r\n\t} else {\r\n\r\n\t\ttexel = texture2D(tDiffuse, vUv);\r\n\r\n\t}\r\n\r\n\tgl_FragColor = texel;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A pixelation shader material.
 *
 * Original shader code by Robert Casanova:
 *  https://github.com/robertcasanova/pixelate-shader
 */

export class PixelationMaterial extends ShaderMaterial {

	/**
	 * Constructs a new pixelation material.
	 */

	constructor() {

		super({

			type: "PixelationMaterial",

			uniforms: {

				tDiffuse: new Uniform(null),
				granularity: new Uniform(1.0),
				resolution: new Uniform(new Vector2(1.0, 1.0)),
				dx: new Uniform(1.0),
				dy: new Uniform(1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

	/**
	 * The pixel granularity.
	 *
	 * @type {Number}
	 */

	get granularity() {

		return this.uniforms.granularity.value;

	}

	/**
	 * A higher value yields coarser visuals.
	 *
	 * @type {Number}
	 */

	set granularity(x) {

		const uniforms = this.uniforms;
		const resolution = uniforms.resolution.value;

		uniforms.granularity.value = x;
		uniforms.dx.value = x / resolution.x;
		uniforms.dy.value = x / resolution.y;

	}

	/**
	 * Sets the resolution.
	 *
	 * @param {Number} width - The width.
	 * @param {Number} height - The height.
	 */

	setResolution(width, height) {

		this.uniforms.resolution.value.set(width, height);
		this.granularity = this.granularity;

	}

}
