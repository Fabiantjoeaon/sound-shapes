import { ShaderMaterial, Uniform, Vector2 } from "three";

const fragment = "#include <common>\r\n\r\nuniform sampler2D tDiffuse;\r\nuniform sampler2D tDepth;\r\n\r\nuniform vec2 texelSize;\r\nuniform vec2 halfTexelSize;\r\n\r\nuniform float cameraNear;\r\nuniform float cameraFar;\r\n\r\nuniform float focalLength;\r\nuniform float focalStop;\r\n\r\nuniform float maxBlur;\r\nuniform float luminanceThreshold;\r\nuniform float luminanceGain;\r\nuniform float bias;\r\nuniform float fringe;\r\nuniform float ditherStrength;\r\n\r\n#ifdef SHADER_FOCUS\r\n\r\n\tuniform vec2 focusCoords;\r\n\r\n#else\r\n\r\n\tuniform float focalDepth;\r\n\r\n#endif\r\n\r\nvarying vec2 vUv;\r\n\r\n#ifndef USE_LOGDEPTHBUF\r\n\r\n\t#include <packing>\r\n\r\n\tfloat readDepth(sampler2D depthSampler, vec2 coord) {\r\n\r\n\t\tfloat fragCoordZ = texture2D(depthSampler, coord).x;\r\n\t\tfloat viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\r\n\r\n\t\treturn viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\n#ifdef PENTAGON\r\n\r\n\tfloat penta(vec2 coords) {\r\n\r\n\t\tconst vec4 HS0 = vec4( 1.0,          0.0,         0.0, 1.0);\r\n\t\tconst vec4 HS1 = vec4( 0.309016994,  0.951056516, 0.0, 1.0);\r\n\t\tconst vec4 HS2 = vec4(-0.809016994,  0.587785252, 0.0, 1.0);\r\n\t\tconst vec4 HS3 = vec4(-0.809016994, -0.587785252, 0.0, 1.0);\r\n\t\tconst vec4 HS4 = vec4( 0.309016994, -0.951056516, 0.0, 1.0);\r\n\t\tconst vec4 HS5 = vec4( 0.0,          0.0,         1.0, 1.0);\r\n\r\n\t\tconst vec4 ONE = vec4(1.0);\r\n\r\n\t\tconst float P_FEATHER = 0.4;\r\n\t\tconst float N_FEATHER = -P_FEATHER;\r\n\r\n\t\tfloat inOrOut = -4.0;\r\n\r\n\t\tvec4 P = vec4(coords, vec2(RINGS_FLOAT - 1.3));\r\n\r\n\t\tvec4 dist = vec4(\r\n\t\t\tdot(P, HS0),\r\n\t\t\tdot(P, HS1),\r\n\t\t\tdot(P, HS2),\r\n\t\t\tdot(P, HS3)\r\n\t\t);\r\n\r\n\t\tdist = smoothstep(N_FEATHER, P_FEATHER, dist);\r\n\r\n\t\tinOrOut += dot(dist, ONE);\r\n\r\n\t\tdist.x = dot(P, HS4);\r\n\t\tdist.y = HS5.w - abs(P.z);\r\n\r\n\t\tdist = smoothstep(N_FEATHER, P_FEATHER, dist);\r\n\t\tinOrOut += dist.x;\r\n\r\n\t\treturn clamp(inOrOut, 0.0, 1.0);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\n#ifdef SHOW_FOCUS\r\n\r\n\tvec3 debugFocus(vec3 c, float blur, float depth) {\r\n\r\n\t\tfloat edge = 0.002 * depth;\r\n\t\tfloat m = clamp(smoothstep(0.0, edge, blur), 0.0, 1.0);\r\n\t\tfloat e = clamp(smoothstep(1.0 - edge, 1.0, blur), 0.0, 1.0);\r\n\r\n\t\tc = mix(c, vec3(1.0, 0.5, 0.0), (1.0 - m) * 0.6);\r\n\t\tc = mix(c, vec3(0.0, 0.5, 1.0), ((1.0 - e) - (1.0 - m)) * 0.2);\r\n\r\n\t\treturn c;\r\n\r\n\t}\r\n\r\n#endif\r\n\r\n#ifdef VIGNETTE\r\n\r\n\tfloat vignette() {\r\n\r\n\t\tconst vec2 CENTER = vec2(0.5);\r\n\r\n\t\tconst float VIGNETTE_OUT = 1.3;\r\n\t\tconst float VIGNETTE_IN = 0.0;\r\n\t\tconst float VIGNETTE_FADE = 22.0; \r\n\r\n\t\tfloat d = distance(vUv, CENTER);\r\n\t\td = smoothstep(VIGNETTE_OUT + (focalStop / VIGNETTE_FADE), VIGNETTE_IN + (focalStop / VIGNETTE_FADE), d);\r\n\r\n\t\treturn clamp(d, 0.0, 1.0);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\nvec2 rand2(vec2 coord) {\r\n\r\n\tvec2 noise;\r\n\r\n\t#ifdef NOISE\r\n\r\n\t\tconst float a = 12.9898;\r\n\t\tconst float b = 78.233;\r\n\t\tconst float c = 43758.5453;\r\n\r\n\t\tnoise.x = clamp(fract(sin(mod(dot(coord, vec2(a, b)), 3.14)) * c), 0.0, 1.0) * 2.0 - 1.0;\r\n\t\tnoise.y = clamp(fract(sin(mod(dot(coord, vec2(a, b) * 2.0), 3.14)) * c), 0.0, 1.0) * 2.0 - 1.0;\r\n\r\n\t#else\r\n\r\n\t\tnoise.x = ((fract(1.0 - coord.s * halfTexelSize.x) * 0.25) + (fract(coord.t * halfTexelSize.y) * 0.75)) * 2.0 - 1.0;\r\n\t\tnoise.y = ((fract(1.0 - coord.s * halfTexelSize.x) * 0.75) + (fract(coord.t * halfTexelSize.y) * 0.25)) * 2.0 - 1.0;\r\n\r\n\t#endif\r\n\r\n\treturn noise;\r\n\r\n}\r\n\r\nvec3 processTexel(vec2 coords, float blur) {\r\n\r\n\tvec3 c;\r\n\tc.r = texture2D(tDiffuse, coords + vec2(0.0, 1.0) * texelSize * fringe * blur).r;\r\n\tc.g = texture2D(tDiffuse, coords + vec2(-0.866, -0.5) * texelSize * fringe * blur).g;\r\n\tc.b = texture2D(tDiffuse, coords + vec2(0.866, -0.5) * texelSize * fringe * blur).b;\r\n\r\n\t// Calculate the luminance of the constructed colour.\r\n\tfloat luminance = linearToRelativeLuminance(c);\r\n\tfloat threshold = max((luminance - luminanceThreshold) * luminanceGain, 0.0);\r\n\r\n\treturn c + mix(vec3(0.0), c, threshold * blur);\r\n\r\n}\r\n\r\nfloat linearize(float depth) {\r\n\r\n\treturn -cameraFar * cameraNear / (depth * (cameraFar - cameraNear) - cameraFar);\r\n\r\n}\r\n\r\nfloat gather(float i, float j, float ringSamples, inout vec3 color, float w, float h, float blur) {\r\n\r\n\tconst float TWO_PI = 6.28318531;\r\n\r\n\tfloat step = TWO_PI / ringSamples;\r\n\tfloat pw = cos(j * step) * i;\r\n\tfloat ph = sin(j * step) * i;\r\n\r\n\t#ifdef PENTAGON\r\n\r\n\t\tfloat p = penta(vec2(pw, ph));\r\n\r\n\t#else\r\n\r\n\t\tfloat p = 1.0;\r\n\r\n\t#endif\r\n\r\n\tcolor += processTexel(vUv + vec2(pw * w, ph * h), blur) * mix(1.0, i / RINGS_FLOAT, bias) * p;\r\n\r\n\treturn mix(1.0, i / RINGS_FLOAT, bias) * p;\r\n\r\n}\r\n\r\nvoid main() {\r\n\r\n\t#ifdef USE_LOGDEPTHBUF\r\n\r\n\t\tfloat depth = linearize(texture2D(tDepth, vUv).x);\r\n\r\n\t#else\r\n\r\n\t\tfloat depth = linearize(readDepth(tDepth, vUv));\r\n\r\n\t#endif\r\n\r\n\t#ifdef SHADER_FOCUS\r\n\r\n\t\t#ifdef USE_LOGDEPTHBUF\r\n\r\n\t\t\tfloat fDepth = linearize(texture2D(tDepth, focusCoords).x);\r\n\r\n\t\t#else\r\n\r\n\t\t\tfloat fDepth = linearize(readDepth(tDepth, focusCoords));\r\n\r\n\t\t#endif\r\n\r\n\t#else\r\n\r\n\t\tfloat fDepth = focalDepth;\r\n\r\n\t#endif\r\n\r\n\t#ifdef MANUAL_DOF\r\n\r\n\t\tconst float nDoFStart = 1.0; \r\n\t\tconst float nDoFDist = 2.0;\r\n\t\tconst float fDoFStart = 1.0;\r\n\t\tconst float fDoFDist = 3.0;\r\n\r\n\t\tfloat focalPlane = depth - fDepth;\r\n\t\tfloat farDoF = (focalPlane - fDoFStart) / fDoFDist;\r\n\t\tfloat nearDoF = (-focalPlane - nDoFStart) / nDoFDist;\r\n\r\n\t\tfloat blur = (focalPlane > 0.0) ? farDoF : nearDoF;\r\n\r\n\t#else\r\n\r\n\t\tconst float CIRCLE_OF_CONFUSION = 0.03; // 35mm film = 0.03mm CoC.\r\n\r\n\t\tfloat focalPlaneMM = fDepth * 1000.0;\r\n\t\tfloat depthMM = depth * 1000.0;\r\n\r\n\t\tfloat focalPlane = (depthMM * focalLength) / (depthMM - focalLength);\r\n\t\tfloat farDoF = (focalPlaneMM * focalLength) / (focalPlaneMM - focalLength);\r\n\t\tfloat nearDoF = (focalPlaneMM - focalLength) / (focalPlaneMM * focalStop * CIRCLE_OF_CONFUSION);\r\n\r\n\t\tfloat blur = abs(focalPlane - farDoF) * nearDoF;\r\n\r\n\t#endif\r\n\r\n\tblur = clamp(blur, 0.0, 1.0);\r\n\r\n\t// Dithering.\r\n\tvec2 noise = rand2(vUv) * ditherStrength * blur;\r\n\r\n\tfloat blurFactorX = texelSize.x * blur * maxBlur + noise.x;\r\n\tfloat blurFactorY = texelSize.y * blur * maxBlur + noise.y;\r\n\r\n\tconst int MAX_RING_SAMPLES = RINGS_INT * SAMPLES_INT;\r\n\r\n\t// Calculation of final color.\r\n\tvec4 color;\r\n\r\n\tif(blur < 0.05) {\r\n\r\n\t\tcolor = texture2D(tDiffuse, vUv);\r\n\r\n\t} else {\r\n\r\n\t\tcolor = texture2D(tDiffuse, vUv);\r\n\r\n\t\tfloat s = 1.0;\r\n\t\tint ringSamples;\r\n\r\n\t\tfor(int i = 1; i <= RINGS_INT; ++i) {\r\n\r\n\t\t\tringSamples = i * SAMPLES_INT;\r\n\r\n\t\t\t// Constant loop.\r\n\t\t\tfor(int j = 0; j < MAX_RING_SAMPLES; ++j) {\r\n\r\n\t\t\t\t// Break earlier.\r\n\t\t\t\tif(j >= ringSamples) { break; }\r\n\r\n\t\t\t\ts += gather(float(i), float(j), float(ringSamples), color.rgb, blurFactorX, blurFactorY, blur);\r\n\r\n\t\t\t}\r\n\r\n\t\t}\r\n\r\n\t\tcolor.rgb /= s; // Divide by sample count.\r\n\r\n\t}\r\n\r\n\t#ifdef SHOW_FOCUS\r\n\r\n\t\tcolor.rgb = debugFocus(color.rgb, blur, depth);\r\n\r\n\t#endif\r\n\r\n\t#ifdef VIGNETTE\r\n\r\n\t\tcolor.rgb *= vignette();\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = color;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Depth of Field shader v2.4.
 *
 * Original shader code by Martins Upitis:
 *  http://blenderartists.org/forum/showthread.php?237488-GLSL-depth-of-field-with-bokeh-v2-4-(update)
 */

