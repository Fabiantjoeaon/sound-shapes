import { ShaderMaterial, Uniform, Vector2 } from "three";

const fragment = "uniform sampler2D tDiffuse;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\n\r\nvoid main() {\r\n\r\n\tconst vec2 threshold = vec2(EDGE_THRESHOLD);\r\n\r\n\t// Calculate color deltas.\r\n\tvec4 delta;\r\n\tvec3 c = texture2D(tDiffuse, vUv).rgb;\r\n\r\n\tvec3 cLeft = texture2D(tDiffuse, vOffset[0].xy).rgb;\r\n\tvec3 t = abs(c - cLeft);\r\n\tdelta.x = max(max(t.r, t.g), t.b);\r\n\r\n\tvec3 cTop = texture2D(tDiffuse, vOffset[0].zw).rgb;\r\n\tt = abs(c - cTop);\r\n\tdelta.y = max(max(t.r, t.g), t.b);\r\n\r\n\t// We do the usual threshold.\r\n\tvec2 edges = step(threshold, delta.xy);\r\n\r\n\t// Then discard if there is no edge.\r\n\tif(dot(edges, vec2(1.0)) == 0.0) {\r\n\r\n\t\tdiscard;\r\n\r\n\t}\r\n\r\n\t// Calculate right and bottom deltas.\r\n\tvec3 cRight = texture2D(tDiffuse, vOffset[1].xy).rgb;\r\n\tt = abs(c - cRight);\r\n\tdelta.z = max(max(t.r, t.g), t.b);\r\n\r\n\tvec3 cBottom = texture2D(tDiffuse, vOffset[1].zw).rgb;\r\n\tt = abs(c - cBottom);\r\n\tdelta.w = max(max(t.r, t.g), t.b);\r\n\r\n\t// Calculate the maximum delta in the direct neighborhood.\r\n\tfloat maxDelta = max(max(max(delta.x, delta.y), delta.z), delta.w);\r\n\r\n\t// Calculate left-left and top-top deltas.\r\n\tvec3 cLeftLeft = texture2D(tDiffuse, vOffset[2].xy).rgb;\r\n\tt = abs(c - cLeftLeft);\r\n\tdelta.z = max(max(t.r, t.g), t.b);\r\n\r\n\tvec3 cTopTop = texture2D(tDiffuse, vOffset[2].zw).rgb;\r\n\tt = abs(c - cTopTop);\r\n\tdelta.w = max(max(t.r, t.g), t.b);\r\n\r\n\t// Calculate the final maximum delta.\r\n\tmaxDelta = max(max(maxDelta, delta.z), delta.w);\r\n\r\n\t// Local contrast adaptation in action.\r\n\tedges.xy *= step(0.5 * maxDelta, delta.xy);\r\n\r\n\tgl_FragColor = vec4(edges, 0.0, 0.0);\r\n\r\n}\r\n";
const vertex = "uniform vec2 texelSize;\r\n\r\nvarying vec2 vUv;\r\nvarying vec4 vOffset[3];\r\n\r\nvoid main() {\r\n\r\n\tvUv = uv;\r\n\r\n\tvOffset[0] = uv.xyxy + texelSize.xyxy * vec4(-1.0, 0.0, 0.0, 1.0); // Changed sign in W component.\r\n\tvOffset[1] = uv.xyxy + texelSize.xyxy * vec4(1.0, 0.0, 0.0, -1.0); // Changed sign in W component.\r\n\tvOffset[2] = uv.xyxy + texelSize.xyxy * vec4(-2.0, 0.0, 0.0, 2.0); // Changed sign in W component.\r\n\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n\r\n}\r\n";

/**
 * A material that detects edges in a color texture.
 *
 * Mainly used for Subpixel Morphological Antialiasing.
 */

export class ColorEdgesMaterial extends ShaderMaterial {

	/**
	 * Constructs a new color edges material.
	 *
	 * @param {Vector2} [texelSize] - The absolute screen texel size.
	 */

	constructor(texelSize = new Vector2()) {

		super({

			type: "ColorEdgesMaterial",

			defines: {

				EDGE_THRESHOLD: "0.1"

			},

			uniforms: {

				tDiffuse: new Uniform(null),
				texelSize: new Uniform(texelSize)

			},

			fragmentShader: fragment,
			vertexShader: vertex,

			depthWrite: false,
			depthTest: false

		});

	}

	/**
	 * Sets the edge detection sensitivity.
	 *
	 * A lower value results in more edges being detected at the expense of
	 * performance.
	 *
	 * 0.1 is a reasonable value, and allows to catch most visible edges.
	 * 0.05 is a rather overkill value, that allows to catch 'em all.
	 *
	 * If temporal supersampling is used, 0.2 could be a reasonable value,
	 * as low contrast edges are properly filtered by just 2x.
	 *
	 * @param {Number} threshold - The edge detection sensitivity. Range: [0, 0.5].
	 */

	setEdgeDetectionThreshold(threshold) {

		this.defines.EDGE_THRESHOLD = threshold.toFixed("2");

		this.needsUpdate = true;

	}

}
