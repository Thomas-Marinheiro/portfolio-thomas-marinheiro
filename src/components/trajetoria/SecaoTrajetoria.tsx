import { Rocket, History } from "lucide-react";
import { ItemTrajetoria, type EtapaTrajetoria } from "./ItemTrajetoria";

const DADOS_TRAJETORIA: EtapaTrajetoria[] = [
  {
    periodo: "2025 — ATUALMENTE",
    titulo: "Desenvolvedor Front-End & Técnico em ADS",
    descricao:
      "Desenvolvendo aplicações web com React, Next.js e TypeScript. Estudo técnico em Análise e Desenvolvimento de Sistemas, aprofundando também em conceitos de Back-End (Node.js/Python) e QA.",
    destaque: true,
  },
  {
    periodo: "ATUALMENTE",
    titulo: "Professor de Programação e Robótica",
    descricao:
      "Ensino lógica de programação, eletrônica e robótica com Arduino para novos alunos. Ensinar diariamente consolida minha organização de raciocínio lógico e clareza de código.",
  },
  {
    periodo: "MEADOS DE 2024",
    titulo: "Primeiras Aplicações em Produção",
    descricao:
      "Desenvolvimento e publicação do CodeSite e MR Agency na Vercel. Foco em responsividade, animações CSS performáticas e experiência do usuário.",
  },
  {
    periodo: "INÍCIO DE 2024",
    titulo: "JavaScript no Navegador & APIs",
    descricao:
      "Aprofundamento em JavaScript assíncrono, manipulação do DOM, consumo de APIs REST e componentização modular.",
  },
  {
    periodo: "2023",
    titulo: "Primeiros Passos com Python & Arduino",
    descricao:
      "Início da trajetória em programação com Python e lógica para hardware com Arduino. Construção dos primeiros projetos práticos e automações.",
  },
];

export function SecaoTrajetoria() {
  return (
    <section id="trajectory" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#18181B] z-10 border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#00F5A0]/30 bg-[#27272A] px-3.5 py-1 font-mono text-xs text-[#00F5A0] mb-3">
            <History className="h-3.5 w-3.5" />
            <span>// TRAJETÓRIA &amp; HISTÓRICO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Jornada de <span className="text-[#00F5A0]">Aprendizado e Código</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative ml-2 sm:ml-4">
          {/* Trilha esquerda: linha + foguete sticky */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10">
            {/* Linha vertical */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[#3F3F46]" />

            {/* Foguete grudado na linha enquanto a seção estiver em foco */}
            <div className="sticky top-[35vh] z-20 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-[#00F5A0]/50 bg-[#18181B] shadow-[0_0_14px_rgba(0,245,160,0.35)]">
              <Rocket className="h-3.5 w-3.5 text-[#00F5A0]" />
            </div>
          </div>

          {/* Cards da Trajetória */}
          <div className="ml-8 sm:ml-10 space-y-8 sm:space-y-10">
            {DADOS_TRAJETORIA.map((etapa, index) => (
              <ItemTrajetoria key={index} etapa={etapa} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
