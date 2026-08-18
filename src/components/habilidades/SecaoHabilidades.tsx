import { CartaoInterativo } from "../ui/CartaoInterativo";
import {
  Code2,
  Atom,
  Terminal,
  Palette,
  Globe,
  Server,
  Cpu,
  Zap,
  Bot,
  Brain,
  GitBranch,
  Layout,
  Wrench,
  Boxes,
} from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  IconComponent: React.ComponentType<{ className?: string }>;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core & Frontend",
    skills: [
      { name: "React", level: "Avançado", IconComponent: Atom },
      { name: "Next.js", level: "Avançado", IconComponent: Zap },
      { name: "TypeScript", level: "Avançado", IconComponent: Code2 },
      { name: "JavaScript", level: "Avançado", IconComponent: Terminal },
      { name: "Tailwind CSS", level: "Avançado", IconComponent: Palette },
      { name: "HTML5 & CSS3", level: "Especialista", IconComponent: Globe },
    ],
  },
  {
    title: "Backend & Linguagens",
    skills: [
      { name: "Node.js", level: "Intermediário", IconComponent: Server },
      { name: "Python", level: "Intermediário", IconComponent: Terminal },
      { name: "REST APIs", level: "Avançado", IconComponent: Zap },
      { name: "C++", level: "Fundamentos", IconComponent: Cpu },
    ],
  },
  {
    title: "Hardware & EdTech",
    skills: [
      { name: "Arduino & IoT", level: "Avançado", IconComponent: Bot },
      { name: "Robótica Educacional", level: "Especialista", IconComponent: Cpu },
      { name: "Lógica de Programação", level: "Especialista", IconComponent: Brain },
    ],
  },
  {
    title: "Ferramentas & Workflow",
    skills: [
      { name: "Git & GitHub", level: "Avançado", IconComponent: GitBranch },
      { name: "VS Code", level: "Avançado", IconComponent: Layout },
      { name: "Vercel Deploy", level: "Avançado", IconComponent: Boxes },
      { name: "Figma UI/UX", level: "Intermediário", IconComponent: Wrench },
    ],
  },
];

export function SecaoHabilidades() {
  return (
    <section id="skills" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#18181B] z-10 border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#00F5A0]/30 bg-[#27272A] px-3.5 py-1 font-mono text-xs text-[#00F5A0] mb-3">
            <Cpu className="h-3.5 w-3.5" />
            <span>// HARD SKILLS &amp; ARSENAL TÉCNICO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Tecnologias &amp; <span className="text-[#00F5A0]">Habilidades Técnicas</span>
          </h2>
        </div>

        {/* Categorias de Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((category) => (
            <CartaoInterativo key={category.title} intensity={6} className="bg-[#27272A] border-[#3F3F46]">
              <div className="flex items-center space-x-2 border-b border-[#3F3F46] pb-3 mb-5">
                <span className="h-2 w-2 rounded-full bg-[#00F5A0]" />
                <h3 className="font-mono text-base sm:text-lg font-bold text-[#F8FAFC] tracking-tight">
                  {category.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {category.skills.map((skill) => {
                  const Icon = skill.IconComponent;
                  return (
                    <div
                      key={skill.name}
                      className="group relative flex flex-col justify-between rounded-lg border border-[#3F3F46] bg-[#18181B] p-2.5 sm:p-3 transition-all duration-300 hover:border-[#00F5A0] hover:shadow-[0_0_12px_rgba(0,245,160,0.12)]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="h-4 w-4 text-[#00F5A0]" />
                        <span className="font-mono text-[9px] sm:text-[10px] text-[#00F5A0] bg-[#00F5A0]/10 px-1.5 py-0.5 rounded border border-[#00F5A0]/20">
                          {skill.level}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#F8FAFC] group-hover:text-[#00F5A0] transition-colors truncate">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CartaoInterativo>
          ))}
        </div>
      </div>
    </section>
  );
}
