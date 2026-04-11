"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "@/types/contentful";
import TagBadge from "./TagBade";
import ReadingListButton from "./ReadingListButton";
import { Clock, ArrowRight } from "lucide-react";

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      className="group relative flex flex-col rounded-xl border border-border bg-surface overflow-hidden transition-[border-color,box-shadow] duration-300 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)]"
      style={{ borderTopColor: accentColor }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}10, transparent 70%)`,
        }}
      />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.items.map((tag) => (
              <TagBadge key={tag.slug} tag={tag} />
            ))}
          </div>
          <ReadingListButton
            articleSlug={article.slug}
            initialSaved={initialSaved}
          />
        </div>

        <Link
          href={`/articles/${article.slug}`}
          className="flex flex-col flex-1 gap-3"
        >
          <h2 className="font-display text-base font-semibold leading-snug text-text-primary transition-colors duration-200 group-hover:text-primary">
            {article.title}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-text-muted flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            <div className="flex items-center gap-2.5 text-xs text-text-muted">
              <span>{date}</span>
              <span className="w-px h-3 bg-border" aria-hidden />
              <span className="flex items-center gap-1">
                <Clock size={10} strokeWidth={2} />
                {article.readingTime} min
              </span>
            </div>
            <ArrowRight
              size={13}
              className="text-text-muted transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
