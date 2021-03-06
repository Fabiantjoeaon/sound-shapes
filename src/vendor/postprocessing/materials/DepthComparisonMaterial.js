import { PerspectiveCamera, ShaderMaterial, Uniform } from "three";

const fragment = "#include <packing>\r\n\r\nuniform sampler2D tDepth;\r\nuniform float cameraNear;\r\nuniform float cameraFar;\r\n\r\nvarying float vViewZ;\r\nvarying vec4 vProjTexCoord;\r\n\r\nvoid main() {\r\n\r\n\t// Transform into Cartesian coordinate (not mirrored).\r\n\tvec2 projTexCoord = (vProjTexCoord.xy / vProjTexCoord.w) * 0.5 + 0.5;\r\n\tprojTexCoord = clamp(projTexCoord, 0.002, 0.998);\r\n\r\n\tfloat fragCoordZ = unpackRGBAToDepth(texture2D(tDepth, projTexCoord));\r\n\r\n\t#ifdef PERSPECTIVE_CAMERA\r\n\r\n\t\tfloat viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\r\n\r\n\t#else\r\n\r\n\t\tfloat viewZ = orthographicDepthToViewZ(fragCoordZ, cameraNear, cameraFar);\r\n\r\n\t#endif\r\n\r\n\tfloat depthTest = (vViewZ <= viewZ) ? 1.0 : 0.0;\r\n\r\n\tgl_FragColor.rgb = vec3(0.0, depthTest, 1.0);\r\n\r\n}\r\n";
const vertex = "varying float vViewZ;\r\nvarying vec4 vProjTexCoord;\r\n\r\nvoid main() {\r\n\r\n\tvec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\r\n\tvProjTexCoord = projectionMatrix * mvPosition;\r\n\tvViewZ = mvPosition.z;\r\n\r\n\tgl_Position = vProjTexCoord;\r\n\r\n}\r\n";

/**
 * A depth comparison shader material.
 */

export class DepthComparisonMaterial extends ShaderMaterial {

	/**
	 * Constructs a new depth comparison material.
	 *
	 * @param {Texture} [depthTexture=null] - A depth texture.
	 * @param {PerspectiveCamera} [camera] - A camera.
	 */

	constructor(depthTexture = null, camera) {

		super({

			type: "DepthComparisonMaterial",

			uniforms: {

				tDepth: new Uniform(depthTexture),
				cameraNear: new Uniform(0.1),
				cameraFar: new Uniform(2000)

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
	 * @param {Camera} [camera=null] - A camera.
	 */

	adoptCameraSettings(camera = null) {

		if(camera !== null) {

			this.uniforms.cameraNear.value = camera.near;
			this.uniforms.cameraFar.value = camera.far;

			if(camera instanceof PerspectiveCamera) {

				this.defines.PERSPECTIVE_CAMERA = "1";

			} else {

				delete this.defines.PERSPECTIVE_CAMERA;

			}

		}

	}

}
