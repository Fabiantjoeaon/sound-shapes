import { Color, ShaderMaterial, Uniform } from "three";

const fragment = "uniform sampler2D tDiffuse;\r\nuniform sampler2D tMask;\r\nuniform sampler2D tOutline;\r\n\r\nuniform vec3 visibleEdgeColor;\r\nuniform vec3 hiddenEdgeColor;\r\nuniform float pulse;\r\nuniform float edgeStrength;\r\n\r\n#ifdef USE_PATTERN\r\n\r\n\tuniform sampler2D tPattern;\r\n\tvarying vec2 vPatternCoord;\r\n\r\n#endif\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvec4 color = texture2D(tDiffuse, vUv);\r\n\tvec2 outline = texture2D(tOutline, vUv).rg;\r\n\tvec2 mask = texture2D(tMask, vUv).rg;\r\n\r\n\t#ifndef X_RAY\r\n\r\n\t\toutline.y = 0.0;\r\n\r\n\t#endif\r\n\r\n\toutline *= (edgeStrength * mask.x * pulse);\r\n\tvec3 outlineColor = outline.x * visibleEdgeColor + outline.y * hiddenEdgeColor;\r\n\r\n\t#ifdef ALPHA_BLENDING\r\n\r\n\t\tcolor.rgb = mix(color.rgb, outlineColor, max(outline.x, outline.y));\r\n\r\n\t#else\r\n\r\n\t\tcolor.rgb += outlineColor;\r\n\r\n\t#endif\r\n\r\n\t#ifdef USE_PATTERN\r\n\r\n\t\tvec3 patternColor = texture2D(tPattern, vPatternCoord).rgb;\r\n\r\n\t\t#ifdef X_RAY\r\n\r\n\t\t\tfloat hiddenFactor = 0.5;\r\n\r\n\t\t#else\r\n\r\n\t\t\tfloat hiddenFactor = 0.0;\r\n\r\n\t\t#endif\r\n\r\n\t\tfloat visibilityFactor = (1.0 - mask.y > 0.0) ? 1.0 : hiddenFactor;\r\n\r\n\t\tcolor.rgb += visibilityFactor * (1.0 - mask.x) * (1.0 - patternColor);\r\n\r\n\t#endif\r\n\r\n\tgl_FragColor = color;\r\n\r\n}\r\n";
const vertex = "#ifdef USE_PATTERN\r\n\r\n\tuniform float aspect;\r\n\tuniform float patternScale;\r\n\tvarying vec2 vPatternCoord;\r\n\r\n#endif\r\n\r\nvarying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\t#ifdef USE_PATTERN\r\n\r\n\t\tvec2 aspectCorrection = vec2(aspect, 1.0);\r\n\t\tvPatternCoord = uv * aspectCorrection * patternScale;\r\n\r\n\t#endif\r\n\r\n\tvUv = uv;\r\n\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * An outline blend shader material.
 */

export class OutlineBlendMaterial extends ShaderMaterial {

	/**
	 * Constructs a new outline blend material.
	 *
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.edgeStrength=1.0] - The edge strength.
	 * @param {Number} [options.patternScale=1.0] - The scale of the pattern texture.
	 * @param {Number} [options.visibleEdgeColor=0xffffff] - The color of visible edges.
	 * @param {Number} [options.hiddenEdgeColor=0x22090A] - The color of hidden edges.
	 * @param {Boolean} [alphaBlending=false] - Whether the outline should be blended using alpha.
	 * @param {Boolean} [xRay=true] - Whether hidden parts of selected objects should be visible.
	 */

	constructor(options = {}) {

		const settings = Object.assign({
			edgeStrength: 1.0,
			patternScale: 1.0,
			visibleEdgeColor: 0xffffff,
			hiddenEdgeColor: 0x22090A,
			alphaBlending: false,
			xRay: true
		}, options);

		super({

			type: "OutlineBlendMaterial",

			uniforms: {

				pulse: new Uniform(1.0),
				aspect: new Uniform(1.0),

				tDiffuse: new Uniform(null),
				tMask: new Uniform(null),
				tOutline: new Uniform(null),
				tPattern: new Uniform(null),

				edgeStrength: new Uniform(settings.edgeStrength),
				patternScale: new Uniform(settings.patternScale),

				visibleEdgeColor: new Uniform(new Color(settings.visibleEdgeColor)),
				hiddenEdgeColor: new Uniform(new Color(settings.hiddenEdgeColor))

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		this.setAlphaBlendingEnabled(settings.alphaBlending);
		this.setXRayEnabled(settings.xRay);

	}

	/**
	 * Enables or disables the alpha blending.
	 *
	 * @param {Boolean} enabled - Whether the alpha blending should be enabled.
	 */

	setAlphaBlendingEnabled(enabled) {

		if(enabled) {

			this.defines.ALPHA_BLENDING = "1";

		} else {

			delete this.defines.ALPHA_BLENDING;

		}

		this.needsUpdate = true;

	}

	/**
	 * Defines whether hidden parts of selected objects should be visible.
	 *
	 * @param {Boolean} enabled - Whether hidden parts of selected objects should be visible.
	 */

	setXRayEnabled(enabled) {

		if(enabled) {

			this.defines.X_RAY = "1";

		} else {

			delete this.defines.X_RAY;

		}

		this.needsUpdate = true;

	}

	/**
	 * Sets a pattern texture to use as overlay.
	 *
	 * @param {Texture} [texture=null] - A pattern texture. Set to null to disable the pattern.
	 */

	setPatternTexture(texture = null) {

		if(texture !== null) {

			this.defines.USE_PATTERN = "1";

		} else {

			delete this.defines.USE_PATTERN;

		}

		this.uniforms.tPattern.value = texture;
		this.needsUpdate = true;

	}

}
