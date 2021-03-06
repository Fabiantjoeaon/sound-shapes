import { ShaderMaterial, Uniform } from "three";

const fragment = "uniform sampler2D tDiffuse;\r\nuniform float time;\r\n\r\nvarying vec2 vUv;\r\n\r\n#ifdef NOISE\r\n\r\n\tuniform float noiseIntensity;\r\n\r\n#endif\r\n\r\n#ifdef SCANLINES\r\n\r\n\tuniform float scanlineIntensity;\r\n\tuniform float scanlineCount;\r\n\r\n#endif\r\n\r\n#ifdef GREYSCALE\r\n\r\n\t#include <common>\r\n\r\n\tuniform float greyscaleIntensity;\r\n\r\n#elif defined(SEPIA)\r\n\r\n\tuniform float sepiaIntensity;\r\n\r\n#endif\r\n\r\n#ifdef VIGNETTE\r\n\r\n\tuniform float vignetteOffset;\r\n\tuniform float vignetteDarkness;\r\n\r\n#endif\r\n\r\nvoid main() {\r\n\r\n\tvec4 texel = texture2D(tDiffuse, vUv);\r\n\tvec3 color = texel.rgb;\r\n\r\n\t#ifdef SCREEN_MODE\r\n\r\n\t\tvec3 invColor;\r\n\r\n\t#endif\r\n\r\n\t#ifdef NOISE\r\n\r\n\t\tfloat x = vUv.x * vUv.y * time * 1000.0;\r\n\t\tx = mod(x, 13.0) * mod(x, 123.0);\r\n\t\tx = mod(x, 0.01);\r\n\r\n\t\tvec3 noise = texel.rgb * clamp(0.1 + x * 100.0, 0.0, 1.0) * noiseIntensity;\r\n\r\n\t\t#ifdef SCREEN_MODE\r\n\r\n\t\t\tinvColor = vec3(1.0) - color;\r\n\t\t\tvec3 invNoise = vec3(1.0) - noise;\r\n\r\n\t\t\tcolor = vec3(1.0) - invColor * invNoise;\r\n\r\n\t\t#else\r\n\r\n\t\t\tcolor += noise;\r\n\r\n\t\t#endif\r\n\r\n\t#endif\r\n\r\n\t#ifdef SCANLINES\r\n\r\n\t\tvec2 sl = vec2(sin(vUv.y * scanlineCount), cos(vUv.y * scanlineCount));\r\n\t\tvec3 scanlines = texel.rgb * vec3(sl.x, sl.y, sl.x) * scanlineIntensity;\r\n\r\n\t\t#ifdef SCREEN_MODE\r\n\r\n\t\t\tinvColor = vec3(1.0) - color;\r\n\t\t\tvec3 invScanlines = vec3(1.0) - scanlines;\r\n\r\n\t\t\tcolor = vec3(1.0) - invColor * invScanlines;\r\n\r\n\t\t#else\r\n\r\n\t\t\tcolor += scanlines;\r\n\r\n\t\t#endif\r\n\r\n\t#endif\r\n\r\n\t#ifdef GREYSCALE\r\n\r\n\t\tcolor = mix(color, vec3(linearToRelativeLuminance(color)), greyscaleIntensity);\r\n\r\n\t#elif defined(SEPIA)\r\n\r\n\t\tvec3 c = color.rgb;\r\n\r\n\t\tcolor.r = dot(c, vec3(1.0 - 0.607 * sepiaIntensity, 0.769 * sepiaIntensity, 0.189 * sepiaIntensity));\r\n\t\tcolor.g = dot(c, vec3(0.349 * sepiaIntensity, 1.0 - 0.314 * sepiaIntensity, 0.168 * sepiaIntensity));\r\n\t\tcolor.b = dot(c, vec3(0.272 * sepiaIntensity, 0.534 * sepiaIntensity, 1.0 - 0.869 * sepiaIntensity));\r\n\r\n\t#endif\r\n\r\n\t#ifdef VIGNETTE\r\n\r\n\t\tconst vec2 center = vec2(0.5);\r\n\r\n\t\t#ifdef ESKIL\r\n\r\n\t\t\tvec2 uv = (vUv - center) * vec2(vignetteOffset);\r\n\t\t\tcolor = mix(color.rgb, vec3(1.0 - vignetteDarkness), dot(uv, uv));\r\n\r\n\t\t#else\r\n\r\n\t\t\tfloat dist = distance(vUv, center);\r\n\t\t\tcolor *= smoothstep(0.8, vignetteOffset * 0.799, dist * (vignetteDarkness + vignetteOffset));\r\n\r\n\t\t#endif\t\t\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = vec4(clamp(color, 0.0, 1.0), texel.a);\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A cinematic shader that provides the following effects:
 *  - Film Grain
 *  - Scanlines
 *  - Vignette
 *  - Greyscale
 *  - Sepia
 *
 * Original scanlines algorithm by Pat "Hawthorne" Shearon.
 *  http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Optimised scanlines and noise with intensity scaling by Georg "Leviathan"
 * Steinrohder. This version was provided under a Creative Commons Attribution
 * 3.0 License: http://creativecommons.org/licenses/by/3.0.
 *
 * The sepia effect is based on:
 *  https://github.com/evanw/glfx.js
 *
 * The vignette code is based on PaintEffect postprocess from ro.me:
 *  http://code.google.com/p/3-dreams-of-black/source/browse/deploy/js/effects/PaintEffect.js
 */

