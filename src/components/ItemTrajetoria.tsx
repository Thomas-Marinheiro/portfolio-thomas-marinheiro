import { CartaoInterativo } from "./CartaoInterativo";

export interface EtapaTrajetoria {
  periodo: string;
  titulo: string;
  descricao: string;
  destaque?: boolean;
}

interface ItemTrajetoriaProps {
  etapa: EtapaTrajetoria;
}

export function ItemTrajetoria({ etapa }: ItemTrajetoriaProps) {
  return (
    <div className="relative group">
      {/* Ponto marcador na linha */}
      <span
        aria-hidden
        className={`absolute -left-[21px] sm:-left-[26px] top-1.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${
          etapa.destaque
            ? "bg-[#00F5A0] ring-4 ring-[#00F5A0]/15 shadow-[0_0_10px_rgba(0,245,160,0.6)]"
            : "bg-[#3F3F46] transition-colors group-hover:bg-[#00F5A0]/70"
        }`}
      />

      {/* Card da Trajetória */}
      <CartaoInterativo
        intensity={4}
        className={`bg-[#27272A] border-[#3F3F46] p-4 sm:p-5 ${
          etapa.destaque ? "border-[#00F5A0]/50 shadow-[0_0_15px_rgba(0,245,160,0.08)]" : ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs text-[#00F5A0] font-bold tracking-wider">
            {etapa.periodo}
          </span>
        </div>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#F8FAFC] mb-1.5">{etapa.titulo}</h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-normal">{etapa.descricao}</p>
      </CartaoInterativo>
    </div>
  );
}
