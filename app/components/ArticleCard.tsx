import Link from "next/link";
import { Article } from "@/types/contentful";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface)]/80"
    >
      {/* Tags */}
      {article.tags.items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.items.map((tag) => (
            <span
              key={tag.slug}
              className="rounded-md px-2 py-0.5 text-xs font-medium"
              style={{
                color: tag.color ?? "var(--color-secondary)",
                backgroundColor: `${tag.color ?? "var(--color-secondary)"}18`,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
        {article.title}
      </h2>

      {/* Excerpt */}
      <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {article.excerpt}
      </p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-[var(--color-text-muted)]">
        <span>{date}</span>
        <span>{article.readingTime} min read</span>
      </div>
    </Link>
  );
}
