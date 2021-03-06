import { ShaderMaterial, Uniform, Vector4 } from "three";

const fragment = "uniform sampler2D tDiffuse;\r\n\r\nuniform float angle;\r\nuniform float scale;\r\nuniform float intensity;\r\n\r\nvarying vec2 vUv;\r\nvarying vec2 vUvPattern;\r\n\r\nfloat pattern() {\r\n\r\n\tfloat s = sin(angle);\r\n\tfloat c = cos(angle);\r\n\r\n\tvec2 point = vec2(c * vUvPattern.x - s * vUvPattern.y, s * vUvPattern.x + c * vUvPattern.y) * scale;\r\n\r\n\treturn (sin(point.x) * sin(point.y)) * 4.0;\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tvec3 color = texel.rgb;\r\n\r\n\t#ifdef AVERAGE\r\n\r\n\t\tcolor = vec3((color.r + color.g + color.b) / 3.0);\r\n\r\n\t#endif\r\n\r\n\tcolor = vec3(color * 10.0 - 5.0 + pattern());\r\n\tcolor = texel.rgb + (color - texel.rgb) * intensity;\r\n\r\n\tgl_FragColor = vec4(color, texel.a);\r\n\r\n}\r\n";
const vertex = "uniform vec4 offsetRepeat;\r\n\r\nvarying vec2 vUv;\r\nvarying vec2 vUvPattern;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tvUvPattern = uv * offsetRepeat.zw + offsetRepeat.xy;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A dot screen shader material.
 */

export class DotScreenMaterial extends ShaderMaterial {

	/**
	 * Constructs a new dot screen material.
	 *
	 * @param {Boolean} [options] - The options.
	 * @param {Boolean} [options.average=false] - Whether the shader should output the colour average (black and white).
	 * @param {Boolean} [options.angle=1.57] - The angle of the dot pattern.
	 * @param {Boolean} [options.scale=1.0] - The scale of the dot pattern.
	 * @param {Boolean} [options.intensity=1.0] - The intensity of the effect.
	 */

	constructor(options = {}) {

		const settings = Object.assign({
			average: false,
			angle: 1.57,
			scale: 1.0,
			intensity: 1.0
		}, options);

		super({

			type: "DotScreenMaterial",

			uniforms: {

				tDiffuse: new Uniform(null),

				angle: new Uniform(settings.angle),
				scale: new Uniform(settings.scale),
				intensity: new Uniform(settings.intensity),

				offsetRepeat: new Uniform(new Vector4(0.5, 0.5, 1.0, 1.0))

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		this.setAverageEnabled(settings.average);

	}

	/**
	 * Enables or disables the Screen blend mode.
	 *
	 * @param {Boolean} enabled - Whether the Screen blend mode should be enabled.
	 */

	setAverageEnabled(enabled) {

		if(enabled) {

			this.defines.AVERAGE = "1";

		} else {

			delete this.defines.AVERAGE;

		}

		this.needsUpdate = true;

	}

}
