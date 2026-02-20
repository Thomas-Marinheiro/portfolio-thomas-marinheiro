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

// ─── Credenciais EmailJS ─────────────────────────────────────
const EMAILJS_SERVICE = "service_j1i09b9";
const EMAILJS_TEMPLATE = "template_k3jrnkq";
const EMAILJS_PUBLIC = "BSUMBKusFt7HXiAwx";

// ─── Dados estáticos ─────────────────────────────────────────

const SKILLS_FRONTEND = [
  { name: "JavaScript", level: 88, icon: "⚡" },
  { name: "TypeScript", level: 82, icon: "🔷" },
  { name: "HTML5", level: 95, icon: "🌐" },
  { name: "CSS3", level: 90, icon: "🎨" },
  { name: "React", level: 80, icon: "⚛️" },
  { name: "Git / GitHub", level: 85, icon: "🐙" },
];

const SKILLS_OTHER = [
  { name: "Python", level: 75, icon: "🐍" },
  { name: "C++", level: 65, icon: "⚙️" },
  { name: "Arduino", level: 70, icon: "🤖" },
];

const TOOLS = ["VSCode", "Git", "GitHub", "Figma", "npm", "Chrome DevTools"];

const PROJECTS = [
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
];

const TIMELINE = [
  {
    year: "Mid 2023",
    title: "O Início",
    desc: "Dei meus primeiros passos em programação com Python e Arduino. Automações simples que acenderam uma chama — e não apagaram mais.",
    icon: "🌱",
  },
  {
    year: "Late 2023",
    title: "Descobrindo o Front-End",
    desc: "Aprendi HTML e CSS do zero. Criei minha primeira página estática e percebi que queria construir coisas que as pessoas pudessem usar de verdade.",
    icon: "📚",
  },
  {
    year: "Early 2024",
    title: "JavaScript & Lógica",
    desc: "Mergulhei em JavaScript: DOM, eventos, APIs. Os projetos começaram a ganhar vida. Git e GitHub viraram parte da rotina.",
    icon: "⚡",
  },
  {
    year: "Mid 2024",
    title: "Projetos em Produção",
    desc: "Lancei o CodeSite e o MR Agency — sites completos, em produção, com animações avançadas e responsividade total. Do zero ao deploy.",
    icon: "🚀",
  },
  {
    year: "2025",
    title: "React, TypeScript & Mercado",
    desc: "Evoluindo para tecnologias modernas e construindo portfólio sólido. Pronto para contribuir com um time e crescer como desenvolvedor profissional.",
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

// ─── Componente: Barra de habilidade ─────────────────────────
interface Skill {
  name: string;
  level: number;
  icon: string;
}

function SkillBar({ skill, animate }: { skill: Skill; animate: boolean }) {
  return (
    <div className="skill-item fade-in">
      <div className="skill-header">
        <span className="skill-name">
          <span>{skill.icon}</span>
          {skill.name}
        </span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{ width: animate ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
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
          target="_blank"
          rel="noreferrer"
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
  const [skillsAnimate, setSkillsAnimate] = useState(false);
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
            // Dispara animação das barras de skill quando a seção aparece
            if (entry.target.closest("#skills")) setSkillsAnimate(true);
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
                    src="src/assets/Thomas-marinheiro.jpeg"
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
                    ["2+", "Projetos Reais"],
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
              {/* Front-End */}
              <div className="skills-col fade-in delay-1">
                <h3>🖥️ Front-End</h3>
                {SKILLS_FRONTEND.map((s) => (
                  <SkillBar key={s.name} skill={s} animate={skillsAnimate} />
                ))}
              </div>

              {/* Outras tecnologias + ferramentas */}
              <div className="skills-col fade-in delay-2">
                <h3>⚙️ Outras Tecnologias</h3>
                {SKILLS_OTHER.map((s) => (
                  <SkillBar key={s.name} skill={s} animate={skillsAnimate} />
                ))}

                <div style={{ marginTop: 40 }}>
                  <div className="section-label" style={{ marginBottom: 16 }}>
                    // ferramentas
                  </div>
                  <div className="tools-grid">
                    {TOOLS.map((t) => (
                      <span
                        className="tag"
                        key={t}
                        style={{ padding: "8px 16px", fontSize: 12 }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
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

              {/* Card "próximo projeto" — ocupa as 2 colunas */}
              <div
                className="project-card project-card-wide fade-in delay-3"
                style={{ "--card-color": "#43e97b" } as React.CSSProperties}
              >
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="project-icon" style={{ color: "#43e97b" }}>
                    ⚛️
                  </div>
                  <div className="project-title">Próximo Projeto</div>
                  <p className="project-desc">
                    Em desenvolvimento — aplicação React + TypeScript com foco
                    em performance e acessibilidade. Em breve no portfólio.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    className="tag"
                    style={{
                      padding: "8px 16px",
                      fontSize: 13,
                      color: "#43e97b",
                      borderColor: "#43e97b",
                    }}
                  >
                    🔨 Em construção...
                  </span>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["React", "TypeScript", "CSS Moderno"].map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
