import { useEffect, useRef } from "react";

export function FundoParticulas() {
  const referenciaCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = referenciaCanvas.current;
    if (!canvas) return;
    const contexto2D = canvas.getContext("2d");
    if (!contexto2D) return;

    let idQuadroAnimacao: number;
    let larguraTela = (canvas.width = window.innerWidth);
    let alturaTela = (canvas.height = window.innerHeight);

    const ajustarTamanhoTela = () => {
      if (!canvas) return;
      larguraTela = canvas.width = window.innerWidth;
      alturaTela = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", ajustarTamanhoTela);

    // Partículas/Nós anti-gravidade
    const quantidadeParticulas = Math.min(Math.floor(larguraTela / 25), 45);
    const particulas = Array.from({ length: quantidadeParticulas }, () => ({
      x: Math.random() * larguraTela,
      y: Math.random() * alturaTela,
      tamanho: Math.random() * 2 + 1,
      velocidadeY: -(Math.random() * 0.4 + 0.1), // Flutua para cima (anti-gravidade)
      velocidadeX: (Math.random() - 0.5) * 0.3,
      opacidade: Math.random() * 0.4 + 0.1,
      textoSimbolo: ["{ }", "</>", "01", "=>", "const", "fn"][Math.floor(Math.random() * 6)],
      ehSimboloGrafico: Math.random() > 0.6,
    }));

    // Movimento dinâmico com suporte ao cursor
    let posicaoCursorX = larguraTela / 2;
    let posicaoCursorY = alturaTela / 2;

    const rastrearMovimentoCursor = (e: MouseEvent) => {
      posicaoCursorX = e.clientX;
      posicaoCursorY = e.clientY;
    };

    window.addEventListener("mousemove", rastrearMovimentoCursor);

    const desenharQuadroAnimacao = () => {
      contexto2D.clearRect(0, 0, larguraTela, alturaTela);

      // Grade sutil de fundo
      contexto2D.strokeStyle = "rgba(63, 63, 70, 0.15)";
      contexto2D.lineWidth = 0.5;
      const tamanhoGrade = 60;

      for (let x = 0; x < larguraTela; x += tamanhoGrade) {
        contexto2D.beginPath();
        contexto2D.moveTo(x, 0);
        contexto2D.lineTo(x, alturaTela);
        contexto2D.stroke();
      }

      for (let y = 0; y < alturaTela; y += tamanhoGrade) {
        contexto2D.beginPath();
        contexto2D.moveTo(0, y);
        contexto2D.lineTo(larguraTela, y);
        contexto2D.stroke();
      }

      // Renderizar nós e símbolos flutuantes
      particulas.forEach((particula) => {
        // Atualiza posição (flutuação contínua)
        particula.y += particula.velocidadeY;
        particula.x += particula.velocidadeX;

        // Repulsão suave com o cursor do mouse (física de gravidade)
        const distanciaX = posicaoCursorX - particula.x;
        const distanciaY = posicaoCursorY - particula.y;
        const distanciaTotal = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
        
        if (distanciaTotal < 120) {
          const anguloRepulsao = Math.atan2(distanciaY, distanciaX);
          const forcaRepulsao = (120 - distanciaTotal) / 120;
          particula.x -= Math.cos(anguloRepulsao) * forcaRepulsao * 1.5;
          particula.y -= Math.sin(anguloRepulsao) * forcaRepulsao * 1.5;
        }

        // Loop das partículas quando saem da tela
        if (particula.y < -20) {
          particula.y = alturaTela + 20;
          particula.x = Math.random() * larguraTela;
        }
        if (particula.x < -20) particula.x = larguraTela + 20;
        if (particula.x > larguraTela + 20) particula.x = -20;

        if (particula.ehSimboloGrafico) {
          contexto2D.font = '11px "JetBrains Mono", monospace';
          contexto2D.fillStyle = `rgba(0, 245, 160, ${particula.opacidade * 0.8})`;
          contexto2D.fillText(particula.textoSimbolo, particula.x, particula.y);
        } else {
          contexto2D.beginPath();
          contexto2D.arc(particula.x, particula.y, particula.tamanho, 0, Math.PI * 2);
          contexto2D.fillStyle = `rgba(0, 245, 160, ${particula.opacidade})`;
          contexto2D.fill();
        }
      });

      // Linhas de conexão entre nós próximos
      for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
          const distanciaX = particulas[i].x - particulas[j].x;
          const distanciaY = particulas[i].y - particulas[j].y;
          const distanciaTotal = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

          if (distanciaTotal < 90) {
            const opacidadeConexao = (1 - distanciaTotal / 90) * 0.12;
            contexto2D.beginPath();
            contexto2D.moveTo(particulas[i].x, particulas[i].y);
            contexto2D.lineTo(particulas[j].x, particulas[j].y);
            contexto2D.strokeStyle = `rgba(0, 245, 160, ${opacidadeConexao})`;
            contexto2D.lineWidth = 0.6;
            contexto2D.stroke();
          }
        }
      }

      idQuadroAnimacao = requestAnimationFrame(desenharQuadroAnimacao);
    };

    desenharQuadroAnimacao();

    return () => {
      window.removeEventListener("resize", ajustarTamanhoTela);
      window.removeEventListener("mousemove", rastrearMovimentoCursor);
      cancelAnimationFrame(idQuadroAnimacao);
    };
  }, []);

  return (
    <canvas
      ref={referenciaCanvas}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
