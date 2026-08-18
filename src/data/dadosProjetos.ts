import type { ProjetoItem } from "../components/projetos/CartaoProjeto";
import image1 from "../assets/print_sites/1.jpg";
import image2 from "../assets/print_sites/2.jpg";
import image3 from "../assets/print_sites/code site.jpg";
import image4 from "../assets/print_sites/3.jpg";
import image5 from "../assets/print_sites/4.jpg";
import image7 from "../assets/print_sites/portfolio.jpg";

export const LISTA_PROJETOS: ProjetoItem[] = [
  {
    id: "cripto-app",
    title: "Cripto App",
    category: "Fintech & Web App",
    url: "https://cripto-app-sage.vercel.app",
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://cripto-app-sage.vercel.app/",
    image: image2,
    tags: ["React", "TypeScript", "Crypto API", "CSS Grid"],
    desafio:
      "Acompanhar cotações, variações de mercado e volumes de ativos em tempo real mantendo a interface leve e responsiva.",
    solucao:
      "Desenvolvi a aplicação em React + TypeScript consumindo endpoints otimizados com gerenciamento reativo de estado e tratamento de exceções.",
    resultado:
      "Plataforma de alta fluidez com renderização instantânea dos dados e experiência de usuário sem latência visual.",
  },
  {
    id: "cine-scope",
    title: "Cine Scope",
    category: "Entretenimento & Mídia",
    url: "https://cine-scope-beta-mauve.vercel.app",
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://cine-scope-beta-mauve.vercel.app/",
    image: image4,
    tags: ["React", "TypeScript", "Movie API", "Async Processing"],
    desafio:
      "Permitir navegação por catálogos extensos de filmes, busca rápida e exibição de detalhes sem sobrecarregar o consumo de dados.",
    solucao:
      "Implementei rotas desacopladas, busca dinâmica com debounce e lazy loading de imagens de alta resolução.",
    resultado:
      "Navegação contínua de conteúdos com tempo de resposta imediato para buscas e visualizações em qualquer dispositivo.",
  },
  {
    id: "codesite",
    title: "CodeSite Agency",
    category: "Plataforma Institucional",
    url: "https://code-site-br.vercel.app",
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://code-site-br.vercel.app/",
    image: image3,
    tags: ["JavaScript", "HTML5", "CSS3", "Interactive Canvas"],
    desafio:
      "Construir um portal corporativo impactante para atração de clientes com alta taxa de engajamento e animações inovadoras.",
    solucao:
      "Criei uma arquitetura limpa em Vanilla JS com Canvas interativo rastreando o cursor e seções modulares para serviços e portfólio.",
    resultado:
      "Identidade visual marcante com tempo de carregamento inferior a 1s e aumento na retenção de visitantes.",
  },
  {
    id: "mr-agency",
    title: "MR Agency",
    category: "Design System & Web Landing",
    url: "https://mr-agency-site.vercel.app",
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://mr-agency-site.vercel.app/",
    image: image1,
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    desafio:
      "Apresentar os serviços de uma agência digital com foco em elegância, responsividade total e transições fluidas.",
    solucao:
      "Estruturei um sistema de estilos em CSS3 com variáveis dinâmicas, tipografia brutalista e layout fluido adaptativo.",
    resultado:
      "Presença digital robusta que elevou a percepção de valor dos serviços oferecidos e facilitou a captura de leads.",
  },
  {
    id: "portfolio-dev",
    title: "Portfólio",
    category: "Desenvolvimento Web & UI",
    url: "https://portfolio-thomas-marinheiro.vercel.app",
    github: "https://github.com/Thomas-Marinheiro",
    demo: "#hero",
    image: image7,
    tags: ["React", "TypeScript", "Tailwind CSS", "Design System"],
    desafio:
      "Construir um portfólio moderno, responsivo e performático para apresentar projetos reais, habilidades técnicas e histórico acadêmico.",
    solucao:
      "Desenvolvi a aplicação em React + TypeScript com Tailwind CSS, focando em componentização limpa, responsividade mobile-first e interações fluidas.",
    resultado:
      "Interface intuitiva, extremamente rápida e organizada que destaca minha evolução técnica em Front-End.",
  },
  {
    id: "nextask",
    title: "NexTask",
    category: "EdTech & Dashboard",
    url: "https://nextask-sigma.vercel.app",
    github: "https://github.com/Thomas-Marinheiro",
    demo: "https://nextask-sigma.vercel.app/",
    image: image5,
    tags: ["React", "TypeScript", "Educational Tech", "State Management"],
    desafio:
      "Simplificar o acompanhamento pedagógico, a gestão de aulas e a organização de tarefas para alunos e docentes.",
    solucao:
      "Projetei um dashboard intuitivo em React e TypeScript com widgets modulares, calendário dinâmico e controle de progresso.",
    resultado:
      "Otimização da rotina pedagógica com redução do tempo gasto em processos administrativos.",
  },
];
