import {
  CapsuleGeometry,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  Group,
  type Material,
  MathUtils,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { inkMaterial, meshBuilder, toon, type Vec } from "./toon";

const SKULL = 0.62;
// The lower half of the skull narrows into a chin that sits a little forward.
const jaw = (y: number) => {
  const t = y < 0 ? (y / SKULL) ** 2 : 0;
  return { x: 1 - 0.45 * t, z: 1 - 0.22 * t, forward: 0.1 * t };
};

function skullGeometry() {
  const geometry = new SphereGeometry(SKULL, 32, 24);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i);
    const { x, z, forward } = jaw(y);
    position.setXYZ(i, position.getX(i) * x, y, position.getZ(i) * z + forward);
  }
  return geometry;
}

// An anime-style guy with short ginger hair, glasses and a white headset, in
// a black hoodie and grey sweatpants, sitting down. Built from primitives.
// Returns the group and an update function that poses it.
export function buildAvatar() {
  const skin = toon("#ffd0b0");
  const hair = toon("#f26a1b");
  const hoodie = toon("#25252d");
  const trim = toon("#3b3b47");
  const pants = toon("#6c6e7b");
  const cuff = toon("#575965");
  const white = toon("#f2f1f8");
  const dark = toon("#14121c");
  const iris = toon("#2f9e6e");
  const accent = toon("#a78bfa");
  const lens = toon("#dfe9ff");
  lens.transparent = true;
  lens.opacity = 0.14;
  lens.depthWrite = false;

  const { detail, add } = meshBuilder(inkMaterial());
  // A thin cylinder between two points.
  const rod = (
    parent: Group,
    material: Material,
    from: Vec,
    to: Vec,
    radius: number,
  ) => {
    const a = new Vector3(...from);
    const b = new Vector3(...to);
    const mesh = detail(
      parent,
      new CylinderGeometry(radius, radius, a.distanceTo(b), 8),
      material,
      a.clone().lerp(b, 0.5).toArray(),
    );
    mesh.quaternion.setFromUnitVectors(
      new Vector3(0, 1, 0),
      b.sub(a).normalize(),
    );
  };
  const group = (parent: Group, position: Vec, rotation: Vec = [0, 0, 0]) => {
    const child = new Group();
    child.position.set(...position);
    child.rotation.set(...rotation);
    parent.add(child);
    return child;
  };

  const avatar = new Group();

  // Legs, bent at the knee for sitting.
  const hips = group(avatar, [0, 1.25, 0]);
  add(hips, new RoundedBoxGeometry(1, 0.42, 0.65, 4, 0.15), pants, [0, 0, 0]);
  for (const x of [-0.27, 0.27]) {
    add(
      hips,
      new CapsuleGeometry(0.2, 0.65, 6, 16),
      pants,
      [x, -0.02, 0.5],
      [Math.PI / 2, 0, 0],
    );
    add(hips, new CapsuleGeometry(0.17, 0.7, 6, 16), pants, [x, -0.6, 0.95]);
    add(hips, new CylinderGeometry(0.19, 0.19, 0.14, 16), cuff, [
      x,
      -0.96,
      0.95,
    ]);
    add(hips, new RoundedBoxGeometry(0.34, 0.2, 0.62, 4, 0.08), white, [
      x,
      -1.11,
      1.06,
    ]);
    add(hips, new RoundedBoxGeometry(0.36, 0.06, 0.64, 2, 0.03), dark, [
      x,
      -1.22,
      1.06,
    ]);
  }

  // Torso, pivoting at the hips so it can lean and breathe.
  const torso = group(avatar, [0, 1.3, 0]);
  add(
    torso,
    new RoundedBoxGeometry(1.2, 1.25, 0.72, 4, 0.28),
    hoodie,
    [0, 0.62, 0],
  );
  add(
    torso,
    new SphereGeometry(0.42, 20, 14),
    hoodie,
    [0, 1.2, -0.28],
    [0, 0, 0],
    [1.15, 0.6, 0.75],
  ); // hood
  add(
    torso,
    new TorusGeometry(0.27, 0.085, 10, 24),
    hoodie,
    [0, 1.22, 0.03],
    [Math.PI / 2 + 0.25, 0, 0],
  ); // collar
  add(torso, new CapsuleGeometry(0.19, 0.2, 6, 16), skin, [0, 1.32, 0.02]); // neck
  for (const side of [-1, 1]) {
    // drawstrings
    rod(
      torso,
      white,
      [side * 0.11, 1.1, 0.35],
      [side * 0.13, 0.8, 0.385],
      0.018,
    );
  }

  const arms = [-1, 1].map((side) => {
    const shoulder = group(torso, [side * 0.7, 1.08, 0]);
    add(shoulder, new CapsuleGeometry(0.18, 0.5, 6, 16), hoodie, [0, -0.34, 0]);
    const elbow = group(shoulder, [0, -0.72, 0]);
    add(elbow, new CapsuleGeometry(0.16, 0.45, 6, 16), hoodie, [0, -0.3, 0]);
    add(
      elbow,
      new CylinderGeometry(0.175, 0.175, 0.12, 16),
      trim,
      [0, -0.54, 0],
    );
    add(elbow, new SphereGeometry(0.16, 16, 12), skin, [0, -0.7, 0]);
    return { side, shoulder, elbow };
  });

  // Head, pivoting at the neck.
  const head = group(torso, [0, 1.42, 0]);
  const skull = group(head, [0, 0.56, 0]);
  add(skull, skullGeometry(), skin, [0, 0, 0]);
  // A point on the face, `lift` in front of the skin.
  const onFace = (x: number, y: number, lift = 0): Vec => {
    const ring = Math.sqrt(SKULL ** 2 - y ** 2);
    const shape = jaw(y);
    return [
      x,
      y,
      ring * shape.z * Math.sqrt(1 - (x / (ring * shape.x)) ** 2) +
        shape.forward +
        lift,
    ];
  };

  // Hair: a close crop tilted back off the forehead, a jagged fringe along
  // the hairline and short spikes brushed up behind it.
  add(
    skull,
    new SphereGeometry(SKULL, 32, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
    hair,
    [0, 0, 0],
    [-0.6, 0, 0],
    [1.06, 1.07, 1.08],
  );
  // Each lock is a cone on the skull at [pitch, yaw], leaning by `lean` from
  // straight out (0) through flat and pointing up (PI / 2) to flat and
  // pointing down (-PI / 2).
  const lock = (pitch: number, yaw: number, length: number, lean: number) => {
    const pivot = group(skull, [0, 0, 0]);
    pivot.rotation.set(-pitch, yaw, 0, "YXZ");
    add(
      pivot,
      // Open at the base, which is buried in the crop, and pressed flat.
      new ConeGeometry(0.11, length, 5, 1, true),
      hair,
      [0, 0, SKULL * 1.03],
      [Math.PI / 2 - lean, 0, 0],
      [1, 1, 0.45],
    );
  };
  for (const yaw of [-0.84, -0.42, 0, 0.42, 0.84]) {
    lock(0.66 - Math.abs(yaw) * 0.22, yaw, 0.16, -1.4);
    lock(0.9, yaw, 0.26, 1);
  }
  for (const yaw of [-0.63, -0.21, 0.21, 0.63]) lock(1.15, yaw, 0.24, 1);

  detail(skull, new SphereGeometry(0.035, 8, 6), skin, onFace(0, -0.27, 0.005)); // nose
  detail(
    skull,
    new TorusGeometry(0.07, 0.012, 6, 12, Math.PI),
    dark,
    onFace(0, -0.37, 0.01),
    [0.75, 0, Math.PI],
  ); // smile

  const eyes = [-1, 1].map((side) => {
    add(
      skull,
      new ConeGeometry(0.08, 0.26, 5, 1, true),
      hair,
      [side * 0.58, -0.04, 0.28],
      [Math.PI, 0, 0],
      [0.4, 1, 1],
    ); // sideburn
    detail(
      skull,
      new RoundedBoxGeometry(0.2, 0.035, 0.03, 2, 0.015),
      hair,
      onFace(side * 0.24, 0.16, 0.01),
      [0, side * 0.4, side * -0.1],
    ); // brow

    const [x, y, z] = onFace(side * 0.23, -0.1, 0.005);
    const eye = group(skull, [x, y, z], [0, Math.atan2(x, z), 0]);
    const disc = new SphereGeometry(1, 20, 14);
    detail(eye, disc, white, [0, 0, 0], [0, 0, 0], [0.11, 0.15, 0.02]);
    detail(eye, disc, iris, [0, -0.012, 0.01], [0, 0, 0], [0.082, 0.118, 0.02]);
    detail(eye, disc, dark, [0, -0.012, 0.02], [0, 0, 0], [0.045, 0.07, 0.02]);
    detail(
      eye,
      disc,
      white,
      [-0.035, 0.05, 0.03],
      [0, 0, 0],
      [0.028, 0.036, 0.015],
    ); // highlight
    detail(
      eye,
      // The top 144 degrees of a ring around the eye.
      new TorusGeometry(0.11, 0.022, 6, 16, Math.PI * 0.8).rotateZ(
        Math.PI * 0.1,
      ),
      dark,
      [0, 0, 0.015],
      [0, 0, 0],
      [1, 1.36, 0.6],
    ); // lash
    return eye;
  });

  // Glasses.
  const glasses = group(skull, [0, -0.1, onFace(0.23, -0.1)[2] + 0.1]);
  for (const side of [-1, 1]) {
    const rim: Vec = [side * 0.24, 0, 0];
    const tilt: Vec = [0, side * 0.18, 0];
    detail(
      glasses,
      new TorusGeometry(0.17, 0.018, 8, 32),
      dark,
      rim,
      tilt,
      [1.12, 1, 1],
    );
    detail(
      glasses,
      new CircleGeometry(0.17, 32),
      lens,
      rim,
      tilt,
      [1.12, 1, 1],
    );
    rod(
      glasses,
      dark,
      [side * 0.43, 0.02, -0.03],
      [side * 0.6, 0.04, -0.5],
      0.014,
    );
  }
  rod(glasses, dark, [-0.06, 0.03, 0.01], [0.06, 0.03, 0.01], 0.014);

  // Headset: a band over the crown, a cup on each ear and a mic on his left.
  add(
    skull,
    new TorusGeometry(0.72, 0.04, 8, 32, Math.PI),
    white,
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 2.2],
  );
  for (const side of [-1, 1]) {
    const across: Vec = [0, 0, Math.PI / 2];
    add(
      skull,
      new CylinderGeometry(0.17, 0.17, 0.09, 20),
      trim,
      [side * 0.63, -0.08, 0],
      across,
    ); // cushion
    add(
      skull,
      new CylinderGeometry(0.2, 0.21, 0.14, 24),
      white,
      [side * 0.74, -0.08, 0],
      across,
    );
    detail(
      skull,
      new CylinderGeometry(0.1, 0.1, 0.02, 20),
      accent,
      [side * 0.815, -0.08, 0],
      across,
    );
  }
  rod(skull, white, [0.76, -0.2, 0.1], [0.54, -0.4, 0.42], 0.016);
  rod(skull, white, [0.54, -0.4, 0.42], [0.28, -0.44, 0.52], 0.016);
  add(skull, new SphereGeometry(0.05, 10, 8), trim, [0.26, -0.44, 0.53]);

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
