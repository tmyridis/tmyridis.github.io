import {
  Color,
  ConeGeometry,
  CylinderGeometry,
  Group,
  InstancedMesh,
  type Material,
  Matrix4,
  PointLight,
  SphereGeometry,
  TorusGeometry,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { inkMaterial, meshBuilder, toon, type Vec } from "./toon";

// The setup the camera pulls back to: a desk with a monitor, keyboard and a
// few things on it, a PC underneath and a gaming chair, in the same cel
// shading as the avatar and sized around him. The camera looks from his
// front left, so it sees the back of the monitor.
//
// Everything starts invisible. Fading `materials` in shows the furniture, and
// `glow` is the screen, which switches on separately.
export function buildDesk() {
  const desk = new Group();
  const materials: Material[] = [];
  const fading = <T extends Material>(material: T) => {
    material.transparent = true;
    material.opacity = 0;
    materials.push(material);
    return material;
  };
  const paint = (color: string) => fading(toon(color));
  // Lights up by itself instead of taking the scene's light.
  const lit = (color: string) => {
    const material = toon("#000000");
    material.emissive.set(color);
    return material;
  };

  const wood = paint("#43367c");
  const metal = paint("#1d1933");
  const plastic = paint("#15131f");
  const fabric = paint("#2a2350");
  const stripe = paint("#7c3aed");
  const white = paint("#f2f1f8");
  const pink = paint("#ff7ad9");
  const green = paint("#3fae7a");
  const yellow = paint("#ffd23f");
  const orange = paint("#f26a1b");
  const led = fading(lit("#ff7ad9"));
  const glow = lit("#c8bfff");
  glow.transparent = true;
  glow.opacity = 0;

  const { detail, add } = meshBuilder(fading(inkMaterial()));
  // Soft edges, so the outline wraps around the corners.
  const box = (material: Material, size: Vec, position: Vec, rotation?: Vec) =>
    add(
      desk,
      new RoundedBoxGeometry(...size, 2, Math.min(...size) * 0.3),
      material,
      position,
      rotation,
    );
  const across: Vec = [0, 0, Math.PI / 2];

  // Desk: a top on two leg frames, with a panel across the back.
  box(wood, [3.2, 0.1, 1.5], [0, 1.62, 1.6]);
  for (const x of [-1.45, 1.45]) {
    box(metal, [0.08, 1.57, 0.08], [x, 0.79, 1]);
    box(metal, [0.08, 1.57, 0.08], [x, 0.79, 2.2]);
    box(metal, [0.1, 0.07, 1.5], [x, 0.035, 1.6]);
  }
  box(metal, [2.82, 0.4, 0.04], [0, 1.3, 2.2]);
  box(fabric, [2.3, 0.016, 0.8], [0.15, 1.677, 1.25]); // desk mat

  // Keyboard, under his hands, with an accent key at each end.
  box(plastic, [1.3, 0.05, 0.42], [0, 1.705, 1.12]);
  const keys = new InstancedMesh(
    new RoundedBoxGeometry(0.075, 0.04, 0.075, 1, 0.012),
    paint("#ffffff"),
    13 * 4,
  );
  for (let i = 0; i < keys.count; i++) {
    const column = i % 13;
    const row = Math.floor(i / 13);
    keys.setMatrixAt(
      i,
      new Matrix4().setPosition(
        (column - 6) * 0.093,
        1.735,
        1.12 + (row - 1.5) * 0.093,
      ),
    );
    keys.setColorAt(
      i,
      new Color(
        column === 0 && row === 3
          ? "#ff7ad9"
          : column === 12 && row < 3 && row > 0
            ? "#a78bfa"
            : "#f2f1f8",
      ),
    );
  }
  desk.add(keys);
  add(
    desk,
    new SphereGeometry(1, 16, 12),
    white,
    [0.95, 1.7, 1.15],
    [0, 0, 0],
    [0.085, 0.05, 0.13],
  ); // mouse

  // Monitor: the screen faces the avatar, the housing, vents and light strip
  // face the camera.
  box(plastic, [2.08, 1.18, 0.07], [0, 2.48, 2]);
  detail(
    desk,
    new RoundedBoxGeometry(1.96, 1.06, 0.02, 1, 0.005),
    glow,
    [0, 2.48, 1.962],
  );
  box(metal, [1.3, 0.7, 0.1], [0, 2.48, 2.07]);
  for (const y of [2.6, 2.67, 2.74]) {
    detail(desk, new RoundedBoxGeometry(0.5, 0.025, 0.02, 1, 0.005), plastic, [
      0,
      y,
      2.122,
    ]);
  }
  detail(
    desk,
    new RoundedBoxGeometry(0.9, 0.035, 0.02, 1, 0.005),
    led,
    [0, 2.22, 2.122],
  );
  box(metal, [0.12, 0.62, 0.07], [0, 2, 2.14]); // neck
  box(metal, [0.75, 0.05, 0.4], [0, 1.695, 2.08]); // foot

  // Mug.
  add(desk, new CylinderGeometry(0.09, 0.08, 0.2, 16), pink, [1.3, 1.77, 1.02]);
  add(desk, new TorusGeometry(0.06, 0.018, 6, 12), pink, [1.4, 1.77, 1.02]);
  detail(
    desk,
    new CylinderGeometry(0.075, 0.075, 0.01, 16),
    plastic,
    [1.3, 1.872, 1.02],
  );

  // Plant: spiky leaves fanning out of a pot.
  add(
    desk,
    new CylinderGeometry(0.12, 0.09, 0.18, 16),
    white,
    [-0.6, 1.76, 2.18],
  );
  add(desk, new ConeGeometry(0.06, 0.4, 5), green, [-0.6, 2.03, 2.18]);
  for (let i = 0; i < 5; i++) {
    const turn = (i * Math.PI * 2) / 5;
    const leaf = add(
      desk,
      new ConeGeometry(0.06, 0.34, 5),
      green,
      [-0.6 + Math.sin(turn) * 0.09, 1.97, 2.18 + Math.cos(turn) * 0.09],
      [0.6, turn, 0],
      [1, 1, 0.5],
    );
    leaf.rotation.order = "YXZ"; // lean outwards, then turn
  }

  // Rubber duck.
  add(
    desk,
    new SphereGeometry(1, 16, 12),
    yellow,
    [-1.25, 1.755, 2.1],
    [0, 0, 0],
    [0.1, 0.085, 0.13],
  );
  add(desk, new SphereGeometry(0.07, 16, 12), yellow, [-1.25, 1.88, 2.16]);
  detail(
    desk,
    new ConeGeometry(0.03, 0.07, 6),
    orange,
    [-1.25, 1.87, 2.25],
    [Math.PI / 2, 0, 0],
  );
  for (const x of [-1.285, -1.215]) {
    detail(desk, new SphereGeometry(0.012, 6, 4), plastic, [x, 1.9, 2.215]);
  }

  // PC under the desk, with two lit fans behind its side panel.
  box(metal, [0.42, 0.95, 0.9], [1.08, 0.53, 1.7]);
  detail(
    desk,
    new RoundedBoxGeometry(0.02, 0.8, 0.75, 1, 0.005),
    plastic,
    [1.292, 0.53, 1.7],
  );
  for (const y of [0.34, 0.72]) {
    detail(
      desk,
      new TorusGeometry(0.13, 0.025, 6, 20),
      led,
      [1.305, y, 1.9],
      [0, Math.PI / 2, 0],
    );
  }

  // Chair: a five-star base on casters, a seat, and a tall back with wings
  // and a headrest.
  for (let i = 0; i < 5; i++) {
    const turn = (i * Math.PI * 2) / 5;
    const [x, z] = [Math.sin(turn), Math.cos(turn)];
    box(metal, [0.07, 0.05, 0.52], [x * 0.28, 0.12, z * 0.28], [0, turn, 0]);
    add(desk, new SphereGeometry(0.06, 10, 8), plastic, [
      x * 0.52,
      0.06,
      z * 0.52,
    ]);
  }
  add(desk, new CylinderGeometry(0.05, 0.05, 0.78, 12), metal, [0, 0.5, 0]);
  box(fabric, [1.1, 0.2, 1], [0, 0.97, 0]);
  box(fabric, [1, 1.7, 0.14], [0, 2, -0.66], [-0.08, 0, 0]);
  for (const x of [-0.5, 0.5]) {
    box(stripe, [0.14, 0.8, 0.2], [x, 2.3, -0.62], [-0.08, 0, 0]);
  }
  box(stripe, [0.6, 0.3, 0.14], [0, 2.95, -0.8], [-0.08, 0, 0]);
  add(
    desk,
    new CylinderGeometry(0.05, 0.05, 1.04, 12),
    metal,
    [0, 1.02, -0.62],
    across,
  ); // the bar the back hinges on

  const screenLight = new PointLight("#c8bfff", 0, 12);
  screenLight.position.set(0, 2.5, 1.5);
  desk.add(screenLight);
  return { desk, materials, glow, screenLight };
}
