import { useState, useEffect } from "react";
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

  const navLinks = [
    { name: "// hero", href: "#hero" },
    { name: "// projetos", href: "#projects" },
    { name: "// skills", href: "#skills" },
    { name: "// trajetória", href: "#trajectory" },
    { name: "// contato", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#18181B]/95 backdrop-blur-md border-b border-[#27272A] py-3.5 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-mono text-sm sm:text-base font-bold text-[#F8FAFC] tracking-wider group flex items-center space-x-2">
          <Terminal className="h-4 w-4 text-[#00F5A0] group-hover:rotate-12 transition-transform" />
          <span>THOMAS<span className="text-[#00F5A0]">.DEV</span></span>
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#F8FAFC] p-2 focus:outline-none rounded-lg border border-[#3F3F46] bg-[#27272A]"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-[#00F5A0]" /> : <Menu className="h-5 w-5 text-[#F8FAFC]" />}
        </button>
      </div>

      {/* Menu Drawer Mobile Adaptável */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#27272A] bg-[#18181B]/98 backdrop-blur-xl px-6 py-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-sm text-[#94A3B8] hover:text-[#00F5A0] py-1 border-b border-[#27272A]/50"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center rounded-lg bg-[#00F5A0] px-4 py-2.5 font-mono text-xs font-bold text-[#18181B] mt-4"
          >
            Disponível para projetos
          </a>
        </div>
      )}
    </header>
  );
}
