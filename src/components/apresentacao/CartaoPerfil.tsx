import { AvatarPixelado } from "./AvatarPixelado";

export function CartaoPerfil() {
  return (
    <div className="flex flex-col items-center text-center space-y-4 bg-[#1E1E22] border border-[#3F3F46] p-6 sm:p-7 rounded-xl shadow-2xl transition-all duration-300 hover:border-[#00F5A0]/50 w-full relative overflow-hidden group">
      {/* Efeito sutil de brilho no fundo do card */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00F5A0]/10 rounded-full blur-3xl group-hover:bg-[#00F5A0]/20 transition-all duration-500 pointer-events-none" />

      {/* Avatar Interativo em Tamanho Ainda Maior com Guia Visual */}
      <AvatarPixelado sizeClassName="h-36 w-36 sm:h-44 sm:w-44 lg:h-52 lg:w-52" />

      {/* Informações de Perfil Abaixo da Foto */}
      <div className="space-y-1 z-10 pt-1">
        <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">Thomas Marinheiro</h2>
        <p className="text-xs sm:text-sm font-mono text-[#00F5A0] font-medium">
          Desenvolvedor Front-End &amp; Professor de Programação
        </p>
        <p className="text-[11px] sm:text-xs font-mono text-[#94A3B8]">
          Técnico em Análise e Dev. de Sistemas (Em andamento)
        </p>
      </div>
    </div>
  );
}
