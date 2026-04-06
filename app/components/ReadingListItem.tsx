"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "@/types/contentful";
import { Clock, ArrowUpRight } from "lucide-react";
import ReadingListButton from "./ReadingListButton";
import TagBadge from "./TagBade";

interface Props {
  article: Article;
  index?: number;
}

export default function ReadingListItem({ article, index = 0 }: Props) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className="group relative flex flex-col gap-3 py-6 first:pt-0"
    >
      {/* Accent line on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="pl-4">
        {/* Tags row */}
        {article.tags.items.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.items.map((tag) => (
              <TagBadge key={tag.slug} tag={tag} />
            ))}
          </div>
        )}

        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/articles/${article.slug}`}
            className="group/title flex-1"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--color-text-primary)] group-hover/title:text-[var(--color-primary)] transition-colors leading-snug">
              {article.title}
              <ArrowUpRight
                size={14}
                className="inline-block ml-1 opacity-0 group-hover/title:opacity-100 transition-opacity -translate-y-0.5"
              />
            </h2>
          </Link>

          {/* Remove button */}
          <ReadingListButton articleSlug={article.slug} initialSaved={true} />
        </div>

        {/* Excerpt */}
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-3 text-xs text-[var(--color-text-muted)]">
          <span>{date}</span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {article.readingTime} min read
          </span>
        </div>
      </div>
    </motion.li>
  );
}
