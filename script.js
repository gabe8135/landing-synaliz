const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const contactForm = document.querySelector(".contact-form");
const animatedItems = document.querySelectorAll(
  ".section-heading, .service-grid article, .timeline article, .proof-panel, .deliverables span, .contact-card"
);

function setMenuState(isOpen) {
  if (!menuToggle || !mobileNav) return;

  mobileNav.classList.toggle("open", isOpen);
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = !mobileNav?.classList.contains("open");
  setMenuState(isOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

document.addEventListener("click", (event) => {
  if (!mobileNav?.classList.contains("open")) return;
  if (mobileNav.contains(event.target) || menuToggle?.contains(event.target)) return;

  setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const nome = data.get("nome") || "";
  const contato = data.get("contato") || "";
  const projeto = data.get("projeto") || "";
  const subject = encodeURIComponent("Briefing de site com a Synaliz");
  const body = encodeURIComponent(
    `Nome: ${nome}\nContato: ${contato}\n\nProjeto:\n${projeto}`
  );
  window.location.href = `mailto:gabriel@synaliz.com?subject=${subject}&body=${body}`;
});

if ("IntersectionObserver" in window) {
  animatedItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
  );

  animatedItems.forEach((item) => revealObserver.observe(item));
}

const canvas = document.querySelector("#signal-field");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let nodes = [];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(34, Math.floor(width / 32));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(159, 179, 192, 0.72)";
  ctx.strokeStyle = "rgba(90, 141, 160, 0.18)";
  ctx.lineWidth = 1;

  nodes.forEach((node, index) => {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    ctx.beginPath();
    ctx.arc(node.x, node.y, 1.4, 0, Math.PI * 2);
    ctx.fill();

    for (let i = index + 1; i < nodes.length; i += 1) {
      const other = nodes[i];
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 145) {
        ctx.globalAlpha = 1 - distance / 145;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(draw);
}

resizeCanvas();
draw();
window.addEventListener("resize", resizeCanvas);
