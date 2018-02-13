export const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize( normalMatrix * normal );
    gl_PointSize = 2.;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

export const fragmentShader = `
  varying vec3 vNormal;
  void main() {
    gl_FragColor = vec4(1., 1., 0.3, 1.);
  }
`;
