import { JanelaCodigo } from "../ui/JanelaCodigo";
import { CartaoInterativo } from "../ui/CartaoInterativo";
import { ResumoApresentacao } from "./ResumoApresentacao";
import { CartaoPerfil } from "./CartaoPerfil";
import { jsonCodeLines } from "../../data/dadosApresentacao";

export function SecaoApresentacao() {
  return (
    <section id="hero" className="relative min-h-[85vh] pt-40 md:pt-48 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start z-10 w-full">
        
        {/* Coluna Esquerda: Título, Descrição, Botões & Métricas */}
        <ResumoApresentacao />

        {/* Coluna Direita: Card de Perfil (topo) + Terminal de Código */}
        <div className="lg:col-span-6 order-2 flex flex-col space-y-6 w-full">
          <CartaoPerfil />

          {/* Mockup de Código JSON Alinhado na Mesma Coluna */}
          <CartaoInterativo intensity={8} className="bg-transparent border-none p-0 w-full">
            <JanelaCodigo filename="developer.json" codeLines={jsonCodeLines} />
          </CartaoInterativo>
        </div>

      </div>
    </section>
  );
}
