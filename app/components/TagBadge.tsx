import Link from "next/link";
import { Tag } from "@/types/contentful";

type Props = {
  tag: Tag;
};

export default function TagBadge({ tag }: Props) {
  const color = tag.color ?? "var(--color-secondary)";

  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="rounded-md px-2 py-0.5 text-xs font-medium transition-opacity hover:opacity-75"
      style={{
        color,
        backgroundColor: `${color}18`,
      }}
    >
      {tag.name}
    </Link>
  );
}
