export const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize( normalMatrix * normal );
    gl_PointSize = 6.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  varying vec3 vNormal;
  void main() {
    vec2 uv = vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y );
    vec4 tex = texture2D( uTexture, uv );

    // if ( tex.a < 0.5 ) discard;
    tex.b += 0.5;
    gl_FragColor = tex;
  }
`;
