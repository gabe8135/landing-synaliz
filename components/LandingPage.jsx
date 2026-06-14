"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    key: "institucional",
    number: "01",
    title: "Sites institucionais",
    summary: "Sua empresa apresentada com clareza e confiança.",
    kicker: "Site institucional",
    modalTitle: "Para sua marca ser entendida e levada a sério.",
    intro:
      "Quando alguém pesquisa sua empresa, precisa entender rápido o que você faz, por que confiar e como falar com você. O site institucional transforma essa primeira impressão em segurança.",
    bullets: [
      "Apresenta serviços, diferenciais e canais de contato sem confusão.",
      "Cria uma percepção mais profissional antes do primeiro orçamento.",
      "Indicado para empresas, profissionais e marcas que precisam ser encontradas.",
    ],
  },
  {
    key: "landing",
    number: "02",
    title: "Landing pages",
    summary: "Uma página direta para gerar ação.",
    kicker: "Landing page",
    modalTitle: "Para transformar interesse em contato.",
    intro:
      "Uma landing page não tenta falar de tudo. Ela apresenta uma oferta com foco, responde dúvidas importantes e conduz o visitante para uma decisão simples.",
    bullets: [
      "Boa para anúncios, campanhas, lançamentos e captação de contatos.",
      "Une copy, design e estrutura para reduzir distrações.",
      "Ideal quando você quer divulgar uma oferta com mais intenção.",
    ],
  },
  {
    key: "catalogo",
    number: "03",
    title: "Catálogos digitais",
    summary: "Produtos e serviços organizados para vender melhor.",
    kicker: "Catálogo digital",
    modalTitle: "Para apresentar suas opções de forma mais profissional.",
    intro:
      "Quando produtos, pacotes ou serviços ficam espalhados em mensagens, imagens e PDFs, o cliente se perde. O catálogo digital organiza a decisão em uma experiência mais clara.",
    bullets: [
      "Organiza produtos, linhas, serviços, pacotes ou coleções.",
      "Reduz perguntas repetidas e melhora o atendimento.",
      "Indicado para lojas, representantes, indústrias e negócios com várias opções.",
    ],
  },
  {
    key: "corporativo",
    number: "04",
    title: "Sites corporativos",
    summary: "Estrutura profissional para marcas em crescimento.",
    kicker: "Site corporativo",
    modalTitle: "Para empresas que precisam transmitir estrutura.",
    intro:
      "Quando a empresa cresce, uma página simples já não sustenta toda a comunicação. O site corporativo organiza áreas, serviços, conteúdos e públicos com mais autoridade.",
    bullets: [
      "Pode incluir páginas de serviços, equipe, cases, blog e áreas específicas.",
      "Ajuda a marca a parecer mais preparada, sólida e confiável.",
      "É preparado para crescer junto com a marca.",
    ],
  },
];

const processSteps = [
  ["01", "Mapeamos", "Entendemos sua marca, sua necessidade e o melhor formato de site."],
  ["02", "Construímos", "Criamos layout, mensagem e código com direção própria."],
  ["03", "Entregamos", "Publicamos o site com performance, métricas e caminho claro."],
];

const whatsappHref =
  "https://wa.me/5513996481133?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Synaliz%20e%20quero%20conversar%20sobre%20um%20site.";

function WhatsAppIcon() {
  return (
    <img className="whatsapp-icon" src="/assets/whatsapp.svg" alt="" aria-hidden="true" />
  );
}

