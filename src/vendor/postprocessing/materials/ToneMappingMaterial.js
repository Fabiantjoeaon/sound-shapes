import { ShaderMaterial, Uniform } from "three";

const fragment = "#include <common>\r\n#include <dithering_pars_fragment>\r\n\r\nuniform sampler2D tDiffuse;\r\nuniform float middleGrey;\r\nuniform float maxLuminance;\r\n\r\n#ifdef ADAPTED_LUMINANCE\r\n\r\n\tuniform sampler2D luminanceMap;\r\n\r\n#else\r\n\r\n\tuniform float averageLuminance;\r\n\r\n#endif\r\n\r\nvarying vec2 vUv;\r\n\r\nvec3 toneMap(vec3 c) {\r\n\r\n\t#ifdef ADAPTED_LUMINANCE\r\n\r\n\t\t// Get the calculated average luminance by sampling the center.\r\n\t\tfloat lumAvg = texture2D(luminanceMap, vec2(0.5)).r;\r\n\r\n\t#else\r\n\r\n\t\tfloat lumAvg = averageLuminance;\r\n\r\n\t#endif\r\n\r\n\t// Calculate the luminance of the current pixel.\r\n\tfloat lumPixel = linearToRelativeLuminance(c);\r\n\r\n\t// Apply the modified operator (Reinhard Eq. 4).\r\n\tfloat lumScaled = (lumPixel * middleGrey) / lumAvg;\r\n\r\n\tfloat lumCompressed = (lumScaled * (1.0 + (lumScaled / (maxLuminance * maxLuminance)))) / (1.0 + lumScaled);\r\n\r\n\treturn lumCompressed * c;\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tgl_FragColor = vec4(toneMap(texel.rgb), texel.a);\r\n\r\n\t#include <dithering_fragment>\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Full-screen tone-mapping shader material.
 *
 * This material supports dithering.
 *
 * Reference:
 *  http://www.cis.rit.edu/people/faculty/ferwerda/publications/sig02_paper.pdf
 */

export class ToneMappingMaterial extends ShaderMaterial {

	/**
	 * Constructs a new tone mapping material.
	 */

	constructor() {

		super({

			type: "ToneMappingMaterial",

			uniforms: {

				tDiffuse: new Uniform(null),
				luminanceMap: new Uniform(null),
				averageLuminance: new Uniform(1.0),
				maxLuminance: new Uniform(16.0),
				middleGrey: new Uniform(0.6)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

}
