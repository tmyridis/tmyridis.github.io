import {
  ACESFilmicToneMapping,
  BoxGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { gsap, DESKTOP } from "../lib/gsap";
import { buildAvatar } from "./avatar";

// Camera framing: a bust shot for the landing, pulled back to show the desk.
const CLOSE = { y: 3.05, z: 15 };
const WIDE = { y: 1.9, z: 34 };

function buildDesk() {
  const desk = new Group();
  const body = new MeshStandardMaterial({
    color: "#2a2350",
    roughness: 0.6,
    transparent: true,
    opacity: 0,
  });
  const glow = new MeshStandardMaterial({
    color: "#000000",
    emissive: "#c8bfff",
    transparent: true,
    opacity: 0,
  });
  const part = (
    size: [number, number, number],
    position: [number, number, number],
    material = body,
  ) => {
    const mesh = new Mesh(new BoxGeometry(...size), material);
    mesh.position.set(...position);
    desk.add(mesh);
  };
  part([3.2, 0.1, 1.5], [0, 1.62, 1.6]); // desk top
  part([0.1, 1.62, 1.4], [-1.5, 0.81, 1.6]); // desk legs
  part([0.1, 1.62, 1.4], [1.5, 0.81, 1.6]);
  part([1.3, 0.06, 0.42], [0, 1.7, 1.12]); // keyboard
  part([0.18, 0.3, 0.08], [0, 1.8, 2.05]); // monitor stand
  part([2, 1.1, 0.08], [0, 2.45, 2]); // monitor
  part([1.84, 0.94, 0.02], [0, 2.45, 1.95], glow); // screen, facing the avatar
  part([1.1, 0.14, 1], [0, 1, 0]); // chair seat
  part([1.05, 1.3, 0.12], [0, 1.75, -0.52]); // chair back
  part([0.14, 0.9, 0.14], [0, 0.48, 0]); // chair post
  part([0.9, 0.08, 0.9], [0, 0.04, 0]); // chair base

  const screenLight = new PointLight("#c8bfff", 0, 12);
  screenLight.position.set(0, 2.5, 1.5);
  desk.add(screenLight);
  return { desk, body, glow, screenLight };
}

export function createCharacter(container: HTMLElement) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fadeIn = reducedMotion ? 0 : 2;

  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(14.5, 1, 0.1, 1000);
  camera.position.set(0, CLOSE.y, CLOSE.z);

  const keyLight = new DirectionalLight("#ffffff", 0);
  keyLight.position.set(3, 6, 8);
  const rimLight = new DirectionalLight("#ff7ad9", 0);
  rimLight.position.set(-4, 3, -6);
  const fillLight = new HemisphereLight("#c8bfff", "#06050c", 0);
  scene.add(keyLight, rimLight, fillLight);

  const rig = new Group();
  const { avatar, pose, update } = buildAvatar();
  const { desk, body, glow, screenLight } = buildDesk();
  desk.visible = false;
  rig.add(avatar, desk);
  scene.add(rig);

  const render = () => renderer.render(scene, camera);
  const resize = new ResizeObserver(() => {
    const { clientWidth: width, clientHeight: height } = container;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    // Zoom out on narrow screens so the shoulders fit inside the canvas.
    camera.zoom = Math.min(
      1.1,
      (innerWidth < 1024 ? 1.3 : 0.62) * camera.aspect,
    );
    camera.updateProjectionMatrix();
    if (reducedMotion) render();
  });
  resize.observe(container);

  gsap.to(keyLight, { intensity: 2.5, duration: fadeIn });
  gsap.to(rimLight, { intensity: 3, duration: fadeIn });
  gsap.to(fillLight, { intensity: 1.2, duration: fadeIn });
  gsap.fromTo(
    ".character-rim",
    { yPercent: 100, scale: 1.4, opacity: 0 },
    { yPercent: 55, opacity: 1, duration: fadeIn, delay: fadeIn / 10 },
  );
  if (reducedMotion) {
    render();
    return () => {
      resize.disconnect();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }

  // Wave hello once: the right arm goes up and the forearm swings.
  gsap
    .timeline({ delay: 0.8 })
    .to(pose, { waveShoulder: -2.9, duration: 0.5, ease: "power2.out" })
    .fromTo(
      pose,
      { waveElbow: -0.15 },
      {
        waveElbow: -0.75,
        duration: 0.28,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 5,
      },
    )
    .to(pose, {
      waveShoulder: 0,
      waveElbow: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / innerWidth) * 2 - 1;
    pointer.y = (event.clientY / innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointerMove);

  const look = { x: 0, y: 0 };
  const tick = (time: number) => {
    // At the top of the page the head follows the pointer, further down it
    // looks at the screen.
    const atTop = scrollY < 200;
    look.y = MathUtils.lerp(look.y, atTop ? pointer.x * 0.5 : 0, 0.1);
    look.x = MathUtils.lerp(look.x, atTop ? pointer.y * 0.3 : 0.12, 0.1);
    update(time / 1000, look);

    desk.visible = body.opacity > 0;
    screenLight.intensity = glow.opacity > 0.9 ? 6 * glow.emissiveIntensity : 0;
    render();
  };

  // Only render while the canvas is on screen.
  const visibility = new IntersectionObserver(([entry]) =>
    renderer.setAnimationLoop(entry.isIntersecting ? tick : null),
  );
  visibility.observe(container);

  const mm = gsap.matchMedia();
  mm.add(DESKTOP, () => {
    gsap.timeline({ repeat: -1, repeatRefresh: true }).to(glow, {
      emissiveIntensity: () => 0.4 + Math.random() * 1.6,
      duration: () => 0.6 * Math.random(),
      delay: () => 0.1 * Math.random(),
    });

    const scrub = (trigger: string, start: string) =>
      gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

    // Landing -> About: the avatar turns and slides right to make room. The
    // lights swap sides with him so his face stays lit.
    scrub("#landing", "top top")
      .fromTo(rig.rotation, { y: 0 }, { y: -0.7, duration: 1 }, 0)
      .to(keyLight.position, { x: -3, duration: 1 }, 0)
      .to(rimLight.position, { x: 4, duration: 1 }, 0)
      .to(camera.position, { z: CLOSE.z * 0.9 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: "25%", duration: 0.7 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

    // About -> What I do: the camera pulls back, the desk and chair rise in
    // and he starts typing.
    scrub("#about", "center 55%")
      .to(
        camera.position,
        { ...WIDE, duration: 6, delay: 2, ease: "power3.inOut" },
        0,
      )
      .to("#about", { y: "30%", duration: 6 }, 0)
      .to("#about", { opacity: 0, delay: 4.5, duration: 1.5 }, 0)
      .to(".character-model", { x: "22%", delay: 2, duration: 5 }, 0)
      .to(rig.rotation, { y: -0.92, x: 0.12, delay: 3, duration: 3 }, 0)
      .fromTo(desk.position, { y: -4 }, { y: 0, delay: 1.5, duration: 3 }, 0)
      .to(body, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
      .to(pose, { typing: 1, duration: 1.5, delay: 4 }, 0)
      .to(glow, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
      .fromTo(
        ".what-cards",
        { display: "none" },
        { display: "flex", duration: 0.1, delay: 6 },
        0,
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3,
      );

    // What I do -> Career: the whole scene scrolls away with the page.
    scrub("#what", "top top")
      .fromTo(
        ".character-model",
        { y: "0%" },
        { y: "-100%", duration: 4, ease: "none", delay: 1 },
        0,
      )
      .fromTo("#what", { y: 0 }, { y: "15%", duration: 2 }, 0)
      .to(rig.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
  });

  return () => {
    mm.revert();
    visibility.disconnect();
    resize.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    renderer.setAnimationLoop(null);
    renderer.dispose();
    renderer.domElement.remove();
  };
}
