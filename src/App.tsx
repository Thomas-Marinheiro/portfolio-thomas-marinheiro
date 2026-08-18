import { Navbar } from "./components/layout/Navbar";
import { SecaoApresentacao } from "./components/apresentacao/SecaoApresentacao";
import { SecaoProjetos } from "./components/projetos/SecaoProjetos";
import { SecaoHabilidades } from "./components/habilidades/SecaoHabilidades";
import { SecaoTrajetoria } from "./components/trajetoria/SecaoTrajetoria";
import { SecaoContato } from "./components/contato/SecaoContato";
import { Footer } from "./components/layout/Footer";
import { FundoParticulas } from "./components/ui/FundoParticulas";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#18181B] text-[#F8FAFC] font-sans selection:bg-[#00F5A0] selection:text-[#18181B]">
      {/* Fundo de Nós & Gravidade Antigravity */}
      <FundoParticulas />

      {/* Navegação Topo */}
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="relative z-10 space-y-12">
        <SecaoApresentacao />
        <SecaoProjetos />
        <SecaoHabilidades />
        <SecaoTrajetoria />
        <SecaoContato />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
