import { ShaderMaterial, Uniform } from "three";

const fragment = "#include <common>\r\n#include <dithering_pars_fragment>\r\n\r\nuniform sampler2D tDiffuse;\r\nuniform vec3 lightPosition;\r\n\r\nuniform float exposure;\r\nuniform float decay;\r\nuniform float density;\r\nuniform float weight;\r\nuniform float clampMax;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec2 texCoord = vUv;\r\n\r\n\t// Calculate vector from pixel to light source in screen space.\r\n\tvec2 deltaTexCoord = texCoord - lightPosition.st;\r\n\tdeltaTexCoord *= 1.0 / NUM_SAMPLES_FLOAT * density;\r\n\r\n\t// A decreasing illumination factor.\r\n\tfloat illuminationDecay = 1.0;\r\n\r\n\tvec4 sample;\r\n\tvec4 color = vec4(0.0);\r\n\r\n\t// Estimate the probability of occlusion at each pixel by summing samples along a ray to the light source.\r\n\tfor(int i = 0; i < NUM_SAMPLES_INT; ++i) {\r\n\r\n\t\ttexCoord -= deltaTexCoord;\r\n\t\tsample = texture2D(tDiffuse, texCoord);\r\n\r\n\t\t// Apply sample attenuation scale/decay factors.\r\n\t\tsample *= illuminationDecay * weight;\r\n\r\n\t\tcolor += sample;\r\n\r\n\t\t// Update exponential decay factor.\r\n\t\tilluminationDecay *= decay;\r\n\r\n\t}\r\n\r\n\tgl_FragColor = clamp(color * exposure, 0.0, clampMax);\r\n\r\n\t#include <dithering_fragment>\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A crepuscular rays shader material.
 *
 * This material supports dithering.
 *
 * References:
 *
 * Thibaut Despoulain, 2012:
 *  [(WebGL) Volumetric Light Approximation in Three.js](
 *  http://bkcore.com/blog/3d/webgl-three-js-volumetric-light-godrays.html)
 *
 * Nvidia, GPU Gems 3, 2008:
 *  [Chapter 13. Volumetric Light Scattering as a Post-Process](
 *  https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch13.html)
 */

export class GodRaysMaterial extends ShaderMaterial {

	/**
	 * Constructs a new god rays material.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.density=0.96] - The density of the light rays.
	 * @param {Number} [options.decay=0.93] - An illumination decay factor.
	 * @param {Number} [options.weight=0.4] - A light ray weight factor.
	 * @param {Number} [options.exposure=0.6] - A constant attenuation coefficient.
	 * @param {Number} [options.clampMax=1.0] - An upper bound for the saturation of the overall effect.
	 */

	constructor(options = {}) {

		const settings = Object.assign({
			exposure: 0.6,
			density: 0.93,
			decay: 0.96,
			weight: 0.4,
			clampMax: 1.0
		}, options);

		super({

			type: "GodRaysMaterial",

			defines: {

				NUM_SAMPLES_FLOAT: "60.0",
				NUM_SAMPLES_INT: "60"

			},

			uniforms: {

				tDiffuse: new Uniform(null),
				lightPosition: new Uniform(null),

				exposure: new Uniform(settings.exposure),
				decay: new Uniform(settings.decay),
				density: new Uniform(settings.density),
				weight: new Uniform(settings.weight),
				clampMax: new Uniform(settings.clampMax)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
