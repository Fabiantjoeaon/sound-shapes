import { ShaderMaterial, Uniform } from "three";

const fragment = "uniform sampler2D tDiffuse;\r\nuniform sampler2D tDepth;\r\n\r\nuniform float focus;\r\nuniform float dof;\r\nuniform float aspect;\r\nuniform float aperture;\r\nuniform float maxBlur;\r\n\r\nvarying vec2 vUv;\r\n\r\n#ifndef USE_LOGDEPTHBUF\r\n\r\n\t#include <packing>\r\n\r\n\tuniform float cameraNear;\r\n\tuniform float cameraFar;\r\n\r\n\tfloat readDepth(sampler2D depthSampler, vec2 coord) {\r\n\r\n\t\tfloat fragCoordZ = texture2D(depthSampler, coord).x;\r\n\t\tfloat viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\r\n\r\n\t\treturn viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);\r\n\r\n\t}\r\n\r\n#endif\r\n\r\nvoid main() {\r\n\r\n\tvec2 aspectCorrection = vec2(1.0, aspect);\r\n\r\n\t#ifdef USE_LOGDEPTHBUF\r\n\r\n\t\tfloat depth = texture2D(tDepth, vUv).x;\r\n\r\n\t#else\r\n\r\n\t\tfloat depth = readDepth(tDepth, vUv);\r\n\r\n\t#endif\r\n\r\n\tfloat focusNear = clamp(focus - dof, 0.0, 1.0);\r\n\tfloat focusFar = clamp(focus + dof, 0.0, 1.0);\r\n\r\n\t// Calculate a DoF mask.\r\n\tfloat low = step(depth, focusNear);\r\n\tfloat high = step(focusFar, depth);\r\n\r\n\tfloat factor = (depth - focusNear) * low + (depth - focusFar) * high;\r\n\r\n\tvec2 dofBlur = vec2(clamp(factor * aperture, -maxBlur, maxBlur));\r\n\r\n\tvec2 dofblur9 = dofBlur * 0.9;\r\n\tvec2 dofblur7 = dofBlur * 0.7;\r\n\tvec2 dofblur4 = dofBlur * 0.4;\r\n\r\n\tvec4 color = vec4(0.0);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15,  0.37) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29,  0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37,  0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.40,  0.0 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37, -0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29, -0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15, -0.37) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15,  0.37) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29,  0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37,  0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37, -0.15) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29, -0.29) * aspectCorrection) * dofBlur);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15, -0.37) * aspectCorrection) * dofBlur);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15,  0.37) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37,  0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37, -0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15, -0.37) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.15,  0.37) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.37,  0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.37, -0.15) * aspectCorrection) * dofblur9);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.15, -0.37) * aspectCorrection) * dofblur9);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29,  0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.40,  0.0 ) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29, -0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29,  0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29, -0.29) * aspectCorrection) * dofblur7);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofblur7);\r\n\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29,  0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.4,   0.0 ) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.29, -0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,  -0.4 ) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29,  0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.4,   0.0 ) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2(-0.29, -0.29) * aspectCorrection) * dofblur4);\r\n\tcolor += texture2D(tDiffuse, vUv + (vec2( 0.0,   0.4 ) * aspectCorrection) * dofblur4);\r\n\r\n\tgl_FragColor = color / 41.0;\r\n\r\n}\r\n";
const vertex = "varying vec2 vUv;\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * Depth of Field shader (Bokeh).
 *
 * Original shader code by Martins Upitis:
 *  http://artmartinsh.blogspot.com/2010/02/glsl-lens-blur-filter-with-bokeh.html
 */

export class BokehMaterial extends ShaderMaterial {

	/**
	 * Constructs a new bokeh material.
	 *
	 * @param {PerspectiveCamera} [camera] - A camera.
	 * @param {Object} [options] - The options.
	 * @param {Number} [options.focus=1.0] - The focus distance, corresponds directly with the scene depth.
	 * @param {Number} [options.dof=0.02] - Depth of field. An area in front of and behind the focus point that still appears sharp.
	 * @param {Number} [options.aperture=0.025] - Camera aperture scale. Bigger values for stronger blur and shallower depth of field.
	 * @param {Number} [options.maxBlur=1.0] - Maximum blur strength.
	 */

	constructor(camera, options = {}) {

		const settings = Object.assign({
			focus: 1.0,
			dof: 0.02,
			aperture: 0.025,
			maxBlur: 1.0
		}, options);

		super({

			type: "BokehMaterial",

			uniforms: {

				cameraNear: new Uniform(0.1),
				cameraFar: new Uniform(2000),
				aspect: new Uniform(1.0),

				tDiffuse: new Uniform(null),
				tDepth: new Uniform(null),

				focus: new Uniform(settings.focus),
				dof: new Uniform(settings.dof),
				aperture: new Uniform(settings.aperture),
				maxBlur: new Uniform(settings.maxBlur)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

		this.adoptCameraSettings(camera);

	}

	/**
	 * Adopts the settings of the given camera.
	 *
	 * @param {PerspectiveCamera} [camera=null] - A camera.
	 */

	adoptCameraSettings(camera = null) {

		if(camera !== null) {

			this.uniforms.cameraNear.value = camera.near;
			this.uniforms.cameraFar.value = camera.far;
			this.uniforms.aspect.value = camera.aspect;

		}

	}

}
