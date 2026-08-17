import { ExternalLink } from "lucide-react";

interface PreviewProps {
  image?: string;
  demo: string;
  title: string;
}

export function PreviewSiteProjeto({ image, demo, title }: PreviewProps) {
  if (!image) return null;

  return (
    <a
      href={demo}
      target={demo.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      aria-label={`Ver preview do ${title}`}
      className="group/preview relative block overflow-hidden rounded-lg border border-[#3F3F46] bg-[#18181B] mb-4"
    >
      <img
        src={image}
        alt={`Pré-visualização do projeto ${title}`}
        loading="lazy"
        className="h-36 sm:h-44 w-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-[#18181B]/60 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100">
        <span className="inline-flex items-center space-x-1.5 rounded bg-[#00F5A0] px-3 py-1.5 font-mono text-xs font-bold text-[#18181B]">
          <ExternalLink className="h-3 w-3" />
          <span>Ver preview</span>
        </span>
      </div>
    </a>
  );
}
