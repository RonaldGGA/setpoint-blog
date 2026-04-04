import { Tag } from "@/types/contentful";

type Props = {
  tag: Tag;
};

export default function TagBadge({ tag }: Props) {
  const color = tag.color ?? "var(--color-secondary)";

  return (
    <span
      className="rounded-md px-2 py-0.5 text-xs font-medium"
      style={{
        color,
        backgroundColor: `${color}18`,
      }}
    >
      {tag.name}
    </span>
  );
}
