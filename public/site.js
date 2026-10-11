(function () {
  // Highlight the current page in the pill nav.
  var path = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/").replace(/\/home$/, "/");
  var key = /\/about\/?$/.test(path) ? "about" : /\/resume\/?$/.test(path) ? "resume" : /\/work\//.test(path) ? "work" : /\/contact\/?$/.test(path) ? "" : "home";
  var links = document.querySelectorAll("[data-nav]");
  function set(k) { links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-nav") === k); }); }
  set(key);
  // On the homepage, switch to "Work" while the work section is on screen.
  var work = document.getElementById("work");
  if (key === "home" && work) {
    window.addEventListener("scroll", function () {
      var r = work.getBoundingClientRect();
      set(r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.4 ? "work" : "home");
    }, { passive: true });
  }

  // Reveal sections as they enter the viewport. If anything fails, everything stays visible.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    document.documentElement.classList.add("reveal-ready");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    items.forEach(function (el) { io.observe(el); });
    setTimeout(function () { items.forEach(function (el) { el.classList.add("in"); }); }, 6000);
  }
})();
