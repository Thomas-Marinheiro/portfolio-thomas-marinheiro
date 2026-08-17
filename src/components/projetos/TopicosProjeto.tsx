import { AlertCircle, Cpu, TrendingUp } from "lucide-react";

interface TopicosProps {
  desafio: string;
  solucao: string;
  resultado: string;
}

export function TopicosProjeto({ desafio, solucao, resultado }: TopicosProps) {
  return (
    <div className="space-y-3 text-xs sm:text-sm leading-relaxed mb-4">
      <div className="rounded-lg bg-[#18181B] p-3 border border-[#3F3F46]/60">
        <div className="flex items-center space-x-1.5 mb-1">
          <AlertCircle className="h-3.5 w-3.5 text-[#00F5A0]" />
          <span className="font-mono text-xs text-[#00F5A0] font-bold uppercase tracking-wider">
            O Desafio:
          </span>
        </div>
        <p className="text-[#94A3B8] font-normal">{desafio}</p>
      </div>

      <div className="rounded-lg bg-[#18181B] p-3 border border-[#3F3F46]/60">
        <div className="flex items-center space-x-1.5 mb-1">
          <Cpu className="h-3.5 w-3.5 text-[#38BDF8]" />
          <span className="font-mono text-xs text-[#38BDF8] font-bold uppercase tracking-wider">
            A Solução:
          </span>
        </div>
        <p className="text-[#94A3B8] font-normal">{solucao}</p>
      </div>

      <div className="rounded-lg bg-[#18181B] p-3 border border-[#00F5A0]/20">
        <div className="flex items-center space-x-1.5 mb-1">
          <TrendingUp className="h-3.5 w-3.5 text-[#00F5A0]" />
          <span className="font-mono text-xs text-[#00F5A0] font-bold uppercase tracking-wider">
            O Resultado:
          </span>
        </div>
        <p className="text-[#F8FAFC] font-medium">{resultado}</p>
      </div>
    </div>
  );
}
