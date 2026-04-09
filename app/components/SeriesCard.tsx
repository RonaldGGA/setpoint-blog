import Link from "next/link";
import { SeriesWithCount } from "@/types/contentful";
import { BookMarked, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function SeriesCard({
  series,
  index,
}: {
  series: SeriesWithCount;
  index: number;
}) {
  const articleCount = series.linkedFrom.articleCollection.total;

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative flex flex-col rounded-xl border border-[var(--color-border)]
                 bg-[var(--color-surface)] overflow-hidden transition-all duration-300
                 hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5
                 shadow-sm hover:shadow-lg hover:shadow-black/20"
      style={{
        animation: "fadeInUp 0.4s ease-out both",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {series.coverImage ? (
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src={series.coverImage.url}
            alt={series.coverImage.description ?? series.title}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
        </div>
      ) : (
        <div className="flex h-36 w-full items-center justify-center bg-[var(--color-border)]/30">
          <BookMarked size={32} className="text-[var(--color-border)]" />
        </div>
      )}

      <div className="flex flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2
            className="font-display text-lg font-semibold leading-snug
                         text-[var(--color-text-primary)] transition-colors duration-200
                         group-hover:text-[var(--color-primary)]"
          >
            {series.title}
          </h2>
          <ChevronRight
            size={16}
            className="shrink-0 mt-1 text-[var(--color-text-muted)] transition-transform
                       duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]"
          />
        </div>

        {series.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {series.description}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-[var(--color-border)] flex items-center gap-1.5">
          <BookMarked size={12} className="text-[var(--color-primary)]" />
          <span className="font-mono text-xs text-[var(--color-text-muted)]">
            {articleCount} article{articleCount === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </Link>
  );
}
