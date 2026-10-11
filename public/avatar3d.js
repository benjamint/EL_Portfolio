// Ben's 3D avatar: loads the GLB model into the floating guide created by orb.js.
// Until the model is ready (or if WebGL/modules aren't available) the 2.5D version stays.
import * as THREE from "./vendor/three.module.min.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";

const orb = await waitFor(() => document.querySelector(".orb .av-fig"));
const orbEl = orb.closest(".orb");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canvas = document.createElement("canvas");
canvas.className = "av-3d";
orb.appendChild(canvas);

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
} catch (e) {
  canvas.remove();
  throw e;
}
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

const scene = new THREE.Scene();
scene.add(new THREE.HemisphereLight(0xfff6ea, 0xb9a88f, 2.2));
const key = new THREE.DirectionalLight(0xffffff, 2.6);
key.position.set(-1.2, 2.2, 3);
scene.add(key);
const rim = new THREE.DirectionalLight(0xdfeee6, 1.4);
rim.position.set(2, 1.5, -2.5);
scene.add(rim);

const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 20);
camera.position.set(0, 0.05, 3.4);
camera.lookAt(0, 0.02, 0);

const pivot = new THREE.Group(); // turns and waddles
scene.add(pivot);

const gltf = await new GLTFLoader().loadAsync(new URL("models/ben.glb", import.meta.url).href);
const model = gltf.scene;
model.traverse((o) => {
  if (o.isMesh) {
    const m = o.material;
    m.metalness = 0;
    m.roughness = 0.92; // felt and wool, not plastic
    if (m.color) m.color.set(0xffffff);
    if (m.map) m.map.anisotropy = 4;
  }
});
// Stand him on the ground at the pivot.
const box = new THREE.Box3().setFromObject(model);
model.position.y = -box.min.y - (box.max.y - box.min.y) / 2;
pivot.add(model);

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  if (canvas.width !== Math.round(w * renderer.getPixelRatio())) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
}

let yaw = -0.35, pitch = 0, spin = 0, spinStart = -1, wasHop = false;
const clock = new THREE.Clock();

function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  resize();
  const t = clock.getElapsedTime();
  const look = window.__avLook || { x: -0.35, y: 0 };
  const walking = orbEl.classList.contains("walking");

  // Turn toward where he's looking/going. Sideways while walking, gentler when idle.
  const targetYaw = Math.max(-1, Math.min(1, look.x)) * (walking ? 1.25 : 0.75);
  const targetPitch = Math.max(-1, Math.min(1, look.y)) * 0.18;
  const k = reduce ? 1 : 0.08;
  yaw += (targetYaw - yaw) * k;
  pitch += (targetPitch - pitch) * k;

  // A little celebratory spin each time he hops into a new section.
  const hop = orbEl.classList.contains("hop");
  if (hop && !wasHop && !reduce && !walking) spinStart = t;
  wasHop = hop;
  if (spinStart >= 0) {
    const p = Math.min(1, (t - spinStart) / 0.9);
    spin = (1 - Math.pow(1 - p, 3)) * Math.PI * 2;
    if (p >= 1) { spinStart = -1; spin = 0; }
  }

  pivot.rotation.y = yaw + spin;
  pivot.rotation.x = pitch;
  if (reduce) {
    pivot.rotation.z = 0;
    pivot.position.y = 0;
    model.scale.set(1, 1, 1);
  } else if (walking) {
    // Toy-like waddle: rock side to side with a small bounce.
    pivot.rotation.z = Math.sin(t * 11) * 0.09;
    pivot.position.y = Math.abs(Math.sin(t * 11)) * 0.035;
    model.scale.set(1, 1, 1);
  } else {
    // Idle: breathe and sway a touch.
    pivot.rotation.z = Math.sin(t * 0.9) * 0.025;
    pivot.position.y = 0;
    const b = 1 + Math.sin(t * 1.8) * 0.012;
    model.scale.set(1 + (b - 1) * 0.5, b, 1 + (b - 1) * 0.5);
  }
  renderer.render(scene, camera);
}
frame();
orbEl.classList.add("three-on");

function waitFor(fn) {
  return new Promise((resolve) => {
    const tick = () => { const v = fn(); if (v) resolve(v); else setTimeout(tick, 50); };
    tick();
  });
}