export class FilmMaterial extends ShaderMaterial {

	/**
	 * Constructs a new film material.
	 *
	 * @param {Object} [options] - The options. Disabled effects will not be included in the final shader and have no negative impact on performance.
	 * @param {Boolean} [options.greyscale=false] - Enable greyscale effect. Greyscale and sepia are mutually exclusive.
	 * @param {Boolean} [options.sepia=false] - Enable sepia effect. Greyscale and sepia are mutually exclusive.
	 * @param {Boolean} [options.vignette=false] - Apply vignette effect.
	 * @param {Boolean} [options.eskil=false] - Use Eskil's vignette approach. The default looks dusty while Eskil looks burned out.
	 * @param {Boolean} [options.screenMode=true] - Whether the screen blend mode should be used for noise and scanlines. Both of these effects are computed independently.
	 * @param {Boolean} [options.noise=true] - Show noise-based film grain.
	 * @param {Boolean} [options.scanlines=true] - Show scanlines.
	 * @param {Number} [options.noiseIntensity=0.5] - The noise intensity. 0.0 to 1.0.
	 * @param {Number} [options.scanlineIntensity=0.05] - The scanline intensity. 0.0 to 1.0.
	 * @param {Number} [options.greyscaleIntensity=1.0] - The intensity of the greyscale effect. 0.0 to 1.0.
	 * @param {Number} [options.sepiaIntensity=1.0] - The intensity of the sepia effect. 0.0 to 1.0.
	 * @param {Number} [options.vignetteOffset=1.0] - The offset of the vignette effect. 0.0 to 1.0.
	 * @param {Number} [options.vignetteDarkness=1.0] - The darkness of the vignette effect. 0.0 to 1.0.
	 */

	constructor(options = {}) {

		const settings = Object.assign({

			screenMode: true,
			noise: true,
			scanlines: true,

			greyscale: false,
			sepia: false,
			vignette: false,
			eskil: false,

			noiseIntensity: 0.5,
			scanlineIntensity: 0.05,
			greyscaleIntensity: 1.0,
			sepiaIntensity: 1.0,

			vignetteOffset: 1.0,
			vignetteDarkness: 1.0

		}, options);

		super({

			type: "FilmMaterial",

			uniforms: {

				tDiffuse: new Uniform(null),
				time: new Uniform(0.0),

				noiseIntensity: new Uniform(settings.noiseIntensity),
				scanlineIntensity: new Uniform(settings.scanlineIntensity),
				scanlineCount: new Uniform(0.0),

				greyscaleIntensity: new Uniform(settings.greyscaleIntensity),
				sepiaIntensity: new Uniform(settings.sepiaIntensity),

				vignetteOffset: new Uniform(settings.vignetteOffset),
				vignetteDarkness: new Uniform(settings.vignetteDarkness)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		this.setScreenModeEnabled(settings.screenMode);
		this.setNoiseEnabled(settings.noise);
		this.setScanlinesEnabled(settings.scanlines);
		this.setGreyscaleEnabled(settings.greyscale);
		this.setSepiaEnabled(settings.sepia);
		this.setVignetteEnabled(settings.vignette);
		this.setEskilEnabled(settings.eskil);

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

	/**
	 * Enables or disables the noise effect.
	 *
	 * @param {Boolean} enabled - Whether the noise effect should be enabled.
	 */

	setNoiseEnabled(enabled) {

		if(enabled) {

			this.defines.NOISE = "1";

		} else {

			delete this.defines.NOISE;

		}

		this.needsUpdate = true;

	}

	/**
	 * Enables or disables the scanlines effect.
	 *
	 * @param {Boolean} enabled - Whether the scanlines effect should be enabled.
	 */

	setScanlinesEnabled(enabled) {

		if(enabled) {

			this.defines.SCANLINES = "1";

		} else {

			delete this.defines.SCANLINES;

		}

		this.needsUpdate = true;

	}

	/**
	 * Enables or disables the greyscale effect.
	 *
	 * @param {Boolean} enabled - Whether the greyscale effect should be enabled.
	 */

	setGreyscaleEnabled(enabled) {

		if(enabled) {

			this.defines.GREYSCALE = "1";

		} else {

			delete this.defines.GREYSCALE;

		}

		this.needsUpdate = true;

	}

	/**
	 * Enables or disables the sepia effect.
	 *
	 * @param {Boolean} enabled - Whether the sepia effect should be enabled.
	 */

	setSepiaEnabled(enabled) {

		if(enabled) {

			this.defines.SEPIA = "1";

		} else {

			delete this.defines.SEPIA;

		}

		this.needsUpdate = true;

	}

	/**
	 * Enables or disables the Vignette effect.
	 *
	 * @param {Boolean} enabled - Whether the Vignette effect should be enabled.
	 */

	setVignetteEnabled(enabled) {

		if(enabled) {

			this.defines.VIGNETTE = "1";

		} else {

			delete this.defines.VIGNETTE;

		}

		this.needsUpdate = true;

	}

	/**
	 * Enables or disables the Eskil Vignette effect.
	 *
	 * Has no effect if Vignette is disabled.
	 *
	 * @param {Boolean} enabled - Whether the Eskil Vignette effect should be enabled.
	 */

	setEskilEnabled(enabled) {

		if(enabled) {

			this.defines.ESKIL = "1";

		} else {

			delete this.defines.ESKIL;

		}

		this.needsUpdate = true;

	}

}
