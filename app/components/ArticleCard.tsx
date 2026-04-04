"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "@/types/contentful";
import TagBadge from "./TagBade";

const MotionLink = motion.create(Link);

type Props = {
  article: Article;
  index?: number;
};

export default function ArticleCard({ article, index = 0 }: Props) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <MotionLink
      href={`/articles/${article.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="group flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-colors hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface)]/80 shadow-sm hover:shadow-md"
    >
      {article.tags.items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.items.map((tag) => (
            <TagBadge key={tag.slug} tag={tag} />
          ))}
        </div>
      )}

      <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
        {article.title}
      </h2>

      <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {article.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-[var(--color-text-muted)]">
        <span>{date}</span>
        <span>{article.readingTime} min read</span>
      </div>
    </MotionLink>
  );
}
