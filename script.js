const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const contactForm = document.querySelector(".contact-form");
const serviceCards = document.querySelectorAll("[data-service]");
const serviceModal = document.querySelector("#service-modal");
const modalPanel = serviceModal?.querySelector(".modal-panel");
const modalKicker = document.querySelector("#modal-kicker");
const modalTitle = document.querySelector("#modal-title");
const modalIntro = document.querySelector("#modal-intro");
const modalContent = document.querySelector("#modal-content");
const modalCta = serviceModal?.querySelector(".modal-cta");
const successModal = document.querySelector("#contact-success-modal");
const successPanel = successModal?.querySelector(".modal-panel");
const successClose = successModal?.querySelector(".success-close");
const formNote = contactForm?.querySelector(".form-note");
const animatedItems = document.querySelectorAll(
  ".section-heading, .service-grid article, .timeline article, .contact-card"
);

const serviceDetails = {
  institucional: {
    kicker: "Site institucional",
    title: "Para sua empresa ser entendida e levada a sério.",
    intro:
      "É o site ideal para apresentar quem você é, o que oferece e como o cliente pode falar com você. Funciona como a base oficial da sua marca na internet.",
    bullets: [
      "Mostra serviços, diferenciais, localização e formas de contato.",
      "Ajuda o cliente a confiar antes de chamar no WhatsApp.",
      "Indicado para empresas, profissionais e negócios locais.",
    ],
  },
  landing: {
    kicker: "Landing page",
    title: "Uma página focada em uma ação.",
    intro:
      "A landing page é feita para campanhas, lançamentos ou ofertas específicas. Ela tira distrações e conduz a pessoa para pedir orçamento, se cadastrar ou entrar em contato.",
    bullets: [
      "Ideal para tráfego pago, anúncios e campanhas pontuais.",
      "Texto, design e botões pensados para conversão.",
      "Boa quando você quer vender uma ideia rapidamente.",
    ],
  },
  catalogo: {
    kicker: "Catálogo digital",
    title: "Produtos organizados para facilitar a escolha.",
    intro:
      "O catálogo digital apresenta produtos, categorias e informações comerciais de forma clara. Ele ajuda o cliente a entender opções antes de pedir preço ou orçamento.",
    bullets: [
      "Organiza produtos, linhas, serviços ou pacotes.",
      "Reduz perguntas repetidas no atendimento.",
      "Indicado para lojas, representantes, indústrias e serviços com várias opções.",
    ],
  },
  corporativo: {
    kicker: "Site corporativo",
    title: "Mais estrutura para uma marca em crescimento.",
    intro:
      "O site corporativo é indicado quando sua empresa precisa de mais páginas, mais conteúdo e uma apresentação mais completa para públicos diferentes.",
    bullets: [
      "Pode incluir páginas de serviços, equipe, cases, blog e áreas específicas.",
      "Passa mais autoridade para empresas em expansão.",
      "É preparado para crescer junto com a marca.",
    ],
  },
};

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
    closeServiceModal();
    closeSuccessModal();
  }
});

function openServiceModal(serviceKey) {
  const details = serviceDetails[serviceKey];
  if (!details || !serviceModal || !modalKicker || !modalTitle || !modalIntro || !modalContent) return;

  modalKicker.textContent = details.kicker;
  modalTitle.textContent = details.title;
  modalIntro.textContent = details.intro;
  modalContent.replaceChildren(
    ...details.bullets.map((item) => {
      const bullet = document.createElement("span");
      bullet.textContent = item;
      return bullet;
    })
  );

  serviceModal.classList.add("open");
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeServiceModal() {
  serviceModal?.classList.remove("open");
  serviceModal?.setAttribute("aria-hidden", "true");
  syncModalState();
}

function openSuccessModal() {
  successModal?.classList.add("open");
  successModal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeSuccessModal() {
  successModal?.classList.remove("open");
  successModal?.setAttribute("aria-hidden", "true");
  syncModalState();
}

function syncModalState() {
  const hasOpenModal = serviceModal?.classList.contains("open") || successModal?.classList.contains("open");
  document.body.classList.toggle("modal-open", Boolean(hasOpenModal));
}

serviceCards.forEach((card) => {
  card.addEventListener("click", () => {
    openServiceModal(card.dataset.service);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openServiceModal(card.dataset.service);
    }
  });
});

serviceModal?.addEventListener("click", (event) => {
  if (!modalPanel?.contains(event.target)) {
    closeServiceModal();
  }
});

modalCta?.addEventListener("click", closeServiceModal);

successModal?.addEventListener("click", (event) => {
  if (!successPanel?.contains(event.target)) {
    closeSuccessModal();
  }
});

successClose?.addEventListener("click", closeSuccessModal);

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const submitButton = contactForm.querySelector("button[type='submit']");
  const originalButtonText = submitButton?.textContent || "Enviar";

  formNote?.classList.remove("error");
  if (formNote) formNote.textContent = "Enviando sua mensagem...";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: data.get("nome") || "",
        contato: data.get("contato") || "",
        projeto: data.get("projeto") || "",
      }),
    });

    if (!response.ok) {
      throw new Error("Falha no envio");
    }

    contactForm.reset();
    if (formNote) formNote.textContent = "Mensagem enviada com sucesso.";
    openSuccessModal();
  } catch {
    if (formNote) {
      formNote.textContent = "Não foi possível enviar agora. Tente novamente ou fale por gabriel@synaliz.com.";
      formNote.classList.add("error");
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
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
