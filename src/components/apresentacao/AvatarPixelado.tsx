import { useState, useEffect } from "react";
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
  const [isClicked, setIsClicked] = useState(false);

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

  // Alternar via clique ou tecla Enter/Espaço
  const handleToggle = () => {
    setIsClicked((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  // Define progresso efetivo misturando scroll, hover e clique
  let effectiveProgress = scrollProgress;
  if (isClicked) {
    effectiveProgress = effectiveProgress > 0.5 ? 0 : 1;
  } else if (isHovered) {
    effectiveProgress = effectiveProgress > 0.5 ? 0 : 1;
  }

  const isHd = effectiveProgress > 0.5;

  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Foto de perfil interativa. Clique, passe o mouse ou role a página para alternar entre versão Pixel Art e Foto Oficial HD."
        className="relative group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00F5A0] rounded-full transition-transform duration-300 active:scale-95"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        title="Clique, passe o mouse ou role a página para alternar entre Pixel Art e Foto Oficial!"
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
          {/* Foto Pixel Art (Scroll = 0) */}
          <img
            src={fotoPixel}
            alt="Thomas Marinheiro em versão Pixel Art"
            className="absolute inset-0 h-full w-full object-cover rounded-full transition-all duration-500 ease-out"
            style={{
              opacity: 1 - effectiveProgress,
              filter: `blur(${(effectiveProgress * 4).toFixed(1)}px)`,
              imageRendering: "pixelated",
              transform: `scale(${1 + (1 - effectiveProgress) * 0.05})`,
            }}
          />

          {/* Foto Oficial HD (Scroll > 0) */}
          <img
            src={fotoOficial}
            alt="Thomas Marinheiro Foto Oficial HD"
            className="absolute inset-0 h-full w-full object-cover rounded-full transition-all duration-500 ease-out"
            style={{
              opacity: effectiveProgress,
              filter: `blur(${((1 - effectiveProgress) * 4).toFixed(1)}px)`,
              transform: `scale(${1 + effectiveProgress * 0.03})`,
            }}
          />

          {/* Efeito de Varredura / Glitch de Transição */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#00F5A0]/20 via-transparent to-[#38BDF8]/20 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: effectiveProgress > 0.05 && effectiveProgress < 0.95 ? 0.8 : 0,
            }}
          />
        </div>

        {/* Badge 1: Guia Flutuante (Canto Superior Direito) */}
        <div className="absolute -top-1 -right-2 sm:-right-4 z-20 flex items-center bg-[#18181B]/95 border border-[#00F5A0]/70 text-[#00F5A0] text-[10px] sm:text-[11px] font-mono font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-[#00F5A0]">
          <span>Clique</span>
        </div>

        {/* Badge 2: Indicador de Modo (Pixel / Foto) (Canto Inferior Esquerdo) */}
        <div className="absolute bottom-2 -left-2 z-20 flex items-center bg-[#18181B]/95 border border-[#38BDF8]/70 text-[#38BDF8] text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <span>{isHd ? "Foto" : "Pixel"}</span>
        </div>
      </div>
    </div>
  );
}

