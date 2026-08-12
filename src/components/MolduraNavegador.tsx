import React from "react";
import { Lock } from "lucide-react";

interface MolduraNavegadorProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export function MolduraNavegador({
  url = "https://thomas-marinheiro.dev",
  children,
  className = "",
}: MolduraNavegadorProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#3F3F46] bg-[#18181B] shadow-2xl transition-all duration-300 hover:border-[#00F5A0]/40 ${className}`}
    >
      {/* Top bar de navegação macOS */}
      <div className="flex items-center justify-between border-b border-[#27272A] bg-[#27272A] px-3 sm:px-4 py-2 sm:py-2.5 select-none">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56]" />
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27C93F]" />
        </div>

        {/* Barra de endereço */}
        <div className="flex max-w-md flex-1 items-center justify-center mx-2 sm:mx-4">
          <div className="flex w-full items-center justify-center space-x-2 rounded-md bg-[#18181B] px-2.5 py-1 text-[11px] sm:text-xs text-[#94A3B8] font-mono border border-[#3F3F46]">
            <Lock className="h-3 w-3 text-[#00F5A0] shrink-0" />
            <span className="truncate max-w-[160px] sm:max-w-none">{url}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-[#94A3B8]">
          <span className="h-2 w-2 rounded-full bg-[#00F5A0] animate-pulse" />
          <span className="font-mono text-[10px] hidden sm:inline">LIVE</span>
        </div>
      </div>

      {/* Conteúdo interno da janela */}
      <div className="p-4 sm:p-5 bg-[#18181B]">{children}</div>
    </div>
  );
}
