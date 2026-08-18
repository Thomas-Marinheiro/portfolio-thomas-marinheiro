import { useState, useEffect, useCallback } from "react";
import { Terminal, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Fecha o menu com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { name: "// hero", href: "#hero" },
    { name: "// projetos", href: "#projects" },
    { name: "// skills", href: "#skills" },
    { name: "// trajetória", href: "#trajectory" },
    { name: "// contato", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#18181B]/95 backdrop-blur-md border-b border-[#27272A] py-3 shadow-xl"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-mono text-sm sm:text-base font-bold text-[#F8FAFC] tracking-wider group flex items-center space-x-2 relative z-50"
          >
            <Terminal className="h-4 w-4 text-[#00F5A0] group-hover:rotate-12 transition-transform" />
            <span>
              THOMAS<span className="text-[#00F5A0]">.DEV</span>
            </span>
          </a>

          {/* Links Desktop */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-xs text-[#94A3B8] transition-colors hover:text-[#00F5A0]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Status Badge Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="rounded-lg border border-[#00F5A0]/40 bg-[#00F5A0]/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-[#00F5A0] transition-all hover:bg-[#00F5A0] hover:text-[#18181B]"
            >
              Disponível para projetos
            </a>
          </div>

          {/* Botão Mobile Hambúrguer */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden relative z-50 p-2.5 focus:outline-none rounded-lg border border-[#3F3F46] bg-[#27272A] active:scale-95 transition-transform"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <div className="relative h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 text-[#F8FAFC] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 text-[#00F5A0] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Menu Drawer Mobile */}
      <nav
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Menu mobile"
        className={`fixed top-0 left-0 right-0 z-40 md:hidden transition-all duration-400 ease-out ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#18181B]/98 backdrop-blur-xl border-b border-[#27272A] shadow-2xl pt-20 pb-8 px-6">
          <div className="space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="block font-mono text-base text-[#94A3B8] hover:text-[#00F5A0] hover:bg-[#27272A] py-3 px-4 rounded-lg transition-all duration-200 active:scale-[0.98]"
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(-12px)",
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out, color 0.2s, background-color 0.2s",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Mobile */}
          <a
            href="#contact"
            onClick={closeMobileMenu}
            className="block text-center rounded-lg bg-[#00F5A0] px-4 py-3 font-mono text-sm font-bold text-[#18181B] mt-6 active:scale-[0.98] transition-transform"
            style={{
              transitionDelay: mobileMenuOpen ? `${navLinks.length * 50}ms` : "0ms",
              opacity: mobileMenuOpen ? 1 : 0,
              transition: "opacity 0.3s ease-out, transform 0.15s",
            }}
          >
            Disponível para projetos
          </a>
        </div>
      </nav>
    </>
  );
}

