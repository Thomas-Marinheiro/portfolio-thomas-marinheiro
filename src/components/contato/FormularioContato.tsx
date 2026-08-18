import React, { useRef } from "react";
import { Send, CheckCircle2, XCircle } from "lucide-react";
import { useEnvioEmail } from "../../hooks/useEnvioEmail";
import { CartaoInterativo } from "../ui/CartaoInterativo";

export function FormularioContato() {
  const formRef = useRef<HTMLFormElement>(null);
  const { status, enviarFormulario } = useEnvioEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    enviarFormulario(formRef.current);
  };

  return (
    <CartaoInterativo intensity={6} className="bg-[#27272A] border-[#3F3F46]">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="user_name" className="block font-mono text-xs text-[#94A3B8] mb-1.5 uppercase tracking-wider">
            Seu Nome *
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            required
            placeholder="Ex: Ana Silva"
            className="w-full rounded-lg border border-[#3F3F46] bg-[#18181B] px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#F8FAFC] placeholder-[#52525B] focus:border-[#00F5A0] focus:outline-none font-sans transition-colors"
          />
        </div>

        <div>
          <label htmlFor="user_email" className="block font-mono text-xs text-[#94A3B8] mb-1.5 uppercase tracking-wider">
            Seu Email *
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            required
            placeholder="Ex: ana@empresa.com"
            className="w-full rounded-lg border border-[#3F3F46] bg-[#18181B] px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#F8FAFC] placeholder-[#52525B] focus:border-[#00F5A0] focus:outline-none font-sans transition-colors"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-mono text-xs text-[#94A3B8] mb-1.5 uppercase tracking-wider">
            Sua Mensagem / Detalhes do Projeto *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Descreva a ideia, objetivo ou escopo da mensagem..."
            className="w-full rounded-lg border border-[#3F3F46] bg-[#18181B] px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#F8FAFC] placeholder-[#52525B] focus:border-[#00F5A0] focus:outline-none font-sans transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full inline-flex items-center justify-center rounded-lg bg-[#00F5A0] px-5 py-3 font-mono text-xs sm:text-sm font-bold text-[#18181B] transition-all duration-300 hover:bg-[#00F5A0]/90 hover:shadow-[0_0_20px_rgba(0,245,160,0.35)] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {status === "sending" ? (
            <span className="flex items-center space-x-2">
              <span className="h-4 w-4 rounded-full border-2 border-[#18181B] border-t-transparent animate-spin" />
              <span>Enviando Mensagem...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <span>Enviar Mensagem</span>
              <Send className="h-4 w-4" />
            </span>
          )}
        </button>

        {status === "success" && (
          <div className="flex items-center justify-center space-x-2 rounded-lg bg-[#00F5A0]/10 border border-[#00F5A0]/30 p-3.5 font-mono text-xs text-[#00F5A0]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Mensagem enviada com sucesso! Responderei em breve.</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center justify-center space-x-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3.5 font-mono text-xs text-red-400">
            <XCircle className="h-4 w-4 shrink-0" />
            <span>Erro ao enviar mensagem. Por favor, tente enviar por e-mail direto.</span>
          </div>
        )}
      </form>
    </CartaoInterativo>
  );
}
