// ============================================================
// App.tsx — Componente principal do portfólio
// Thomas Marinheiro — Desenvolvedor Front-End
//
// Recursos:
//  • Dark / Light mode
//  • Cursor personalizado
//  • Partículas animadas (canvas)
//  • Animações de scroll (IntersectionObserver)
//  • Formulário integrado com EmailJS
//  • Loader animado
// ============================================================

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import fotoPerfil from "./assets/Thomas-marinheiro.jpeg";

// ─── Credenciais EmailJS ─────────────────────────────────────
const EMAILJS_SERVICE = "service_j1i09b9";
const EMAILJS_TEMPLATE = "template_k3jrnkq";
const EMAILJS_PUBLIC = "BSUMBKusFt7HXiAwx";

// ─── Dados estáticos ─────────────────────────────────────────

const SKILLS = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Node.js",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "HTML",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Python",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Arduino",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
  },
];

const TOOLS = [
  {
    name: "VSCode",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "GitHub",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Figma",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "npm",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original.svg",
  },
];

const PROJECTS = [
  {
    title: "Cripto App",
    desc: "Aplicação web para visualização de criptomoedas com interface moderna exibindo preços, variações e dados de mercado.",
    tags: ["React", "TypeScript", "API de criptomoedas", "CSS moderno"],
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://cripto-app-sage.vercel.app/",
    color: "#f7931a",
    emoji: "₿",
  },
  {
    title: "Cine Scope",
    desc: "Aplicação web para explorar filmes, trailers e detalhes utilizando API de filmes com interface moderna.",
    tags: ["React", "TypeScript", "Movie API", "Design responsivo"],
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://cine-scope-beta-mauve.vercel.app/",
    color: "#e50914",
    emoji: "🎬",
  },
  {
    title: "CodeSite",
    desc: "Site institucional de agência de desenvolvimento com hero animado, robô interativo que acompanha o cursor, seções de serviços, projetos e formulário de contato. Design premium com foco em conversão.",
    tags: ["HTML5", "CSS3", "JavaScript", "Animações"],
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://code-site-br.vercel.app/",
    color: "#00d4ff",
    emoji: "🚀",
  },
  {
    title: "MR Agency",
    desc: "Site moderno para agência digital com identidade visual forte, layout responsivo, seções de portfólio e serviços. Interface elegante com transições suaves e experiência de usuário refinada.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsivo"],
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://mr-agency-site.vercel.app/",
    color: "#b16cea",
    emoji: "🎨",
  },
  {
    title: "Portfólio Developer",
    desc: "Portfólio profissional desenvolvido para apresentar projetos, habilidades e experiência em desenvolvimento front-end.",
    tags: ["React", "TypeScript", "Animações CSS", "Design System", "Deploy na Vercel"],
    github: "https://github.com/Thomas-Marinheiro",
    demo: "#hero",
    color: "#00d4ff",
    emoji: "📁",
  },
  {
    title: "NexTask",
    desc: "Sistema de gestão para instituições de ensino, com dashboard interativo de aulas, controle de tarefas e agenda — construído com React, TypeScript e foco em performance.",
    tags: ["React", "TypeScript", "Dashboard", "Gestão educacional"],
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://nextask-sigma.vercel.app/",
    color: "#4f46e5",
    emoji: "📊",
  },
];

const TIMELINE = [
  {
    year: "Meados de 2023",
    title: "Primeiros passos com código e hardware",
    desc: "Comecei estudando Python e Arduino, montando pequenos projetos e automações simples. Foi a fase em que aprendi lógica, estruturas básicas e como transformar ideias em algo físico funcionando.",
    icon: "🤖",
  },
  {
    year: "Final de 2023",
    title: "Descobrindo o Front-End",
    desc: "Conheci HTML e CSS e construí minhas primeiras páginas estáticas. Entendi como estrutura, tipografia e espaçamento mudam completamente a leitura de uma interface.",
    icon: "🌐",
  },
  {
    year: "Início de 2024",
    title: "JavaScript no navegador",
    desc: "Aprofundei em JavaScript, manipulando DOM, eventos e consumindo APIs. Comecei a dar vida às interfaces, adicionando interações e carregando dados reais.",
    icon: "⚡",
  },
  {
    year: "Meados de 2024",
    title: "Primeiros projetos em produção",
    desc: "Lancei o CodeSite e o MR Agency, sites completos publicados e acessíveis para qualquer pessoa. Trabalhei responsividade, animações e detalhes de experiência do usuário.",
    icon: "🚀",
  },
  {
    year: "Hoje",
    title: "Professor de Programação e Robótica",
    desc: "Atuo como professor de programação e robótica, ensinando lógica, eletrônica e desenvolvimento. Explicar conceitos diariamente me obrigou a organizar melhor meu raciocínio e escrever código mais claro. Ensinar me fez querer construir — não só explicar.",
    icon: "👨‍🏫",
  },
  {
    year: "2025",
    title: "Transição para Desenvolvedor Front-End",
    desc: "Estou evoluindo em React e TypeScript, focado em projetos com interfaces modernas e integrações reais com APIs. Busco minha primeira oportunidade formal como desenvolvedor front-end, contribuindo em produtos que cheguem ao usuário final.",
    icon: "🎯",
  },
];

