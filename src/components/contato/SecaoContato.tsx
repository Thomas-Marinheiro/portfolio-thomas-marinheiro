import { LinksContato } from "./LinksContato";
import { FormularioContato } from "./FormularioContato";

export function SecaoContato() {
  return (
    <section id="contact" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#18181B] z-10 border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Informações de Contato */}
          <div className="lg:col-span-5">
            <LinksContato />
          </div>

          {/* Formulário Cyber-Humano */}
          <div className="lg:col-span-7">
            <FormularioContato />
          </div>
        </div>
      </div>
    </section>
  );
}
