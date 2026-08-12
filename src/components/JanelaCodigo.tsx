import React from "react";
import { Terminal } from "lucide-react";

interface CodeMockupProps {
  filename?: string;
  codeLines: { line: number; text: React.ReactNode }[];
  className?: string;
}

export function JanelaCodigo({
  filename = "thomas.config.ts",
  codeLines,
  className = "",
}: CodeMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#3F3F46] bg-[#1E1E22] font-mono text-xs sm:text-sm shadow-2xl ${className}`}
    >
      {/* Barra de título estilo macOS VS Code */}
      <div className="flex items-center justify-between border-b border-[#27272A] bg-[#18181B] px-3 sm:px-4 py-2.5 sm:py-3 select-none">
        <div className="flex items-center space-x-2">
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56]" />
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E]" />
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-[#27272A] px-2.5 py-1 text-[11px] sm:text-xs text-[#94A3B8] border border-[#3F3F46]/50">
          <Terminal className="h-3 w-3 text-[#00F5A0]" />
          <span className="truncate max-w-[140px] sm:max-w-none">{filename}</span>
        </div>
        <div className="text-[11px] sm:text-xs text-[#52525B]">TypeScript</div>
      </div>

      {/* Corpo do Código com números de linha responsivos */}
      <div className="p-3 sm:p-4 overflow-x-auto text-[#F8FAFC]">
        <table className="w-full border-collapse">
          <tbody>
            {codeLines.map(({ line, text }) => (
              <tr key={line} className="hover:bg-[#27272A]/50 transition-colors">
                <td className="w-6 sm:w-8 pr-2 sm:pr-4 text-right text-[10px] sm:text-xs text-[#52525B] select-none align-top pt-0.5">
                  {line}
                </td>
                <td className="font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed whitespace-pre font-normal">
                  {text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
