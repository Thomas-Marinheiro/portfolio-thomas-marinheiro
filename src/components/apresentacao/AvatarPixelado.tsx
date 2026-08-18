import { useState, useEffect, useCallback } from "react";
import fotoOficial from "../../assets/Thomas-marinheiro.jpeg";
import fotoPixel from "../../assets/Thomas_Pixel.png";

interface PixelAvatarProps {
  className?: string;
  sizeClassName?: string;
  showHelperBadge?: boolean;
}

export function AvatarPixelado({
  className = "",
  sizeClassName = "h-36 w-36 sm:h-44 sm:w-44 lg:h-52 lg:w-52",
}: PixelAvatarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // null = modo automático (scroll/hover), true = forçado foto HD, false = forçado pixel
  const [manualMode, setManualMode] = useState<boolean | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = 280;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Clique alterna entre pixel e foto de forma fixa
  const handleToggle = useCallback(() => {
    setManualMode((prev) => {
      if (prev === null) {
        // Está no modo automático: vai para o oposto do estado atual
        const currentlyHd = scrollProgress > 0.5 || isHovered;
        return !currentlyHd; // true = forçar HD, false = forçar pixel
      }
      // Já está no modo manual: alterna
      return !prev;
    });
  }, [scrollProgress, isHovered]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  // Determina se deve mostrar HD
  let showHd: boolean;
  if (manualMode !== null) {
    // Modo manual: o clique decide
    showHd = manualMode;
  } else {
    // Modo automático: scroll e hover decidem
    showHd = scrollProgress > 0.5 || isHovered;
  }

  const effectiveProgress = showHd ? 1 : 0;

  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Foto de perfil interativa. Clique para alternar entre versão Pixel Art e Foto Oficial HD."
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00F5A0] rounded-full transition-transform duration-300 active:scale-95"
        onMouseEnter={() => {
          if (manualMode === null) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (manualMode === null) setIsHovered(false);
        }}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        title={showHd ? "Clique para ver a versão Pixel Art!" : "Clique para ver a Foto Oficial!"}
      >
        {/* Brilho / Glow Neomórfico de Fundo */}
        <div
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#00F5A0] via-[#38BDF8] to-[#00F5A0] opacity-75 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"
          style={{
            transform: `scale(${1 + effectiveProgress * 0.05})`,
          }}
        />

        {/* Container Principal do Avatar */}
        <div
          className={`relative ${sizeClassName} rounded-full overflow-hidden border-2 border-[#00F5A0] bg-[#18181B] shadow-2xl transition-all duration-300 group-hover:scale-[1.03]`}
        >
          {/* Foto Pixel Art */}
          <img
            src={fotoPixel}
            alt="Thomas Marinheiro em versão Pixel Art"
            className="absolute inset-0 h-full w-full object-cover rounded-full"
            style={{
              opacity: showHd ? 0 : 1,
              filter: showHd ? "blur(4px)" : "blur(0px)",
              imageRendering: "pixelated",
              transform: `scale(${showHd ? 1 : 1.05})`,
              transition: "opacity 0.5s ease-out, filter 0.5s ease-out, transform 0.5s ease-out",
            }}
          />

          {/* Foto Oficial HD */}
          <img
            src={fotoOficial}
            alt="Thomas Marinheiro Foto Oficial HD"
            className="absolute inset-0 h-full w-full object-cover rounded-full"
            style={{
              opacity: showHd ? 1 : 0,
              filter: showHd ? "blur(0px)" : "blur(4px)",
              transform: `scale(${showHd ? 1.03 : 1})`,
              transition: "opacity 0.5s ease-out, filter 0.5s ease-out, transform 0.5s ease-out",
            }}
          />

          {/* Efeito de Varredura / Glitch de Transição */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#00F5A0]/20 via-transparent to-[#38BDF8]/20 pointer-events-none"
            style={{
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
        </div>

        {/* Badge 1: Guia Flutuante (Canto Superior Direito) */}
        <div className="absolute -top-1 -right-2 sm:-right-4 z-20 flex items-center bg-[#18181B]/95 border border-[#00F5A0]/70 text-[#00F5A0] text-[10px] sm:text-[11px] font-mono font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-[#00F5A0]">
          <span>Clique</span>
        </div>

        {/* Badge 2: Indicador de Modo (Pixel / Foto) (Canto Inferior Esquerdo) */}
        <div className="absolute bottom-2 -left-2 z-20 flex items-center bg-[#18181B]/95 border border-[#38BDF8]/70 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <span>{showHd ? "Foto" : "Pixel"}</span>
        </div>
      </div>
    </div>
  );
}