function Brand({ className = "brand", label = "Voltar para o início" }) {
  return (
    <a className={className} href="#inicio" aria-label={label}>
      <img className="brand-complete" src="/assets/synaliz-logo-oficial.svg" alt="" aria-hidden="true" />
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
      ctx.fillStyle = "rgba(159, 179, 192, 0.82)";
      ctx.strokeStyle = "rgba(90, 141, 160, 0.24)";
      ctx.lineWidth = 1.25;

      nodes.forEach((node, index) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.15, 0, Math.PI * 2);
        ctx.fill();

        for (let i = index + 1; i < nodes.length; i += 1) {
          const other = nodes[i];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 165) {
            ctx.globalAlpha = 1 - distance / 165;
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
  const heroFrameRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [formState, setFormState] = useState({
    sending: false,
    message: "Depois do envio, eu te retorno pelo contato informado com uma sugestão de caminho.",
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
      item.classList.remove("reveal-from-left", "reveal-from-right", "reveal-from-bottom");
      item.classList.add(
        index % 3 === 0
          ? "reveal-from-bottom"
          : index % 3 === 1
            ? "reveal-from-right"
            : "reveal-from-left"
      );
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
          necessidade: data.get("necessidade") || "",
        }),
      });

      if (!response.ok) throw new Error("Falha no envio");

      form.reset();
      setFormState({ sending: false, message: "Mensagem enviada com sucesso.", error: false });
      setSuccessOpen(true);
    } catch {
      setFormState({
        sending: false,
        message: "Envio pausado. Me chama no WhatsApp e conversamos por lá.",
        error: true,
      });
    }
  }

  function handleHeroTilt(event) {
    if (window.matchMedia("(max-width: 760px)").matches) return;

    const frame = heroFrameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const targetTiltY = (x - 0.5) * 18;
    const targetTiltX = (0.5 - y) * 14;
    const currentTiltX = parseFloat(frame.dataset.tiltX || "6");
    const currentTiltY = parseFloat(frame.dataset.tiltY || "-13");
    const ease = frame.classList.contains("is-tilting") ? 1 : 0.35;
    const tiltX = currentTiltX + (targetTiltX - currentTiltX) * ease;
    const tiltY = currentTiltY + (targetTiltY - currentTiltY) * ease;

    frame.classList.add("is-tilting");
    frame.dataset.tiltX = tiltX.toFixed(2);
    frame.dataset.tiltY = tiltY.toFixed(2);
    frame.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    frame.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    frame.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
    frame.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
  }

  function resetHeroTilt() {
    const frame = heroFrameRef.current;
    if (!frame) return;

    frame.classList.remove("is-tilting");
    frame.style.setProperty("--tilt-x", "6deg");
    frame.style.setProperty("--tilt-y", "-13deg");
    frame.style.setProperty("--tilt-z", "-1deg");
    frame.style.setProperty("--glow-x", "52%");
    frame.style.setProperty("--glow-y", "18%");
    frame.dataset.tiltX = "6";
    frame.dataset.tiltY = "-13";
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
            <h1>Seu site precisa estar à altura da sua marca.</h1>
            <p className="hero-text">
              Sua marca tem valor. Seu site precisa comunicar isso antes do primeiro contato.
              Criamos experiências digitais com identidade, clareza e estrutura para gerar confiança
              desde o primeiro acesso.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#contato">
                Quero um site profissional
              </a>
              <a className="btn secondary" href="#servicos">Ver opções de site</a>
            </div>
            <div className="hero-stats" aria-label="Resumo dos diferenciais">
              <span><strong>Clareza</strong><small>para explicar sua oferta</small></span>
              <span><strong>Confiança</strong><small>para parecer profissional</small></span>
              <span><strong>Contato</strong><small>para gerar oportunidades</small></span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Prévia visual de um site profissional">
            <div className="scan-line" />
            <div className="mobile-signature" aria-hidden="true">
              <span>Projeto sob medida</span>
              <strong>Não é template. É a sua marca com direção.</strong>
            </div>
            <div
              ref={heroFrameRef}
              className="browser-frame"
              onPointerMove={handleHeroTilt}
              onPointerLeave={resetHeroTilt}
            >
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
                  <h2>Clareza para explicar. Confiança para converter.</h2>
                </div>
                <div className="metric-card">
                  <small>Primeira impressão</small>
                  <strong>3s</strong>
                  <span>para entender seu valor</span>
                </div>
                <div className="metric-card accent">
                  <small>Identidade</small>
                  <strong>1</strong>
                  <span>site com intenção própria</span>
                </div>
                <div className="code-card">
                  <span>Mensagem clara</span>
                  <span>Visual com identidade</span>
                  <span>SEO inicial</span>
                  <span>Contato sem atrito</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell services" id="servicos">
          <div className="section-heading">
            <p className="eyebrow">O diferencial</p>
            <h2>Personalização, velocidade e tecnologia premium.</h2>
            <p>A Synaliz une design próprio, performance alta e ferramentas modernas para transformar sua marca em uma presença digital mais clara, confiável e memorável.</p>
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
            <p className="eyebrow">Como funciona</p>
            <h2 className="balanced-title">
              <span>Da necessidade ao site pronto,</span>
              <span>com direção em cada etapa.</span>
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
              <h2>Vamos desenhar o site certo para sua marca?</h2>
              <p>Conte o que você precisa apresentar. A Synaliz transforma sua necessidade em um projeto claro.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Como posso te chamar?
                <input type="text" name="nome" placeholder="Seu nome ou nome da empresa" required />
              </label>
              <label>
                Onde eu posso te responder?
                <input type="text" name="contato" placeholder="WhatsApp ou email" required />
              </label>
              <label>
                O que você precisa?
                <textarea
                  name="necessidade"
                  rows={4}
                  placeholder="Ex: quero apresentar minha empresa, organizar produtos ou receber mais contatos."
                  required
                />
              </label>
              <button className="btn primary" type="submit" disabled={formState.sending}>
                {formState.sending ? "Enviando..." : "Receber uma sugestão de site"}
              </button>
              <p className={`form-note ${formState.error ? "error" : ""}`} aria-live="polite">
                {formState.message}
              </p>
              <a className="whatsapp-inline" href={whatsappHref} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                Prefiro chamar no WhatsApp
              </a>
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
            <h2 id="success-title">Mensagem recebida.</h2>
            <p>
              Sua mensagem chegou. Vamos analisar sua necessidade e responder com o caminho mais indicado.
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
            <p>Sites profissionais para empresas que precisam apresentar valor, transmitir confiança e facilitar o contato.</p>
            <p className="footer-mini">Design próprio, performance alta e desenvolvimento com direção técnica.</p>
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
            <span>Institucionais profissionais</span>
            <span>Landing pages estratégicas</span>
            <span>Catálogos digitais</span>
            <span>Sites corporativos</span>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contato</h3>
            <a href="mailto:gabriel@synaliz.com">gabriel@synaliz.com</a>
            <a href="https://www.synaliz.com" target="_blank" rel="noreferrer">www.synaliz.com</a>
            <a className="footer-cta" href="#contato">Conversar sobre meu site</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Synaliz. Todos os direitos reservados.</span>
          <span>Sua marca com presença própria, rápida e profissional.</span>
        </div>
      </footer>

      <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chamar a Synaliz no WhatsApp">
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