export class RealisticBokehMaterial extends ShaderMaterial {

	/**
	 * Constructs a new bokeh2 material.
	 *
	 * @param {PerspectiveCamera} [camera] - The main camera.
	 * @param {Object} [options] - Additional options.
	 * @param {Vector2} [options.texelSize] - The absolute screen texel size.
	 * @param {Boolean} [options.rings=3] - The number of blurring iterations.
	 * @param {Boolean} [options.samples=2] - The amount of samples taken per ring.
	 * @param {Boolean} [options.showFocus=false] - Whether the focus point should be highlighted.
	 * @param {Boolean} [options.manualDoF=false] - Enables manual depth of field blur.
	 * @param {Boolean} [options.vignette=false] - Enables a vignette effect.
	 * @param {Boolean} [options.pentagon=false] - Enable to use a pentagonal shape to scale gathered texels.
	 * @param {Boolean} [options.shaderFocus=true] - Disable if you compute your own focalDepth (in metres!).
	 * @param {Boolean} [options.noise=true] - Disable if you don't want noise patterns for dithering.
	 * @param {Number} [options.maxBlur=1.0] - The maximum blur strength.
	 * @param {Number} [options.luminanceThreshold=0.5] - A luminance threshold.
	 * @param {Number} [options.luminanceGain=2.0] - A luminance gain factor.
	 * @param {Number} [options.bias=0.5] - A blur bias.
	 * @param {Number} [options.fringe=0.7] - A blur offset.
	 * @param {Number} [options.ditherStrength=0.0001] - The dither strength.
	 */

