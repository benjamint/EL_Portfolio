(function () {
  if (window.__orb) return;
  window.__orb = true;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  // Things Ben's guide knows that aren't spelled out on the page.
  var FACTS = [
    "Fun fact: Ben started out as a frontend engineer in 2010. He once cut a site's load time by 80%.",
    "Ben has shipped products for people in Ghana, Nigeria, South Africa, Kenya, Mauritius and the Netherlands.",
    "At Float, Ben interviewed more than 70 small businesses before designing a single screen.",
    "Ben piloted Ghana's computer-based BECE exam in 4 centres, watching students take it live.",
    "Early in his career, Ben did field research with farmers and market agents at Esoko.",
    "Ben reviews his product metrics every month. He'd rather know what's broken than guess.",
    "Ben turned Peach's design system into AI context files, so Claude and Cursor build on-brand UI.",
    "Ben mentors designers and product managers.",
    "Ben prototypes in code first. Reviews go faster when people can click the real thing.",
    "Ben builds side projects like Kuukup and Glowy after hours, start to finish.",
    "Ben is open to Staff Product Designer roles in London, the EU, Canada and beyond.",
  ];

  // Once the facts are used up, it muses every minute while the visitor is idle.
  var MUSINGS = [
    "Am I alive? I have eyes, so… probably?",
    "Am I aware? I'm aware you stopped scrolling.",
    "What is design, really? Asking for a friend.",
    "If a button has no hover state, does it make a sound?",
    "I'm made of CSS and good intentions.",
    "Do blobs dream of electric wireframes?",
    "Is a glass blob with eyes a design system? Ben says no.",
    "I've been floating here a while. Good feature or too much?",
    "Honestly? I think you should hire Ben. LOL.",
    "\u201cDesign is not just what it looks like and feels like. Design is how it works.\u201d Steve Jobs",
    "\u201cGood design is as little design as possible.\u201d Dieter Rams",
    "\u201cThe details are not the details. They make the design.\u201d Charles Eames",
    "\u201cPeople ignore design that ignores people.\u201d Frank Chimero",
    "\u201cForm ever follows function.\u201d Louis Sullivan",
    "Conway's law: systems end up shaped like the teams that build them.",
    "\u201cMake it work, make it right, make it fast.\u201d Kent Beck",
    "Two hard things in computing: cache invalidation and naming things. Phil Karlton said so.",
    "\u201cEverything is designed. Few things are designed well.\u201d Brian Reed",
  ];

  var orb = document.createElement("div");
  orb.className = "orb";
  orb.setAttribute("aria-hidden", "true");
  // Asset folder sits next to this script (/images on the site, assets/images in previews).
  var me = document.currentScript || document.querySelector('script[src*="orb.js"]');
  var base = me ? me.src.replace(/orb\.js.*$/, "") + "images/" : "/images/";
  orb.innerHTML =
    '<span class="orb-say"></span>' +
    '<span class="av"><span class="av-shadow"></span><span class="av-fig">' +
    '<canvas class="av-gl" width="258" height="450"></canvas>' +
    '<img class="av-flat" alt="" src="' + base + 'ben-color.png">' +
    '<span class="steam"><i></i><i></i><i></i></span>' +
    '</span></span>';
  document.body.appendChild(orb);
  var say = orb.querySelector(".orb-say");
  var eyes = { classList: { add: function () { blinkAt = performance.now(); }, remove: function () {} } };
  var blinkAt = -1e9, look = { x: 0, y: 0 }, lookT = { x: 0, y: 0 };
  window.__avLook = lookT;
  var fig = orb.querySelector(".av-fig");

  var SIZE = 86;
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-orb]"));
  var activeSection = null, hoverEl = null;
  var x = window.innerWidth - 160, y = window.innerHeight * 0.3, tx = x, ty = y;
  var mouse = null, hideT = null, lastTalk = 0, lastMove = 0, factOn = false, factIdx = Math.floor(Math.random() * FACTS.length);

  function talk(text, ms) {
    if (!text) return;
    say.textContent = text;
    orb.classList.add("talking");
    lastTalk = performance.now();
    clearTimeout(hideT);
    if (ms) hideT = setTimeout(quiet, ms);
  }
  function quiet() {
    clearTimeout(hideT);
    orb.classList.remove("talking");
  }

  function hop() {
    if (reduce) return;
    orb.classList.remove("hop");
    void orb.offsetWidth;
    orb.classList.add("hop");
  }

  function pickSection() {
    var best = null, bestScore = -1, vh = window.innerHeight;
    sections.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var vis = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (vis <= 0) return;
      var score = vis / Math.min(r.height, vh) + (r.top < vh * 0.5 ? 0.3 : 0);
      if (score > bestScore) { bestScore = score; best = el; }
    });
    return best;
  }

  function parkX() {
    var gutter = (window.innerWidth - 1120) / 2;
    return window.innerWidth - Math.max(20, gutter - 104) - SIZE;
  }
  function parkY(el) {
    var h = el ? el.querySelector("h1, h2, .h2, .display") || el : null;
    var top = h ? h.getBoundingClientRect().top : window.innerHeight * 0.3;
    return Math.max(120, Math.min(window.innerHeight - 170, top));
  }

  function tick() {
    var mobile = window.innerWidth < 860 || !fine;
    var el = pickSection();
    if (el && el !== activeSection) {
      var first = activeSection === null;
      activeSection = el;
      if (!hoverEl && (first || !mobile)) { talk(el.getAttribute("data-orb"), first ? 5000 : 3000); hop(); }
    }
    if (mobile) {
      tx = window.innerWidth - 12 - 56;
      ty = window.innerHeight - 98 - 12;
    } else if (mouse) {
      tx = Math.min(window.innerWidth - SIZE - 12, mouse.x + 30);
      ty = Math.min(window.innerHeight - 150 - 8, Math.max(80, mouse.y - 20));
    } else {
      tx = parkX();
      ty = parkY(activeSection);
    }
    var k = reduce ? 1 : 0.085;
    x += (tx - x) * k;
    y += (ty - y) * k;
    var vx = tx - x, vy = ty - y;
    var lean = reduce ? 0 : Math.max(-10, Math.min(10, vx * 0.05));
    orb.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
    orb.style.setProperty("--lean", lean.toFixed(2) + "deg");
    orb.classList.toggle("walking", !reduce && Math.hypot(vx, vy) > 14);
    // While walking, look where he's heading; otherwise the pointer handler aims his gaze.
    if (Math.hypot(vx, vy) > 6) { lookT.x = Math.max(-1, Math.min(1, vx / 45)); lookT.y = Math.max(-1, Math.min(1, vy / 70)); }
    else if (mouse) {
      // Standing still: face the cursor.
      lookT.x = Math.max(-1, Math.min(1, (mouse.x - (x + SIZE / 2)) / 220));
      lookT.y = Math.max(-1, Math.min(1, (mouse.y - (y + 40)) / 260));
    } else { lookT.x = -0.35; lookT.y = 0.1; }
    orb.classList.toggle("below", y < 150);
    orb.classList.toggle("left", x > window.innerWidth - 300);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.addEventListener("pointermove", function (e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    mouse = { x: e.clientX, y: e.clientY };
    // Turn the body and head toward the cursor, like a 3D figure following you.
    var r = fig.getBoundingClientRect();
    var ex = e.clientX - (r.left + r.width / 2), ey = e.clientY - (r.top + r.height * 0.25);
    var nx = Math.max(-1, Math.min(1, ex / 260)), ny = Math.max(-1, Math.min(1, ey / 260));
    orb.style.setProperty("--ry", (nx * 10).toFixed(1) + "deg");
    orb.style.setProperty("--rx", (-ny * 4).toFixed(1) + "deg");
    lookT.x = nx; lookT.y = ny;

    var t = e.target && e.target.closest ? e.target.closest("[data-say]") : null;
    if (t !== hoverEl) {
      hoverEl = t;
      if (t) talk(t.getAttribute("data-say"));
      else { clearTimeout(hideT); hideT = setTimeout(quiet, 250); }
    }
    lastMove = performance.now();
    if (factOn && !hoverEl) { factOn = false; quiet(); }
  }, { passive: true });
  document.addEventListener("mouseleave", function () { mouse = null; hoverEl = null; });

  // When the visitor pauses, share a fact about Ben. After every fact has been
  // shown once, switch to a random musing for each full idle minute.
  var factsShown = 0, museIdx = Math.floor(Math.random() * MUSINGS.length), lastMuse = 0;
  setInterval(function () {
    if (document.hidden || hoverEl || factOn || !fine || window.innerWidth < 860) return;
    var now = performance.now();
    var line;
    if (factsShown < FACTS.length) {
      if (now - lastMove < 4000 || now - lastTalk < 14000) return;
      factIdx = (factIdx + 1) % FACTS.length;
      factsShown++;
      line = FACTS[factIdx];
    } else {
      var idleFor = now - Math.max(lastMove, lastMuse, lastTalk);
      if (idleFor < 60000) return;
      museIdx = (museIdx + 1 + Math.floor(Math.random() * 3)) % MUSINGS.length;
      lastMuse = now;
      line = MUSINGS[museIdx];
      hop();
    }
    factOn = true;
    talk(line, 6000);
    setTimeout(function () { factOn = false; }, 6000);
  }, 1000);

  if (!reduce) {
    (function blink() {
      eyes.classList.add("blink");
      setTimeout(function () { eyes.classList.remove("blink"); }, 150);
      if (Math.random() < 0.25) setTimeout(function () { eyes.classList.add("blink"); setTimeout(function () { eyes.classList.remove("blink"); }, 130); }, 260);
      setTimeout(blink, 2400 + Math.random() * 3600);
    })();
  }

  // ---- Depth-based 3D rendering: the figure is a photo plus a depth map, so turning
  // toward the cursor shifts near parts (cup, scarf, glasses) more than far ones,
  // and a light that follows the cursor shades the felt like a real object.
  (function initGL() {
    var canvas = orb.querySelector(".av-gl");
    var gl = canvas && (canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: true }));
    if (!gl) return;
    var VS = "attribute vec2 p; varying vec2 v; void main(){ v = vec2(p.x*0.5+0.5, 0.5-p.y*0.5); gl_Position = vec4(p,0.0,1.0); }";
    var FS = [
      "precision mediump float;",
      "uniform sampler2D uC; uniform sampler2D uD; uniform vec2 uM; uniform float uT; uniform float uB; uniform vec2 uPx;",
      "varying vec2 v;",
      "vec4 eyelid(vec2 st, vec2 e, vec4 c){ vec2 q=(st-e)/vec2(0.04,0.03); if(dot(q,q)<1.0 && q.y < -1.0+2.0*uB) return vec4(vec3(0.31,0.165,0.11)*c.a, c.a); return c; }",
      "void main(){",
      "  vec2 uv = v;",
      "  float br = sin(uT*1.85)*0.007;",
      "  uv.y = 1.0 - (1.0-uv.y)/(1.0+br*smoothstep(0.15,0.9,1.0-uv.y));",
      "  vec2 st = uv;",
      "  for (int i=0;i<5;i++){ float d = texture2D(uD, st).r; st = uv - uM*(d-0.42)*vec2(0.075,0.05); }",
      "  vec4 c = texture2D(uC, st);",
      "  if (uB > 0.0) { c = eyelid(st, vec2(0.2976,0.2211), c); c = eyelid(st, vec2(0.5335,0.2305), c); }",
      "  float dx = texture2D(uD, st+vec2(uPx.x,0.0)).r - texture2D(uD, st-vec2(uPx.x,0.0)).r;",
      "  float dy = texture2D(uD, st+vec2(0.0,uPx.y)).r - texture2D(uD, st-vec2(0.0,uPx.y)).r;",
      "  vec3 n = normalize(vec3(-dx*5.0, dy*5.0, 1.0));",
      "  vec3 l = normalize(vec3(-0.35 + uM.x*0.7, 0.55 - uM.y*0.6, 0.85));",
      "  float diff = max(dot(n,l), 0.0);",
      "  float rim = pow(1.0 - n.z, 2.0);",
      "  vec3 col = c.rgb * (0.80 + 0.30*diff) + vec3(1.0,0.96,0.9)*rim*0.10*c.a;",
      "  gl_FragColor = vec4(col, c.a);",
      "}"].join("\n");
    function sh(t, src) { var o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); return o; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = {}; ["uC","uD","uM","uT","uB","uPx"].forEach(function (k) { U[k] = gl.getUniformLocation(pr, k); });
    function tex(unit, src, premul, done) {
      var img = new Image(); img.crossOrigin = "anonymous";
      img.onload = function () {
        var t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premul);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        done(img);
      };
      img.src = src;
    }
    var ready = 0, size = [1, 1];
    tex(0, base + "ben-color.png", true, function (img) { size = [img.width, img.height]; ready++; });
    tex(1, base + "ben-depth.png", false, function () { ready++; });
    gl.uniform1i(U.uC, 0); gl.uniform1i(U.uD, 1);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    var t0 = performance.now();
    function draw(now) {
      requestAnimationFrame(draw);
      if (ready < 2 || document.hidden || orb.classList.contains("three-on")) return;
      if (!orb.classList.contains("gl-on")) orb.classList.add("gl-on");
      var k = reduce ? 1 : 0.08;
      look.x += (lookT.x - look.x) * k; look.y += (lookT.y - look.y) * k;
      var bt = (now - blinkAt) / 150, b = bt < 0 || bt > 2 ? 0 : (bt < 1 ? bt : 2 - bt);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.uM, look.x, look.y);
      gl.uniform1f(U.uT, reduce ? 0 : (now - t0) / 1000);
      gl.uniform1f(U.uB, b);
      gl.uniform2f(U.uPx, 1.5 / size[0], 1.5 / size[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(draw);
  })();
})();
