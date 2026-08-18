import { CartaoInterativo } from "../ui/CartaoInterativo";
import { MolduraNavegador } from "../ui/MolduraNavegador";
import { ExternalLink } from "lucide-react";
import { PreviewSiteProjeto } from "./PreviewSiteProjeto";
import { TopicosProjeto } from "./TopicosProjeto";
import { TagsProjeto } from "./TagsProjeto";

export interface ProjetoItem {
  id: string;
  title: string;
  category: string;
  url: string;
  github: string;
  demo: string;
  image?: string;
  tags: string[];
  desafio: string;
  solucao: string;
  resultado: string;
}

interface ProjectCardProps {
  project: ProjetoItem;
  index: number;
}

function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function CartaoProjeto({ project, index }: ProjectCardProps) {
  return (
    <CartaoInterativo intensity={8} className="bg-[#27272A] border-[#3F3F46] p-3 sm:p-4">
      <MolduraNavegador url={project.url}>
        {/* Header do Card */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3F3F46] pb-3 mb-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-[#00F5A0] uppercase tracking-wider block mb-0.5">
              Projeto #{index + 1} — {project.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] tracking-tight">
              {project.title}
            </h3>
          </div>

          {/* Links de Ação */}
          <div className="flex items-center space-x-2.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 font-mono text-xs text-[#94A3B8] transition-colors hover:text-[#00F5A0]"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target={project.demo.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="inline-flex items-center space-x-1 rounded bg-[#00F5A0]/10 border border-[#00F5A0]/30 px-2.5 py-1 font-mono text-xs text-[#00F5A0] transition-colors hover:bg-[#00F5A0] hover:text-[#18181B]"
              >
                <span>Visitar o site</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Preview do Site */}
        <PreviewSiteProjeto image={project.image} demo={project.demo} title={project.title} />

        {/* Tópicos Rígidos */}
        <TopicosProjeto desafio={project.desafio} solucao={project.solucao} resultado={project.resultado} />

        {/* Tags do Projeto */}
        <TagsProjeto tags={project.tags} />
      </MolduraNavegador>
    </CartaoInterativo>
  );
}
