import React, { useRef, useState, useEffect } from "react";

interface AntigravityCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
  onClick?: () => void;
}

export function CartaoInterativo({
  children,
  className = "",
  intensity = 10,
  glow = true,
  onClick,
}: AntigravityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se a tela é mobile/tablet para desativar tilt e manter scroll 100% estável
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Vetor suave com intensidade reduzida para estabilidade visual
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    const rotateX = -mouseY * (intensity * 0.6); // Amplitude contida
    const rotateY = mouseX * (intensity * 0.6);
    const translateZ = 4;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${translateZ}px)`);
    setGlarePos({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isMobile ? "none" : transform,
        transition: isHovered
          ? "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)"
          : "transform 0.5s ease-out, border-color 0.3s, box-shadow 0.3s",
      }}
      className={`antigravity-card relative overflow-hidden rounded-xl border bg-[#27272A] border-[#3F3F46] p-4 sm:p-6 transition-all duration-300 ${
        isHovered
          ? glow
            ? "border-[#00F5A0] shadow-[0_8px_25px_-5px_rgba(0,245,160,0.12)]"
            : "border-zinc-500 shadow-lg"
          : "hover:border-[#3F3F46]"
      } ${className}`}
    >
      {/* Glare/Brilho dinâmico reativo apenas no desktop */}
      {isHovered && !isMobile && (
        <div
          className="pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 245, 160, 0.35) 0%, transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