const SOCIAL = [
  {
    icon: "⑂",
    label: "GitHub",
    sub: "github.com/Thomas-Marinheiro",
    href: "https://github.com/Thomas-Marinheiro",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    sub: "linkedin.com/in/thomas-marinheiro",
    href: "https://www.linkedin.com/in/thomas-marinheiro-a1b567211/",
  },
  {
    icon: "✉",
    label: "Email",
    sub: "thomasmarinheiro32@gmail.com",
    href: "mailto:thomasmarinheiro32@gmail.com",
  },
];

// ─── Componente: Canvas de partículas ────────────────────────
interface ParticleCanvasProps {
  dark: boolean;
}

function ParticleCanvas({ dark }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0,
      H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Cria partículas aleatórias
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Desenha cada partícula
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(0,212,255,${p.alpha})`
          : `rgba(0,100,200,${p.alpha})`;
        ctx.fill();
      });

      // Linhas de conexão entre partículas próximas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const a = ((1 - dist / 100) * 0.15).toFixed(3);
            ctx.strokeStyle = dark
              ? `rgba(0,212,255,${a})`
              : `rgba(0,100,200,${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ─── Componente: Card de projeto ─────────────────────────────
interface Project {
  title: string;
  desc: string;
  tags: string[];
  github: string;
  demo: string;
  color: string;
  emoji: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="project-card fade-in"
      style={
        {
          "--card-color": project.color,
          transitionDelay: `${index * 0.1}s`,
        } as React.CSSProperties
      }
    >
      <div className="project-icon" style={{ color: project.color }}>
        {project.emoji}
      </div>
      <div className="project-title">{project.title}</div>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="project-links">
        <a
          className="project-link github"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          ⑂ GitHub
        </a>
        <a
          className="project-link demo"
          href={project.demo}
          {...(project.demo.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          ↗ Live Demo
        </a>
      </div>
    </div>
  );
}

// ─── Componente principal: App ────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const formRef = useRef<HTMLFormElement>(null);

  // ── Loader: desaparece após 1.8s ──
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // ── Navbar muda ao fazer scroll ──
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Animações de scroll via IntersectionObserver ──
  useEffect(() => {
    if (!loaded) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".fade-in").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  // ── Navega suavemente até a seção ──
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  // ── Envio do formulário via EmailJS ──
  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Debug: Verificar valores capturados
    const formData = new FormData(formRef.current);
    console.log("🔍 Valores capturados do formulário:", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      proposal: formData.get("proposal"),
    });

    setFormStatus("sending");

    try {
      console.log("📧 Enviando e-mail via EmailJS...");
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        formRef.current,
        EMAILJS_PUBLIC,
      );
      console.log("✅ EmailJS response:", result);
      setFormStatus("success");
      formRef.current.reset();
      // Reseta status após 4s
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch (err) {
      console.error("❌ EmailJS error detalhado:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const NAV_ITEMS = [
    { id: "about", label: "Sobre" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projetos" },
    { id: "timeline", label: "Jornada" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <>
      {/* ── Loader ── */}
      <div className={`loader ${loaded ? "hidden" : ""}`}>
        <div className="loader-logo">&lt;/&gt;</div>
        <div className="loader-bar">
          <div className="loader-fill" />
        </div>
        <div className="loader-text">CARREGANDO PORTFÓLIO</div>
      </div>

      {/* ── Wrapper para dark/light ── */}
      <div className={dark ? "" : "light"}>
        {/* ════════════════════════════════════════
            NAVBAR
            ════════════════════════════════════════ */}
        <nav className={`navbar ${navScrolled ? "scrolled" : ""}`}>
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => scrollTo("hero")}>
              &lt;TM/&gt;
            </div>

            {/* Links desktop */}
            <div className="nav-links">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <button
                className="theme-btn"
                onClick={() => setDark(!dark)}
                aria-label="Alternar tema"
              >
                {dark ? "☀️" : "🌙"}
              </button>
            </div>

            {/* Hamburger mobile */}
            <button
              className="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {/* Menu mobile */}
          {mobileOpen && (
            <div className="mobile-menu">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <button
                className="theme-btn"
                onClick={() => setDark(!dark)}
                style={{ alignSelf: "flex-start" }}
              >
                {dark ? "☀️" : "🌙"}
              </button>
            </div>
          )}
        </nav>

        {/* ════════════════════════════════════════
            HERO
            ════════════════════════════════════════ */}
        <section id="hero">
          <ParticleCanvas dark={dark} />

          {/* Orbs de luz decorativos */}
          <div
            className="orb"
            style={{
              width: 600,
              height: 600,
              background: "var(--accent)",
              top: -200,
              right: -200,
              opacity: 0.06,
            }}
          />
          <div
            className="orb"
            style={{
              width: 400,
              height: 400,
              background: "var(--accent2)",
              bottom: -100,
              left: -100,
              opacity: 0.08,
            }}
          />

          <div className="container hero-content">
            <div className="hero-tag">Disponível para trabalho</div>

            <h1 className="hero-title">
              <span className="hero-title-grad">
                Thomas
                <br />
                Marinheiro
              </span>
            </h1>

            <div className="hero-sub">
              <span>// </span>Desenvolvedor Front-End
            </div>

            <p className="hero-desc">
              1 ano e meio transformando linhas de código em interfaces reais.
              Sites em produção, animações avançadas e olhar apurado para
              design. Buscando minha primeira vaga como dev front-end.
            </p>

            <div className="hero-btns">
              <button
                className="btn btn-primary"
                onClick={() => scrollTo("projects")}
              >
                ↓ Ver Projetos
              </button>
              <button
                className="btn btn-outline"
                onClick={() => scrollTo("contact")}
              >
                ✉ Contato
              </button>
              <a
                className="btn btn-outline"
                href="https://drive.google.com/file/d/1rkhVvQ5QD_iIx6sGxSzlMKLUZLeynuw2/view?usp=drive_link"
                target="_blank"
                rel="noreferrer"
              >
                ⬇ Baixar CV
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SOBRE MIM
            ════════════════════════════════════════ */}
        <section id="about">
          <div className="container">
            <div className="about-grid">
              {/* Foto / placeholder */}
              <div className="fade-in" style={{ position: "relative" }}>
                <div className="about-image-wrap">
                  <img
                    src={fotoPerfil}
                    alt="Thomas Marinheiro"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "24px",
                    }}
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="about-text">
                <div className="section-label fade-in">// about me</div>
                <h2 className="section-title fade-in delay-1">
                  Sobre
                  <br />
                  Mim
                </h2>

                <p className="fade-in delay-2">
                  Sou um desenvolvedor front-end com 1 ano e meio de estudos
                  intensivos, construindo projetos reais e entregando interfaces
                  que chegam à produção. Comecei explorando lógica com Python e
                  eletrônica com Arduino, até me apaixonar pelo universo web.
                </p>
                <p className="fade-in delay-3">
                  Hoje domino HTML, CSS, JavaScript e estou evoluindo em React e
                  TypeScript — sempre com foco em código limpo, design funcional
                  e experiências que convertem. Busco minha primeira
                  oportunidade formal para crescer dentro de um time de
                  tecnologia.
                </p>

                <div className="about-stats fade-in delay-4">
                  {[
                    ["1.5", "Anos Estudando"],
                    [String(PROJECTS.length), "Sites em Produção"],
                    ["6+", "Tecnologias"],
                    ["∞", "Curiosidade"],
                  ].map(([n, l]) => (
                    <div className="stat" key={l}>
                      <div className="stat-num">{n}</div>
                      <div className="stat-label">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SKILLS
            ════════════════════════════════════════ */}
        <section id="skills">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label fade-in">// skills</div>
              <h2 className="section-title fade-in delay-1">
                Stack
                <br />
                Técnico
              </h2>
            </div>

            <div className="skills-grid">
              <div className="skills-col fade-in delay-1">
                <div className="section-label" style={{ marginBottom: 16 }}>
                  // tecnologias
                </div>
                <div className="skills-badges">
                  {SKILLS.map((s) => (
                    <span className="badge" key={s.name}>
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="badge-logo"
                        loading="lazy"
                      />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skills-col fade-in delay-2">
                <div className="section-label" style={{ marginBottom: 16 }}>
                  // ferramentas
                </div>
                <div className="tools-grid">
                  {TOOLS.map((t) => (
                    <span
                      className="tag tool-badge"
                      key={t.name}
                      style={{ padding: "8px 16px", fontSize: 12 }}
                    >
                      <img
                        src={t.logo}
                        alt={t.name}
                        className="badge-logo"
                        loading="lazy"
                      />
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PROJETOS
            ════════════════════════════════════════ */}
        <section id="projects">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label fade-in">// projects</div>
              <h2 className="section-title fade-in delay-1">
                Projetos
                <br />
                em Produção
              </h2>
              <p
                className="fade-in delay-2"
                style={{
                  color: "var(--text-muted)",
                  maxWidth: 520,
                  margin: "0 auto",
                  fontSize: 15,
                  lineHeight: 1.8,
                }}
              >
                Sites reais, em produção, construídos do zero. Cada um
                representa desafios técnicos superados e horas de dedicação.
              </p>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            JORNADA / TIMELINE
            ════════════════════════════════════════ */}
        <section id="timeline">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <div className="section-label fade-in">// journey</div>
              <h2 className="section-title fade-in delay-1">
                Minha
                <br />
                Jornada
              </h2>
            </div>

            <div style={{ maxWidth: 640, margin: "0 auto" }}>
              <div className="timeline-wrap">
                {TIMELINE.map((item, i) => (
                  <div
                    className="timeline-item fade-in"
                    key={item.year}
                    style={{ transitionDelay: `${i * 0.12}s` }}
                  >
                    <div className="timeline-dot">{item.icon}</div>
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            CONTATO
            ════════════════════════════════════════ */}
        <section id="contact">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label fade-in">// contact</div>
              <h2 className="section-title fade-in delay-1">
                Vamos
                <br />
                Conversar?
              </h2>
            </div>

            <div className="contact-grid">
              {/* Links sociais */}
              <div className="contact-info fade-in">
                <p>
                  Estou em busca de oportunidades como desenvolvedor front-end.
                  Se você tem um projeto interessante ou uma vaga, adoraria
                  conversar!
                </p>
                <div className="social-links">
                  {SOCIAL.map((s) => (
                    <a
                      className="social-link"
                      href={s.href}
                      key={s.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="social-icon">{s.icon}</span>
                      <div className="social-text">
                        {s.label}
                        <span>{s.sub}</span>
                      </div>
                      <span className="social-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Formulário com EmailJS */}
              <form
                ref={formRef}
                className="contact-form fade-in delay-2"
                onSubmit={handleContact}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Nome
                    </label>
                    <input
                      id="name"
                      className="form-input"
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Número de Contato
                    </label>
                    <input
                      id="phone"
                      className="form-input"
                      type="tel"
                      name="phone"
                      placeholder="(11) 91234-5678"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">
                      Assunto
                    </label>
                    <input
                      id="subject"
                      className="form-input"
                      type="text"
                      name="subject"
                      placeholder="Proposta de trabalho..."
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="proposal">
                    Proposta / Mensagem
                  </label>
                  <textarea
                    id="proposal"
                    className="form-textarea"
                    name="proposal"
                    placeholder="Me conte mais sobre o projeto ou oportunidade..."
                    required
                  />
                </div>

                {/* Feedback de envio */}
                {formStatus === "success" && (
                  <div className="form-status success">
                    ✓ Mensagem enviada com sucesso! Retornarei em breve.
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="form-status error">
                    ✗ Erro ao enviar. Tente novamente ou me contate pelo email.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ alignSelf: "flex-start" }}
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending"
                    ? "⏳ Enviando..."
                    : "✉ Enviar Mensagem"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer>
          <div className="container">
            <p>
              Desenvolvido com <span>♥</span> por <span>Thomas Marinheiro</span>{" "}
              · 2025
            </p>
            <p style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
              React · TypeScript · CSS Moderno
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