	constructor(camera = null, options = {}) {

		const settings = Object.assign({
			texelSize: null,
			rings: 3,
			samples: 2,
			showFocus: false,
			manualDoF: false,
			vignette: false,
			pentagon: false,
			shaderFocus: true,
			noise: true,
			maxBlur: 1.0,
			luminanceThreshold: 0.5,
			luminanceGain: 2.0,
			bias: 0.5,
			fringe: 0.7,
			ditherStrength: 0.0001
		}, options);

		super({

			type: "RealisticBokehMaterial",

			defines: {

				RINGS_INT: settings.rings.toFixed(0),
				RINGS_FLOAT: settings.rings.toFixed(1),
				SAMPLES_INT: settings.samples.toFixed(0),
				SAMPLES_FLOAT: settings.samples.toFixed(1)

			},

			uniforms: {

				tDiffuse: new Uniform(null),
				tDepth: new Uniform(null),

				texelSize: new Uniform(new Vector2()),
				halfTexelSize: new Uniform(new Vector2()),

				cameraNear: new Uniform(0.1),
				cameraFar: new Uniform(2000),

				focalLength: new Uniform(24.0),
				focalStop: new Uniform(0.9),

				maxBlur: new Uniform(settings.maxBlur),
				luminanceThreshold: new Uniform(settings.luminanceThreshold),
				luminanceGain: new Uniform(settings.luminanceGain),
				bias: new Uniform(settings.bias),
				fringe: new Uniform(settings.fringe),
				ditherStrength: new Uniform(settings.ditherStrength),

				focusCoords: new Uniform(new Vector2(0.5, 0.5)),
				focalDepth: new Uniform(1.0)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		this.setShowFocusEnabled(settings.showFocus);
		this.setManualDepthOfFieldEnabled(settings.manualDoF);
		this.setVignetteEnabled(settings.vignette);
		this.setPentagonEnabled(settings.pentagon);
		this.setShaderFocusEnabled(settings.shaderFocus);
		this.setNoiseEnabled(settings.noise);

		if(settings.texelSize !== null) {

			this.setTexelSize(settings.texelSize.x, settings.texelSize.y);

		}

		this.adoptCameraSettings(camera);

	}

	/**
	 * Defines whether the focus should be shown.
	 *
	 * @param {Boolean} enabled - True if the focus should be shown, false otherwise.
	 */

	setShowFocusEnabled(enabled) {

		if(enabled) {

			this.defines.SHOW_FOCUS = "1";

		} else {

			delete this.defines.SHOW_FOCUS;

		}

		this.needsUpdate = true;

	}

	/**
	 * Defines whether manual Depth of Field should be enabled.
	 *
	 * @param {Boolean} enabled - Whether manual DoF should be enabled.
	 */

	setManualDepthOfFieldEnabled(enabled) {

		if(enabled) {

			this.defines.MANUAL_DOF = "1";

		} else {

			delete this.defines.MANUAL_DOF;

		}

		this.needsUpdate = true;

	}

	/**
	 * Defines whether the Vignette effect should be enabled.
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
	 * Defines whether the pentagonal blur effect should be enabled.
	 *
	 * @param {Boolean} enabled - Whether the pentagonal blur effect should be enabled.
	 */

	setPentagonEnabled(enabled) {

		if(enabled) {

			this.defines.PENTAGON = "1";

		} else {

			delete this.defines.PENTAGON;

		}

		this.needsUpdate = true;

	}

	/**
	 * Enables or disables the automatic shader focus.
	 *
	 * @param {Boolean} enabled - Whether the shader focus should be enabled.
	 */

	setShaderFocusEnabled(enabled) {

		if(enabled) {

			this.defines.SHADER_FOCUS = "1";

		} else {

			delete this.defines.SHADER_FOCUS;

		}

		this.needsUpdate = true;

	}

	/**
	 * Defines whether the dithering should compute noise.
	 *
	 * @param {Boolean} enabled - Whether noise-based dithering should be enabled.
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
	 * Sets the texel size.
	 *
	 * @param {Number} x - The texel width.
	 * @param {Number} y - The texel height.
	 */

	setTexelSize(x, y) {

		this.uniforms.texelSize.value.set(x, y);
		this.uniforms.halfTexelSize.value.set(x, y).multiplyScalar(0.5);

	}

	/**
	 * Adopts the near and far plane and the focal length of the given camera.
	 *
	 * @param {PerspectiveCamera} camera - The main camera.
	 */

	adoptCameraSettings(camera) {

		if(camera !== null) {

			this.uniforms.cameraNear.value = camera.near;
			this.uniforms.cameraFar.value = camera.far;
			this.uniforms.focalLength.value = camera.getFocalLength(); // unit: mm.

		}

	}

}
