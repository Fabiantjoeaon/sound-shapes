import { ShaderMaterial, Uniform } from "three";

const fragment = "uniform sampler2D texture1;\r\nuniform sampler2D texture2;\r\n\r\nuniform float opacity1;\r\nuniform float opacity2;\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel1 = opacity1 * texture2D(texture1, vUv);\r\n\tvec4 texel2 = opacity2 * texture2D(texture2, vUv);\r\n\r\n\t#ifdef SCREEN_MODE\r\n\r\n\t\tvec3 invTexel1 = vec3(1.0) - texel1.rgb;\r\n\t\tvec3 invTexel2 = vec3(1.0) - texel2.rgb;\r\n\r\n\t\tvec4 color = vec4(\r\n\t\t\tvec3(1.0) - invTexel1 * invTexel2,\r\n\t\t\ttexel1.a + texel2.a\r\n\t\t);\r\n\r\n\t#else\r\n\r\n\t\tvec4 color = texel1 + texel2;\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = color;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A material for combining two textures.
 *
 * This material supports the two blend modes Add and Screen.
 *
 * In Screen mode, the two textures are effectively projected on a white screen
 * simultaneously. In Add mode, the textures are simply added together which
 * often produces undesired, washed out results.
 */

export class CombineMaterial extends ShaderMaterial {

	/**
	 * Constructs a new combine material.
	 *
	 * @param {Boolean} [screenMode=false] - Whether the screen blend mode should be used.
	 */

	constructor(screenMode = false) {

		super({

			type: "CombineMaterial",

			uniforms: {

				texture1: new Uniform(null),
				texture2: new Uniform(null),

				opacity1: new Uniform(1.0),
				opacity2: new Uniform(1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		this.setScreenModeEnabled(screenMode);

	}

	/**
	 * Enables or disables the Screen blend mode.
	 *
	 * @param {Boolean} enabled - Whether the Screen blend mode should be enabled.
	 */

	setScreenModeEnabled(enabled) {

		if(enabled) {

			this.defines.SCREEN_MODE = "1";

		} else {

			delete this.defines.SCREEN_MODE;

		}

		this.needsUpdate = true;

	}

}
