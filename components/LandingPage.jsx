"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    key: "institucional",
    number: "01",
    title: "Sites institucionais",
    summary: "Mostre quem você é e passe confiança.",
    kicker: "Site institucional",
    modalTitle: "Para sua empresa ser entendida e levada a sério.",
    intro:
      "É o site ideal para apresentar quem você é, o que oferece e como o cliente pode falar com você. Funciona como a base oficial da sua marca na internet.",
    bullets: [
      "Mostra serviços, diferenciais, localização e formas de contato.",
      "Ajuda o cliente a confiar antes de chamar no WhatsApp.",
      "Indicado para empresas, profissionais e negócios locais.",
    ],
  },
  {
    key: "landing",
    number: "02",
    title: "Landing pages",
    summary: "Uma página direta para campanhas e ofertas.",
    kicker: "Landing page",
    modalTitle: "Uma página focada em uma ação.",
    intro:
      "A landing page é feita para campanhas, lançamentos ou ofertas específicas. Ela tira distrações e conduz a pessoa para pedir orçamento, se cadastrar ou entrar em contato.",
    bullets: [
      "Ideal para tráfego pago, anúncios e campanhas pontuais.",
      "Texto, design e botões pensados para conversão.",
      "Boa quando você quer vender uma ideia rapidamente.",
    ],
  },
  {
    key: "catalogo",
    number: "03",
    title: "Catálogos digitais",
    summary: "Produtos organizados para facilitar a decisão.",
    kicker: "Catálogo digital",
    modalTitle: "Produtos organizados para facilitar a escolha.",
    intro:
      "O catálogo digital apresenta produtos, categorias e informações comerciais de forma clara. Ele ajuda o cliente a entender opções antes de pedir preço ou orçamento.",
    bullets: [
      "Organiza produtos, linhas, serviços ou pacotes.",
      "Reduz perguntas repetidas no atendimento.",
      "Indicado para lojas, representantes, indústrias e serviços com várias opções.",
    ],
  },
  {
    key: "corporativo",
    number: "04",
    title: "Sites corporativos",
    summary: "Mais estrutura para marcas em crescimento.",
    kicker: "Site corporativo",
    modalTitle: "Mais estrutura para uma marca em crescimento.",
    intro:
      "O site corporativo é indicado quando sua empresa precisa de mais páginas, mais conteúdo e uma apresentação mais completa para públicos diferentes.",
    bullets: [
      "Pode incluir páginas de serviços, equipe, cases, blog e áreas específicas.",
      "Passa mais autoridade para empresas em expansão.",
      "É preparado para crescer junto com a marca.",
    ],
  },
];

const processSteps = [
  ["01", "Entendemos", "Objetivo, público e oferta."],
  ["02", "Criamos", "Design, copy e código."],
  ["03", "Publicamos", "Site no ar e métricas prontas."],
];

function Brand({ className = "brand", label = "Voltar para o início" }) {
  return (
    <a className={className} href="#inicio" aria-label={label}>
      <img className="brand-symbol" src="/assets/synaliz-simbolo.svg" alt="" aria-hidden="true" />
      <span className="brand-wordmark" aria-hidden="true">Synaliz</span>
    </a>
  );
}

function SignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let nodes = [];
    let frameId = 0;

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

      frameId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} id="signal-field" aria-hidden="true" />;
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [formState, setFormState] = useState({
    sending: false,
    message: "Você recebe um retorno no contato informado.",
    error: false,
  });

  const anyModalOpen = Boolean(selectedService) || successOpen;

  useEffect(() => {
    document.body.classList.toggle("modal-open", anyModalOpen);
    return () => document.body.classList.remove("modal-open");
  }, [anyModalOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setSelectedService(null);
      setSuccessOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const animatedItems = document.querySelectorAll(
      ".section-heading, .service-grid article, .timeline article, .contact-card"
    );

    if (!("IntersectionObserver" in window)) {
      animatedItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

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
    return () => revealObserver.disconnect();
  }, []);

  async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setFormState({ sending: true, message: "Enviando sua mensagem...", error: false });

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

      if (!response.ok) throw new Error("Falha no envio");

      form.reset();
      setFormState({ sending: false, message: "Mensagem enviada com sucesso.", error: false });
      setSuccessOpen(true);
    } catch {
      setFormState({
        sending: false,
        message: "Não foi possível enviar agora. Tente novamente ou fale por gabriel@synaliz.com.",
        error: true,
      });
    }
  }

  return (
    <>
      <SignalField />

      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#processo">Processo</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-cta" href="#contato">Solicitar proposta</a>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Navegação mobile">
        {["servicos", "processo", "contato"].map((item) => (
          <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
            {item === "servicos" ? "Serviços" : item === "processo" ? "Processo" : "Contato"}
          </a>
        ))}
      </nav>

      <main>
        <section className="hero section-shell" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">Synaliz | Sites profissionais</p>
            <h1>Seu negócio é único. Seu site também precisa ser.</h1>
            <p className="hero-text">
              Criamos sites sob medida para sua marca ser entendida, transmitir confiança e gerar
              contatos sem depender de template pronto.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#contato">Quero um site profissional</a>
              <a className="btn secondary" href="#servicos">Ver tipos de site</a>
            </div>
            <div className="hero-stats" aria-label="Resumo dos diferenciais">
              <span><strong>Institucional</strong><small>marca e serviços</small></span>
              <span><strong>Catálogo</strong><small>produtos organizados</small></span>
              <span><strong>Landing page</strong><small>campanhas diretas</small></span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Prévia visual de um site profissional">
            <div className="scan-line" />
            <div className="mobile-signature" aria-hidden="true">
              <span>Projeto sob medida</span>
              <strong>Não é template. É presença com identidade.</strong>
            </div>
            <div className="browser-frame">
              <div className="browser-top">
                <span />
                <span />
                <span />
                <small>projeto-sob-medida.site</small>
              </div>
              <div className="mockup-grid">
                <div className="mock-hero">
                  <span className="pulse-dot" />
                  <p>Feito para sua marca</p>
                  <h2>Visual próprio. Mensagem clara. Site memorável.</h2>
                </div>
                <div className="metric-card">
                  <small>Primeira impressão</small>
                  <strong>3s</strong>
                  <span>para entender sua oferta</span>
                </div>
                <div className="metric-card accent">
                  <small>Identidade</small>
                  <strong>1</strong>
                  <span>site com a cara da marca</span>
                </div>
                <div className="code-card">
                  <span>Identidade visual</span>
                  <span>Copy objetiva</span>
                  <span>SEO inicial</span>
                  <span>Contato sem atrito</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell services" id="servicos">
          <div className="section-heading">
            <p className="eyebrow">O que a Synaliz cria</p>
            <h2>Sites para apresentar, vender ou organizar sua marca.</h2>
            <p>Escolha o formato. A Synaliz transforma em uma experiência clara e profissional.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article
                key={service.key}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedService(service)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedService(service);
                  }
                }}
              >
                <span className="icon">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell process" id="processo">
          <div className="section-heading compact">
            <p className="eyebrow">Processo simples</p>
            <h2 className="balanced-title">
              <span>Do briefing ao site no ar,</span>
              <span>sem enrolação.</span>
            </h2>
          </div>
          <div className="timeline">
            {processSteps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell contact" id="contato">
          <div className="contact-card">
            <div>
              <p className="eyebrow">Próximo passo</p>
              <h2>Quer um site com a cara da sua marca?</h2>
              <p>Conte sua ideia. A Synaliz indica o caminho.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Nome
                <input type="text" name="nome" placeholder="Seu nome" required />
              </label>
              <label>
                WhatsApp ou e-mail
                <input type="text" name="contato" placeholder="Como posso falar com você?" required />
              </label>
              <label>
                Projeto
                <textarea
                  name="projeto"
                  rows={4}
                  placeholder="Preciso de um site institucional, catálogo, landing page..."
                  required
                />
              </label>
              <button className="btn primary" type="submit" disabled={formState.sending}>
                {formState.sending ? "Enviando..." : "Pedir análise do projeto"}
              </button>
              <p className={`form-note ${formState.error ? "error" : ""}`} aria-live="polite">
                {formState.message}
              </p>
            </form>
          </div>
        </section>
      </main>

      {selectedService && (
        <div className="service-modal open" aria-hidden="false" onClick={() => setSelectedService(null)}>
          <div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-kicker">{selectedService.kicker}</div>
            <h2 id="modal-title">{selectedService.modalTitle}</h2>
            <p>{selectedService.intro}</p>
            <div className="modal-content">
              {selectedService.bullets.map((bullet) => (
                <span key={bullet}>{bullet}</span>
              ))}
            </div>
            <a className="btn primary modal-cta" href="#contato" onClick={() => setSelectedService(null)}>
              Quero conversar sobre isso
            </a>
          </div>
        </div>
      )}

      {successOpen && (
        <div className="service-modal success-modal open" aria-hidden="false" onClick={() => setSuccessOpen(false)}>
          <div
            className="modal-panel success-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-kicker">Mensagem enviada</div>
            <h2 id="success-title">Recebemos seu briefing.</h2>
            <p>
              Obrigado pelo contato. A Synaliz vai analisar sua ideia e responder pelo WhatsApp ou e-mail informado.
            </p>
            <button className="btn primary modal-cta success-close" type="button" onClick={() => setSuccessOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand className="footer-logo" />
            <p>Sites sob medida para marcas que valorizam o que apresentam.</p>
            <p className="footer-mini">Estúdio de desenvolvimento web para empresas, marcas e profissionais.</p>
            <span className="footer-signature">Direção técnica: Gabriel Ramos</span>
          </div>

          <div className="footer-column">
            <h3>Navegação</h3>
            <a href="#inicio">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#processo">Processo</a>
            <a href="#contato">Contato</a>
          </div>

          <div className="footer-column">
            <h3>Serviços</h3>
            <span>Sites institucionais</span>
            <span>Landing pages</span>
            <span>Catálogos digitais</span>
            <span>Sites corporativos</span>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contato</h3>
            <a href="mailto:gabriel@synaliz.com">gabriel@synaliz.com</a>
            <a href="https://www.synaliz.com" target="_blank" rel="noreferrer">www.synaliz.com</a>
            <a className="footer-cta" href="#contato">Solicitar proposta</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Synaliz. Todos os direitos reservados.</span>
          <span>Institucionais, landing pages, catálogos e sites corporativos.</span>
        </div>
      </footer>
    </>
  );
}
