"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    key: "institucional",
    number: "01",
    title: "Sites institucionais",
    summary: "Presença profissional para explicar sua empresa e gerar confiança.",
    benefit: "Autoridade",
    cta: "Quero um site institucional",
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
    summary: "Páginas focadas em campanhas, anúncios e captação de leads.",
    benefit: "Conversão",
    cta: "Quero uma página que converte",
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
    summary: "Produtos e serviços organizados para facilitar a decisão.",
    benefit: "Clareza",
    cta: "Quero organizar meu catálogo",
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
    summary: "Estrutura para marcas que precisam crescer com mais presença.",
    benefit: "Crescimento",
    cta: "Quero estrutura profissional",
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
  {
    key: "local",
    number: "05",
    title: "Sites para empresas locais",
    summary: "Presença clara para negócios que querem ser encontrados e chamados.",
    benefit: "Busca local",
    cta: "Quero aparecer melhor",
    kicker: "Empresa local",
    modalTitle: "Para transformar pesquisa em contato.",
    intro:
      "Seu cliente pode procurar no Google, no Instagram ou receber uma indicação. O site ajuda a centralizar informações, transmitir confiança e facilitar o contato.",
    bullets: [
      "Organiza serviços, localização, diferenciais e canais de atendimento.",
      "Ajuda sua empresa a parecer mais preparada antes da primeira conversa.",
      "Indicado para prestadores de serviço, lojas, clínicas e negócios regionais.",
    ],
  },
  {
    key: "evolucao",
    number: "06",
    title: "Manutenção e evolução web",
    summary: "Ajustes, melhorias e novas páginas para o site continuar evoluindo.",
    benefit: "Continuidade",
    cta: "Quero evoluir meu site",
    kicker: "Evolução web",
    modalTitle: "Para seu site continuar acompanhando sua marca.",
    intro:
      "Depois que o site está no ar, novas ofertas, campanhas e melhorias aparecem. A evolução web mantém sua presença digital viva, atualizada e tecnicamente saudável.",
    bullets: [
      "Atualizações de conteúdo, páginas, integrações e ajustes visuais.",
      "Melhorias contínuas de performance, SEO e experiência do usuário.",
      "Indicado para empresas que não querem deixar o site parado.",
    ],
  },
];

const processSteps = [
  ["01", "Diagnóstico", "Marca, oferta, público e objetivos."],
  ["02", "Estratégia", "Estrutura, mensagem, SEO e conversão."],
  ["03", "Design", "Interface clara, premium e responsiva."],
  ["04", "Desenvolvimento", "Performance, acessibilidade e boas práticas."],
  ["05", "Lançamento", "Publicação, rastreamento e revisão final."],
  ["06", "Evolução", "Melhorias, manutenção e novas oportunidades."],
];

const testimonials = [
  {
    name: "Leandro",
    role: "Empresário, Geomind Soluções Ambientais",
    quote:
      "Os diretores avaliaram e gostaram muito da estrutura do site. Atendimento profissional e resultado acima das expectativas.",
    signal: "Profissionalismo",
  },
  {
    name: "Rose",
    role: "Empresária, rede de lanchonete e sorveteria",
    quote:
      "Atendimento rápido, trabalho impecável e entrega antes do prazo. Ainda tive suporte depois para tirar minhas dúvidas.",
    signal: "Suporte e prazo",
  },
  {
    name: "Flavio",
    role: "Empresário, setor de hotelaria",
    quote:
      "Você traduziu muito bem a essência do nosso espaço na identidade e no desenvolvimento do site.",
    signal: "Identidade de marca",
  },
];

const trustItems = [
  "Estúdio web",
  "Sites sob medida",
  "Alta performance",
  "Busca no Google",
  "Layout responsivo",
  "Estratégia de conversão",
  "Suporte humano",
];

