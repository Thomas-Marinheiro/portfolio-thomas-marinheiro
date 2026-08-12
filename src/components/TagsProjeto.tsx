interface TagsProps {
  tags: string[];
}

export function TagsProjeto({ tags }: TagsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#3F3F46]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-[#3F3F46] bg-[#18181B] px-2 py-0.5 font-mono text-[11px] text-[#00F5A0] transition-colors hover:border-[#00F5A0]/50"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
