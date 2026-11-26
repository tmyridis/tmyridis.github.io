import {
  BackSide,
  type BufferGeometry,
  DataTexture,
  type Group,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshToonMaterial,
  RedFormat,
} from "three";

export type Vec = [number, number, number];

// Cel shading: light falls in three hard bands instead of a gradient.
const ramp = new DataTexture(new Uint8Array([95, 175, 255]), 3, 1, RedFormat);
ramp.needsUpdate = true;
export const toon = (color: string) =>
  new MeshToonMaterial({ color, gradientMap: ramp });

// The ink outline: a copy of the mesh pushed out along its normals, drawn
// inside out so only the rim around the silhouette shows.
export function inkMaterial() {
  const ink = new MeshBasicMaterial({ color: "#05040e", side: BackSide });
  ink.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <project_vertex>",
      `vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
      mvPosition.xyz += normalize(normalMatrix * normal) * 0.016;
      gl_Position = projectionMatrix * mvPosition;`,
    );
  };
  return ink;
}

// Returns two functions that put a mesh in a group: `add` gives it an ink
// outline, `detail` doesn't, for parts too fine to carry one.
export function meshBuilder(ink: Material) {
  const detail = (
    parent: Group,
    geometry: BufferGeometry,
    material: Material,
    position: Vec,
    rotation: Vec = [0, 0, 0],
    scale: Vec = [1, 1, 1],
  ) => {
    const mesh = new Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.scale.set(...scale);
    parent.add(mesh);
    return mesh;
  };
  const add: typeof detail = (...args) => {
    const mesh = detail(...args);
    mesh.add(new Mesh(mesh.geometry, ink));
    return mesh;
  };
  return { detail, add };
}