const studioPillars = [
  ["Estratégia", "mensagem clara, presença no Google e jornada para contato"],
  ["Design", "interface com identidade, hierarquia e acabamento premium"],
  ["Código", "desenvolvimento moderno, rápido e preparado para crescer"],
];

const problems = [
  ["Visual genérico", "A marca parece menos profissional do que deveria."],
  ["Mensagem confusa", "O visitante não entende valor, serviço ou próximo passo."],
  ["Pouca confiança", "A primeira impressão não sustenta uma conversa comercial."],
  ["Base técnica fraca", "Site lento, sem SEO e difícil de evoluir com segurança."],
];

const solutions = [
  ["Clareza", "para explicar sua oferta"],
  ["Design", "para valorizar sua marca"],
  ["Performance", "para melhorar a experiência"],
  ["Busca", "para sua empresa ser encontrada"],
  ["Conversão", "para gerar contatos qualificados"],
];

const differentials = [
  ["Estratégia antes do layout", "Primeiro entendemos marca, oferta e objetivo. Depois desenhamos a experiência."],
  ["Código limpo e performance", "Estrutura rápida, responsiva e preparada para SEO, métricas e evolução."],
  ["Percepção de valor", "Cada tela é pensada para sua empresa parecer tão profissional quanto ela é."],
];

const comparisonRows = [
  ["Visual genérico", "Design com identidade"],
  ["Sem estratégia", "Estrutura orientada por objetivos"],
  ["Sem base de busca", "Estrutura preparada para o Google"],
  ["Sem rastreamento", "Eventos e métricas preparados"],
  ["Apenas entrega", "Evolução e suporte"],
  ["Texto confuso", "Copy clara e objetiva"],
];

const performanceItems = [
  "Busca no Google",
  "Core Web Vitals",
  "Metadados",
  "Estrutura semântica",
  "Open Graph",
  "Analytics",
  "Eventos",
  "Rastreamento",
  "Evolução",
];

const faqs = [
  [
    "Quanto custa criar um site profissional?",
    "Depende do formato, quantidade de páginas, nível de design, integrações e estratégia. O primeiro passo é entender sua necessidade para indicar o caminho certo.",
  ],
  [
    "Um site pode ajudar minha empresa a conseguir mais clientes?",
    "Sim, quando comunica valor com clareza, carrega rápido, facilita o contato e está preparado para busca e conversão.",
  ],
  [
    "O site funciona bem no celular?",
    "Sim. A experiência é pensada para desktop, tablet e celular, com prioridade para leitura rápida e contato fácil.",
  ],
  [
    "Meu site vai ter a cara da minha marca?",
    "Sim. Mesmo quando usamos alguma base para acelerar, o visual, a mensagem e a estrutura são ajustados para o objetivo da sua marca.",
  ],
  [
    "O que preciso ter antes de começar?",
    "Basta saber o que você quer apresentar ou vender. Se ainda estiver confuso, a Synaliz ajuda a organizar o caminho.",
  ],
];

