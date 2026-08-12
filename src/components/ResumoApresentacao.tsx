import { ArrowRight, Send } from "lucide-react";

export function ResumoApresentacao() {
  return (
    <div className="lg:col-span-6 order-1 flex flex-col space-y-5 sm:space-y-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.15]">
        Desenvolvimento Front-End com foco em <span className="text-[#00F5A0]">performance &amp; interfaces modernas</span>.
      </h1>

      <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl font-normal leading-relaxed">
        Desenvolvo aplicações web responsivas utilizando React, Next.js e TypeScript. Estudo continuamente conceitos de Back-End e QA para entregar código estruturado e de alta qualidade.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <a
          href="#projects"
          className="inline-flex items-center justify-center rounded-lg bg-[#00F5A0] px-5 sm:px-6 py-3 font-mono text-xs sm:text-sm font-bold text-[#18181B] transition-all duration-300 hover:bg-[#00F5A0]/90 hover:shadow-[0_0_20px_rgba(0,245,160,0.35)] active:scale-95"
        >
          <span>Ver Projetos</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>

        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-lg border border-[#3F3F46] bg-[#27272A] px-5 sm:px-6 py-3 font-mono text-xs sm:text-sm font-bold text-[#F8FAFC] transition-all duration-300 hover:border-[#00F5A0] hover:text-[#00F5A0] active:scale-95"
        >
          <span>Contato</span>
          <Send className="ml-2 h-3.5 w-3.5" />
        </a>
      </div>

      {/* Métricas Responsivas */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#27272A]">
        <div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#00F5A0]">1+</div>
          <div className="text-[10px] sm:text-xs text-[#94A3B8] font-mono uppercase tracking-wider">Ano de Código</div>
        </div>
        <div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#00F5A0]">6+</div>
          <div className="text-[10px] sm:text-xs text-[#94A3B8] font-mono uppercase tracking-wider">Projetos Publicados</div>
        </div>
        <div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#00F5A0]">ADS</div>
          <div className="text-[10px] sm:text-xs text-[#94A3B8] font-mono uppercase tracking-wider">Formação Técnica</div>
        </div>
      </div>
    </div>
  );
}
