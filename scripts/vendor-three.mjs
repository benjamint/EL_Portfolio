// Copies three.js and its glTF loader into public/vendor so the browser can load
// them as plain ES modules (the 3D avatar runs outside the Next.js bundle).
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const three = join(root, "node_modules", "three");
const out = join(root, "public", "vendor");
mkdirSync(out, { recursive: true });

copyFileSync(join(three, "build", "three.module.min.js"), join(out, "three.module.min.js"));
const rewrite = (src, dest, extra = []) => {
  let s = readFileSync(join(three, src), "utf8").replace(/from 'three';/g, "from './three.module.min.js';");
  for (const [a, b] of extra) s = s.replace(a, b);
  writeFileSync(join(out, dest), s);
};
rewrite("examples/jsm/loaders/GLTFLoader.js", "GLTFLoader.js", [["from '../utils/BufferGeometryUtils.js'", "from './BufferGeometryUtils.js'"]]);
rewrite("examples/jsm/utils/BufferGeometryUtils.js", "BufferGeometryUtils.js");
console.log("three.js vendored to public/vendor");
