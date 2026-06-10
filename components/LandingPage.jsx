"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    key: "institucional",
    number: "01",
    title: "Sites institucionais",
    summary: "Sua empresa clara, séria e fácil de chamar.",
    kicker: "Site institucional",
    modalTitle: "Para sua empresa parar de parecer improvisada.",
    intro:
      "Quando alguém pesquisa sua marca, precisa entender rápido o que você faz e sentir segurança para chamar. O institucional organiza essa primeira impressão.",
    bullets: [
      "Mostra serviços, diferenciais e formas de contato sem confusão.",
      "Ajuda o cliente a confiar antes de pedir orçamento.",
      "Indicado para empresas, profissionais e negócios locais.",
    ],
  },
  {
    key: "landing",
    number: "02",
    title: "Landing pages",
    summary: "Uma oferta clara, sem distração.",
    kicker: "Landing page",
    modalTitle: "Para transformar atenção em ação.",
    intro:
      "A landing page evita que o visitante se perca. Ela apresenta uma oferta, quebra objeções e conduz para o próximo passo.",
    bullets: [
      "Ideal para tráfego pago, anúncios e campanhas pontuais.",
      "Texto, design e botões pensados para conversão.",
      "Boa para campanhas, lançamentos e captação de contatos.",
    ],
  },
  {
    key: "catalogo",
    number: "03",
    title: "Catálogos digitais",
    summary: "Produtos organizados para vender melhor.",
    kicker: "Catálogo digital",
    modalTitle: "Para o cliente entender antes de perguntar preço.",
    intro:
      "Quando produtos ficam soltos em mensagens, imagens ou PDF, a decisão demora. O catálogo organiza tudo para o cliente comparar e avançar.",
    bullets: [
      "Organiza produtos, linhas, serviços ou pacotes.",
      "Reduz perguntas repetidas e melhora o atendimento.",
      "Indicado para lojas, representantes, indústrias e serviços com várias opções.",
    ],
  },
  {
    key: "corporativo",
    number: "04",
    title: "Sites corporativos",
    summary: "Estrutura para crescer sem parecer pequeno.",
    kicker: "Site corporativo",
    modalTitle: "Para marcas que precisam sustentar autoridade.",
    intro:
      "Quando sua empresa cresce, uma página simples pode não explicar tudo. O site corporativo cria estrutura para serviços, áreas, conteúdos e públicos diferentes.",
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
    message: "Respondo pelo contato informado com o melhor caminho para o projeto.",
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
        message: "Não foi possível enviar agora. Tente novamente ou fale por gabriel@synaliz.com.",
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
            <p className="eyebrow">Synaliz | Sites sob medida</p>
            <h1>Sua marca não cabe em um site genérico.</h1>
            <p className="hero-text">
              Templates podem até colocar sua empresa online. Mas só um site feito para sua marca
              explica seu valor, transmite confiança e transforma visitas em contatos.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#contato">Quero um site profissional</a>
              <a className="btn secondary" href="#servicos">Ver tipos de site</a>
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
            <p className="eyebrow">Problema resolvido</p>
            <h2>Seu site precisa explicar, convencer e facilitar o contato.</h2>
            <p>A Synaliz cria o formato certo para sua marca parar de parecer genérica.</p>
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
              <span>Sua ideia sai do improviso</span>
              <span>e vira um site pronto.</span>
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
              <p>Conte sua necessidade. A Synaliz transforma em um caminho claro.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Nome
                <input type="text" name="nome" placeholder="Seu nome" required />
              </label>
              <label>
                Seu WhatsApp ou Email
                <input type="text" name="contato" placeholder="Como posso falar com você?" required />
              </label>
              <label>
                Necessidade
                <textarea
                  name="necessidade"
                  rows={4}
                  placeholder="Ex: preciso apresentar minha empresa, divulgar serviços, organizar produtos ou captar contatos."
                  required
                />
              </label>
              <button className="btn primary" type="submit" disabled={formState.sending}>
                {formState.sending ? "Enviando..." : "Receber análise"}
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
              Sua mensagem chegou. Vou analisar sua necessidade e responder com o caminho mais indicado.
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
            <p>Sites sob medida para marcas que não querem parecer genéricas.</p>
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
          <span>Sites com clareza, identidade e intenção comercial.</span>
        </div>
      </footer>

      <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chamar a Synaliz no WhatsApp">
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
