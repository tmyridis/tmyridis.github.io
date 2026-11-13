import {
  BoxGeometry,
  type BufferGeometry,
  CapsuleGeometry,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type Vec = [number, number, number];

const flat = (color: string) =>
  new MeshStandardMaterial({ color, roughness: 0.8, flatShading: true });

// A low-poly guy with orange hair and a beard, sitting down, built from
// primitives. Returns the group and an update function that poses it.
export function buildAvatar() {
  const skin = flat("#f0b48a");
  const hair = flat("#f26a1b");
  hair.side = DoubleSide;
  const hoodie = flat("#7c3aed");
  const pants = flat("#252238");
  const dark = flat("#14121c");
  const white = flat("#ecebf5");

  const add = (
    parent: Group,
    geometry: BufferGeometry,
    material: MeshStandardMaterial,
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
  const group = (parent: Group, position: Vec) => {
    const child = new Group();
    child.position.set(...position);
    parent.add(child);
    return child;
  };

  const avatar = new Group();

  // Legs, bent at the knee for sitting.
  const hips = group(avatar, [0, 1.25, 0]);
  add(hips, new RoundedBoxGeometry(1, 0.42, 0.65, 2, 0.15), pants, [0, 0, 0]);
  for (const x of [-0.27, 0.27]) {
    add(
      hips,
      new CapsuleGeometry(0.2, 0.65, 2, 8),
      pants,
      [x, -0.02, 0.5],
      [Math.PI / 2, 0, 0],
    );
    add(hips, new CapsuleGeometry(0.17, 0.7, 2, 8), pants, [x, -0.6, 0.95]);
    add(hips, new RoundedBoxGeometry(0.34, 0.22, 0.62, 2, 0.08), white, [
      x,
      -1.14,
      1.06,
    ]);
  }

  // Torso, pivoting at the hips so it can lean and breathe.
  const torso = group(avatar, [0, 1.3, 0]);
  add(
    torso,
    new RoundedBoxGeometry(1.2, 1.25, 0.72, 2, 0.28),
    hoodie,
    [0, 0.62, 0],
  );
  add(
    torso,
    new SphereGeometry(0.42, 8, 6),
    hoodie,
    [0, 1.2, -0.26],
    [0, 0, 0],
    [1.1, 0.55, 0.7],
  ); // hood
  add(torso, new CapsuleGeometry(0.2, 0.2, 2, 8), skin, [0, 1.32, 0.02]); // neck
  for (const x of [-0.13, 0.13]) {
    add(torso, new BoxGeometry(0.035, 0.32, 0.03), white, [x, 0.98, 0.37]); // drawstrings
  }

  const arms = [-1, 1].map((side) => {
    const shoulder = group(torso, [side * 0.7, 1.08, 0]);
    add(shoulder, new CapsuleGeometry(0.18, 0.5, 2, 8), hoodie, [0, -0.34, 0]);
    const elbow = group(shoulder, [0, -0.72, 0]);
    add(elbow, new CapsuleGeometry(0.16, 0.45, 2, 8), hoodie, [0, -0.3, 0]);
    add(elbow, new SphereGeometry(0.17, 8, 6), skin, [0, -0.68, 0]);
    return { side, shoulder, elbow };
  });

  // Head, pivoting at the neck. Hair and beard are shells around the skull.
  const head = group(torso, [0, 1.42, 0]);
  const skull: Vec = [0, 0.52, 0];
  add(
    head,
    new SphereGeometry(0.6, 12, 9),
    skin,
    skull,
    [0, 0, 0],
    [1, 1.08, 1],
  );
  add(
    head,
    new SphereGeometry(0.64, 12, 5, 0, Math.PI * 2, 0, Math.PI * 0.5),
    hair,
    skull,
    [-0.5, 0, 0],
    [1.03, 1.12, 1.06],
  );
  add(
    head,
    new SphereGeometry(0.5, 8, 5),
    hair,
    [0.04, 1.02, 0.12],
    [-0.3, 0, 0.1],
    [1.05, 0.5, 0.85],
  ); // quiff
  add(
    head,
    // The front 210 degrees of the lower half of a sphere.
    new SphereGeometry(
      0.63,
      12,
      4,
      -Math.PI * 0.085,
      Math.PI * 1.17,
      Math.PI * 0.57,
      Math.PI * 0.36,
    ),
    hair,
    skull,
    [0, 0, 0],
    [1.04, 1.16, 1.07],
  );
  add(
    head,
    new RoundedBoxGeometry(0.4, 0.1, 0.1, 1, 0.04),
    hair,
    [0, 0.34, 0.6],
  ); // moustache
  add(head, new BoxGeometry(0.16, 0.035, 0.05), dark, [0, 0.25, 0.63]); // mouth
  add(
    head,
    new SphereGeometry(0.075, 6, 5),
    skin,
    [0, 0.47, 0.62],
    [0, 0, 0],
    [1, 1.2, 1],
  ); // nose
  const eyes = [-1, 1].map((side) => {
    add(head, new BoxGeometry(0.06, 0.34, 0.24), hair, [side * 0.59, 0.5, 0.1]); // sideburn
    add(
      head,
      new SphereGeometry(0.11, 6, 5),
      skin,
      [side * 0.62, 0.52, -0.02],
      [0, 0, 0],
      [0.5, 1, 0.8],
    ); // ear
    add(
      head,
      new BoxGeometry(0.22, 0.055, 0.06),
      hair,
      [side * 0.21, 0.76, 0.55],
      [0, 0, side * -0.08],
    ); // brow
    return add(head, new SphereGeometry(0.06, 8, 6), dark, [
      side * 0.21,
      0.62,
      0.55,
    ]);
  });

  // `typing` blends the arms from resting (0) to on the keyboard (1). The
  // wave values are added on top of the right arm.
  const pose = { typing: 0, waveShoulder: 0, waveElbow: 0 };
  const update = (time: number, look: { x: number; y: number }) => {
    const typing = pose.typing;
    torso.scale.y = 1 + Math.sin(time * 1.6) * 0.012;
    torso.rotation.x = typing * 0.1;
    head.rotation.set(look.x, look.y, 0);
    const blink = time % 4 < 0.12 ? 0.1 : 1;
    for (const eye of eyes) eye.scale.y = blink;
    for (const { side, shoulder, elbow } of arms) {
      const tap = typing * Math.sin(time * 13 + side) * 0.07;
      shoulder.rotation.set(
        MathUtils.lerp(0.05, -0.38, typing),
        0,
        side * MathUtils.lerp(0.12, -0.12, typing) +
          (side < 0 ? pose.waveShoulder : 0),
      );
      elbow.rotation.set(
        MathUtils.lerp(-0.15, -1.2, typing) + tap,
        0,
        side < 0 ? pose.waveElbow : 0,
      );
    }
  };
  update(0, { x: 0, y: 0 });

  return { avatar, pose, update };
}
