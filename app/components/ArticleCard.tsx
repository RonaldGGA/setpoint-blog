"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "@/types/contentful";
import TagBadge from "./TagBade";
import ReadingListButton from "./ReadingListButton";
import { Clock } from "lucide-react";

type Props = {
  article: Article;
  index?: number;
  initialSaved?: boolean;
};

export default function ArticleCard({
  article,
  index = 0,
  initialSaved,
}: Props) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const accentColor = article.tags.items[0]?.color ?? "#F59E0B";

  return (
    <motion.div
      className="group relative flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:shadow-black/20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${accentColor}14, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor} 50%, transparent 100%)`,
        }}
      />

      <Link
        href={`/articles/${article.slug}`}
        className="flex flex-col gap-3 p-6 pb-16"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.items.map((tag) => (
              <TagBadge key={tag.slug} tag={tag} />
            ))}
          </div>
          <span className="font-mono text-[10px] tabular-nums select-none text-[var(--color-text-muted)] opacity-30 group-hover:opacity-60 transition-opacity duration-300 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h2 className="font-display text-lg font-semibold leading-snug text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[var(--color-primary)]">
          {article.title}
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2.5 text-xs text-[var(--color-text-muted)] mt-auto">
          <span className="font-mono">{date}</span>
          <span className="w-px h-3 bg-[var(--color-border)]" aria-hidden />
          <span className="flex items-center gap-1 font-mono">
            <Clock size={10} strokeWidth={2} />
            {article.readingTime} min
          </span>
        </div>
      </Link>

      <div className="absolute bottom-5 right-5">
        <ReadingListButton
          articleSlug={article.slug}
          initialSaved={initialSaved}
        />
      </div>
    </motion.div>
  );
}