const whatsappHref =
  "https://wa.me/5513996481133?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Synaliz%20e%20quero%20conversar%20sobre%20um%20site.";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lpsynaliz.vercel.app/#organization",
      name: "Synaliz",
      url: "https://lpsynaliz.vercel.app/",
      logo: "https://lpsynaliz.vercel.app/assets/synaliz-logo-oficial.svg",
      email: "gabriel@synaliz.com",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://lpsynaliz.vercel.app/#professional-service",
      name: "Synaliz",
      url: "https://lpsynaliz.vercel.app/",
      areaServed: ["BR", "Worldwide"],
      serviceType: ["Criação de sites", "Landing pages", "UX/UI design", "Desenvolvimento web"],
    },
    {
      "@type": "WebSite",
      "@id": "https://lpsynaliz.vercel.app/#website",
      name: "Synaliz",
      url: "https://lpsynaliz.vercel.app/",
      publisher: { "@id": "https://lpsynaliz.vercel.app/#organization" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://lpsynaliz.vercel.app/#faq",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: name, ...params });
  window.gtag?.("event", name, params);
}

function WhatsAppIcon() {
  return (
    <img className="whatsapp-icon" src="/assets/whatsapp.svg" alt="" aria-hidden="true" />
  );
}

function Brand({ className = "brand", label = "Voltar para o início", onClick }) {
  return (
    <a className={className} href="#inicio" aria-label={label} onClick={onClick}>
      <img className="brand-complete" src="/assets/synaliz-logo-oficial.svg" alt="" aria-hidden="true" />
    </a>
  );
}

function scrollToSection(event, sectionId) {
  event?.preventDefault();

  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${sectionId}`);
}

function SignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const activeSection = { current: "inicio" };
    const sectionTone = {
      inicio: {
        dot: "rgba(167, 176, 184, 0.82)",
        line: "rgba(0, 158, 173, 0.24)",
        radius: 165,
      },
      sobre: {
        dot: "rgba(167, 176, 184, 0.68)",
        line: "rgba(0, 221, 235, 0.18)",
        radius: 150,
      },
      problema: {
        dot: "rgba(216, 166, 66, 0.66)",
        line: "rgba(216, 166, 66, 0.12)",
        radius: 132,
      },
      solucao: {
        dot: "rgba(0, 221, 235, 0.92)",
        line: "rgba(0, 221, 235, 0.24)",
        radius: 174,
      },
      servicos: {
        dot: "rgba(247, 249, 250, 0.72)",
        line: "rgba(0, 221, 235, 0.18)",
        radius: 158,
      },
      diferenciais: {
        dot: "rgba(167, 176, 184, 0.72)",
        line: "rgba(0, 158, 173, 0.2)",
        radius: 168,
      },
      metodo: {
        dot: "rgba(0, 221, 235, 0.8)",
        line: "rgba(0, 221, 235, 0.16)",
        radius: 142,
      },
      comparacao: {
        dot: "rgba(216, 166, 66, 0.68)",
        line: "rgba(216, 166, 66, 0.12)",
        radius: 140,
      },
      performance: {
        dot: "rgba(0, 221, 235, 0.82)",
        line: "rgba(0, 158, 173, 0.22)",
        radius: 178,
      },
      internacional: {
        dot: "rgba(247, 249, 250, 0.66)",
        line: "rgba(0, 221, 235, 0.13)",
        radius: 128,
      },
      faq: {
        dot: "rgba(167, 176, 184, 0.62)",
        line: "rgba(167, 176, 184, 0.12)",
        radius: 122,
      },
      contato: {
        dot: "rgba(216, 166, 66, 0.78)",
        line: "rgba(216, 166, 66, 0.14)",
        radius: 150,
      },
    };
    let width = 0;
    let height = 0;
    let nodes = [];
    let frameId = 0;
    let lastFrameAt = 0;
    let sectionObserver;
    const isTouchViewport =
      window.matchMedia("(hover: none), (pointer: coarse)").matches || window.innerWidth <= 760;

    function resizeCanvas() {
      const ratio = isTouchViewport ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = isTouchViewport ? Math.max(18, Math.floor(width / 52)) : Math.max(34, Math.floor(width / 32));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
      }));
    }

    function draw(timestamp = 0) {
      const minFrameGap = isTouchViewport ? 66 : 0;
      if (timestamp - lastFrameAt < minFrameGap) {
        frameId = requestAnimationFrame(draw);
        return;
      }
      lastFrameAt = timestamp;

      ctx.clearRect(0, 0, width, height);
      const tone = sectionTone[activeSection.current] || sectionTone.inicio;
      ctx.fillStyle = tone.dot;
      ctx.strokeStyle = tone.line;
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

          if (distance < tone.radius) {
            ctx.globalAlpha = 1 - distance / tone.radius;
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

    if ("IntersectionObserver" in window) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (!visible?.target?.id) return;
          activeSection.current = visible.target.id;
          document.body.dataset.activeSection = visible.target.id;
        },
        { threshold: [0.26, 0.42, 0.58], rootMargin: "-18% 0px -32% 0px" }
      );

      document.querySelectorAll("main > section[id]").forEach((section) => {
        sectionObserver.observe(section);
      });
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
      sectionObserver?.disconnect();
      delete document.body.dataset.activeSection;
    };
  }, []);

  return <canvas ref={canvasRef} id="signal-field" aria-hidden="true" />;
}

export default function LandingPage() {
  const heroFrameRef = useRef(null);
  const headerRef = useRef(null);
  const mobileNavRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [internationalLang, setInternationalLang] = useState("pt");
  const [formState, setFormState] = useState({
    sending: false,
    message: "Você envia o essencial. Eu respondo com o próximo passo.",
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
    if (!menuOpen) return undefined;

    const closeMenuOnOutsideClick = (event) => {
      const target = event.target;
      const clickedHeader = headerRef.current?.contains(target);
      const clickedMenu = mobileNavRef.current?.contains(target);

      if (!clickedHeader && !clickedMenu) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeMenuOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeMenuOnOutsideClick);
  }, [menuOpen]);

  useEffect(() => {
    const animatedItems = document.querySelectorAll(
      ".section-heading, .service-grid article, .method-grid article, .proof-board, .contact-card"
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
    trackEvent("submit_form", { form_name: "diagnostico" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome") || "",
          whatsapp: data.get("whatsapp") || "",
          tipoProjeto: data.get("tipoProjeto") || "",
          orcamento: data.get("orcamento") || "",
          mensagem: data.get("mensagem") || "",
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

  function handleNavClick(event, sectionId) {
    setMenuOpen(false);
    scrollToSection(event, sectionId);
  }

  return (
    <>
      <SignalField />

      <header className="site-header" ref={headerRef}>
        <Brand onClick={(event) => handleNavClick(event, "inicio")} />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#sobre" onClick={(event) => handleNavClick(event, "sobre")}>Sobre</a>
          <a href="#solucao" onClick={(event) => handleNavClick(event, "solucao")}>Soluções</a>
          <a href="#servicos" onClick={(event) => handleNavClick(event, "servicos")}>Serviços</a>
          <a href="#metodo" onClick={(event) => handleNavClick(event, "metodo")}>Método</a>
          <a href="#contato" onClick={(event) => handleNavClick(event, "contato")}>Contato</a>
        </nav>
        <a
          className="header-cta"
          href="#contato"
          onClick={(event) => {
            trackEvent("click_diagnostico", { location: "header" });
            handleNavClick(event, "contato");
          }}
        >
          Solicitar diagnóstico
        </a>
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

      <nav ref={mobileNavRef} className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Navegação mobile">
        {[
          ["sobre", "Sobre"],
          ["solucao", "Soluções"],
          ["servicos", "Serviços"],
          ["metodo", "Método"],
          ["contato", "Contato"],
        ].map(([item, label]) => (
          <a key={item} href={`#${item}`} onClick={(event) => handleNavClick(event, item)}>
            {label}
          </a>
        ))}
      </nav>

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="hero section-shell" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">Synaliz | estúdio de design e desenvolvimento web</p>
            <h1>Sua marca tem valor. Seu site precisa mostrar isso.</h1>
            <p className="hero-text">
              A Synaliz une design, desenvolvimento, presença no Google e estratégia para transformar sua marca
              em um site claro, rápido e memorável.
            </p>
            <div className="hero-actions">
              <a
                className="btn primary"
                href="#contato"
                onClick={(event) => {
                  trackEvent("click_diagnostico", { location: "hero" });
                  handleNavClick(event, "contato");
                }}
              >
                Solicitar diagnóstico
              </a>
              <a
                className="btn secondary"
                href="#sobre"
                onClick={(event) => {
                  trackEvent("view_services", { location: "hero" });
                  handleNavClick(event, "sobre");
                }}
              >
                Conhecer a Synaliz
              </a>
            </div>
            <div className="hero-stats" aria-label="Resumo dos diferenciais">
              <span><strong>UX/UI</strong><small>para leitura rápida</small></span>
              <span><strong>SEO</strong><small>base técnica preparada</small></span>
              <span><strong>CRO</strong><small>jornada orientada a contato</small></span>
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
                  <p>Mapa Synaliz</p>
                  <h2>Clareza para explicar. Confiança para converter.</h2>
                </div>
                <div className="metric-card">
                  <small>Conexão</small>
                  <strong>4</strong>
                  <span>pontos alinhados</span>
                </div>
                <div className="metric-card accent">
                  <small>Direção</small>
                  <strong>1</strong>
                  <span>presença com intenção</span>
                </div>
                <div className="code-card">
                  <span>Marca</span>
                  <span>Mensagem</span>
                  <span>Performance</span>
                  <span>Contato</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip section-shell" aria-label="Diferenciais rápidos">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </section>

        <section className="section-shell about" id="sobre">
          <div className="section-heading">
            <p className="eyebrow">Sobre a Synaliz</p>
            <h2>Um estúdio web para empresas que querem transmitir o valor que têm.</h2>
            <p>Unimos criatividade, estratégia, design e desenvolvimento para criar presença digital com identidade, clareza e base técnica profissional.</p>
          </div>
          <div className="about-panel">
            <div className="about-copy">
              <span>O que fazemos</span>
              <h3>Transformamos empresas, serviços e ofertas em experiências digitais claras.</h3>
              <p>
                Cada projeto nasce sob medida: entendemos a marca, organizamos a mensagem, desenhamos a experiência e desenvolvemos uma estrutura rápida, responsiva e preparada para evolução.
              </p>
            </div>
            <div className="about-pills" aria-label="Pilares da Synaliz">
              {studioPillars.map(([title, text]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell problem" id="problema">
          <div className="section-heading">
            <p className="eyebrow">O problema</p>
            <h2>Presença digital genérica diminui a percepção de valor do seu negócio.</h2>
            <p>Se sua marca é boa, o site precisa deixar isso claro na primeira impressão.</p>
          </div>
          <p className="list-context">Na prática, esses sinais atrapalham a confiança antes mesmo do cliente falar com você.</p>
          <div className="insight-grid">
            {problems.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="problem-closing">Quando esses sinais se acumulam, uma empresa boa pode parecer comum.</p>
        </section>

        <section className="section-shell solution" id="solucao">
          <div className="section-heading">
            <p className="eyebrow">A solução</p>
            <h2>Criamos uma presença digital com a cara e a força da sua empresa.</h2>
            <p>Garantimos o essencial para sua marca ser entendida, lembrada e procurada.</p>
          </div>
          <p className="list-context solution-context">O que sua presença digital precisa entregar:</p>
          <div className="solution-grid">
            {solutions.map(([title, text]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell services" id="servicos">
          <div className="section-heading">
            <p className="eyebrow">Serviços</p>
            <h2>O que a Synaliz desenvolve para sua empresa.</h2>
            <p>Sites, páginas e estruturas digitais para apresentar melhor sua marca, seus serviços e suas oportunidades.</p>
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
                <small>{service.benefit}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell differentials" id="diferenciais">
          <div className="section-heading compact">
            <p className="eyebrow">Diferenciais</p>
            <h2>Por que escolher a Synaliz?</h2>
          </div>
          <div className="feature-list">
            {differentials.map(([title, text]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell process" id="metodo">
          <div className="section-heading compact">
            <p className="eyebrow">Método Synaliz</p>
            <h2 className="balanced-title">
              <span>Da estratégia ao site no ar,</span>
              <span>com direção em cada etapa.</span>
            </h2>
          </div>
          <div className="method-stage">
            <div className="method-grid" role="list" aria-label="Etapas do Método Synaliz">
              {processSteps.map(([number, title, text]) => (
                <article className="method-panel" key={number} role="listitem" data-step={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell social-proof" id="prova-social">
          <div className="section-heading compact">
            <p className="eyebrow">Prova social</p>
            <h2>Confiança se constrói na entrega.</h2>
            <p>Clientes reais que sentiram clareza, profissionalismo e cuidado durante o projeto.</p>
          </div>
          <div className="proof-board">
            <article className="proof-feature">
              <span className="proof-label">{testimonials[0].signal}</span>
              <p>“{testimonials[0].quote}”</p>
              <footer>
                <strong>{testimonials[0].name}</strong>
                <small>{testimonials[0].role}</small>
              </footer>
            </article>
            <div className="proof-list" aria-label="Depoimentos de clientes">
              {testimonials.slice(1).map((testimonial) => (
                <article key={testimonial.name}>
                  <span>{testimonial.signal}</span>
                  <p>“{testimonial.quote}”</p>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/*
          Portfólio pausado por enquanto.
          Retomar quando tivermos cases que representem bem o padrão atual da Synaliz.
        */}

        <section className="section-shell comparison" id="comparacao">
          <div className="section-heading compact">
            <p className="eyebrow">Comparação</p>
            <h2>Mais do que um site bonito.</h2>
          </div>
          <div className="comparison-table" role="table" aria-label="Comparação entre site comum e Synaliz">
            <div role="row" className="comparison-head">
              <span role="columnheader">Site comum</span>
              <span role="columnheader">Synaliz</span>
            </div>
            {comparisonRows.map(([common, synaliz]) => (
              <div role="row" key={common}>
                <span role="cell">{common}</span>
                <strong role="cell">{synaliz}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell performance" id="performance">
          <div className="section-heading">
            <p className="eyebrow">SEO e performance</p>
            <h2>Seu site está preparado para busca, velocidade e crescimento?</h2>
            <p>Criamos sites com estrutura limpa, carregamento rápido, organização correta das páginas e base preparada para métricas.</p>
          </div>
          <div className="tech-grid">
            {performanceItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section-shell international" id="internacional">
          <div className="section-heading">
            <div className="language-row">
              <p className="eyebrow">Brasil e exterior</p>
              <div className="language-toggle" aria-label="Idioma da seção internacional">
                <button
                  type="button"
                  className={internationalLang === "pt" ? "active" : ""}
                  onClick={() => setInternationalLang("pt")}
                >
                  PT
                </button>
                <button
                  type="button"
                  className={internationalLang === "en" ? "active" : ""}
                  onClick={() => setInternationalLang("en")}
                >
                  EN
                </button>
              </div>
            </div>
            {internationalLang === "pt" ? (
              <>
                <h2>Atendemos empresas no Brasil e no mundo com projetos digitais remotos.</h2>
                <p>Sites, páginas e estruturas digitais com processo claro, comunicação próxima e entrega profissional.</p>
                <a
                  className="btn secondary"
                  href="#contato"
                  onClick={(event) => {
                    trackEvent("click_start_project");
                    handleNavClick(event, "contato");
                  }}
                >
                  Iniciar projeto
                </a>
              </>
            ) : (
              <>
                <h2>We work with companies in Brazil and worldwide through remote web projects.</h2>
                <p>Websites, landing pages and digital structures with a clear process, close communication and professional delivery.</p>
                <a
                  className="btn secondary"
                  href="#contato"
                  onClick={(event) => {
                    trackEvent("click_start_project_en");
                    handleNavClick(event, "contato");
                  }}
                >
                  Start a project
                </a>
              </>
            )}
          </div>
        </section>

        <section className="section-shell faq" id="faq">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Perguntas rápidas antes de começar.</h2>
          </div>
          <div className="faq-grid">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <div className="faq-answer">
                  <p>{answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="section-shell contact" id="contato">
          <div className="contact-card contact-card-lean">
            <div>
              <p className="eyebrow">Diagnóstico rápido</p>
              <h2>Antes do orçamento, vamos entender sua necessidade.</h2>
              <p>Envie o essencial sobre o projeto. Eu analiso e respondo com o melhor próximo passo.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Seu nome
                <input type="text" name="nome" placeholder="Como posso te chamar?" required />
              </label>
              <label>
                Seu WhatsApp ou Email
                <input type="text" name="whatsapp" placeholder="Onde eu te respondo?" required />
              </label>
              <label>
                O que você precisa?
                <select name="tipoProjeto" required defaultValue="">
                  <option value="" disabled>Escolha uma opção</option>
                  <option>Site institucional</option>
                  <option>Landing page</option>
                  <option>Catálogo digital</option>
                  <option>Redesign de site</option>
                  <option>Manutenção e melhorias</option>
                  <option>Ainda não sei exatamente</option>
                </select>
              </label>
              <label>
                Momento do projeto
                <select name="orcamento" required defaultValue="">
                  <option value="" disabled>Escolha uma opção</option>
                  <option>Quero começar o quanto antes</option>
                  <option>Estou pesquisando possibilidades</option>
                  <option>Preciso melhorar um site existente</option>
                  <option>Quero entender investimento e prazo</option>
                </select>
              </label>
              <label>
                Complemento rápido
                <textarea
                  name="mensagem"
                  rows={3}
                  placeholder="Ex: minha empresa precisa parecer mais profissional e facilitar pedidos pelo WhatsApp."
                  required
                />
              </label>
              <button className="btn primary" type="submit" disabled={formState.sending}>
                {formState.sending ? "Enviando..." : "Receber uma direção"}
              </button>
              <p className={`form-note ${formState.error ? "error" : ""}`} aria-live="polite">
                {formState.message}
              </p>
              <a className="whatsapp-inline" href={whatsappHref} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                Prefiro chamar no WhatsApp
              </a>
            </form>
          </div>        </section>
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
            <a
              className="btn primary modal-cta"
              href="#contato"
              onClick={(event) => {
                setSelectedService(null);
                handleNavClick(event, "contato");
              }}
            >
              {selectedService.cta}
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
            <Brand className="footer-logo" onClick={(event) => handleNavClick(event, "inicio")} />
            <p>Sites profissionais para empresas que precisam apresentar valor, transmitir confiança e facilitar o contato.</p>
            <p className="footer-mini">Design próprio, performance alta e desenvolvimento com direção técnica.</p>
            <span className="footer-signature">Direção técnica: Gabriel Ramos</span>
          </div>

          <div className="footer-column">
            <h3>Navegação</h3>
            <a href="#inicio" onClick={(event) => handleNavClick(event, "inicio")}>Início</a>
            <a href="#sobre" onClick={(event) => handleNavClick(event, "sobre")}>Sobre</a>
            <a href="#solucao" onClick={(event) => handleNavClick(event, "solucao")}>Soluções</a>
            <a href="#servicos" onClick={(event) => handleNavClick(event, "servicos")}>Serviços</a>
            <a href="#metodo" onClick={(event) => handleNavClick(event, "metodo")}>Método</a>
            <a href="#contato" onClick={(event) => handleNavClick(event, "contato")}>Contato</a>
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
            <a
              className="footer-cta"
              href="#contato"
              onClick={(event) => {
                trackEvent("click_diagnostico", { location: "footer" });
                handleNavClick(event, "contato");
              }}
            >
              Solicitar diagnóstico
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Synaliz. Todos os direitos reservados.</span>
          <span>Design, desenvolvimento, SEO e conversão para marcas em crescimento.</span>
        </div>
      </footer>

      <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chamar a Synaliz no WhatsApp" onClick={() => trackEvent("click_whatsapp", { location: "float" })}>
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </>
  );
}
