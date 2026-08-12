import { CartaoProjeto } from "./CartaoProjeto";
import { Folder } from "lucide-react";
import { LISTA_PROJETOS } from "../data/dadosProjetos";

export function SecaoProjetos() {
  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#18181B] z-10">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#27272A] pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#00F5A0]/30 bg-[#27272A] px-3.5 py-1 font-mono text-xs text-[#00F5A0] mb-3">
              <Folder className="h-3.5 w-3.5" />
              <span>// COMO EU PENSO &amp; O QUE CONSTRUO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              Projetos &amp; <span className="text-[#00F5A0]">Aplicações Web</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] max-w-md mt-4 md:mt-0 leading-relaxed">
            Aplicações construídas com foco em código limpo, componentização modular e experiência de usuário de alta performance.
          </p>
        </div>

        {/* Grid de Projetos Mobile-First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {LISTA_PROJETOS.map((projetoDetalhes, index) => (
            <CartaoProjeto key={projetoDetalhes.id} project={projetoDetalhes} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
