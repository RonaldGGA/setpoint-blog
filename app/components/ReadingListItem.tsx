"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Article } from "@/types/contentful";
import { Clock, ArrowRight } from "lucide-react";
import ReadingListButton from "./ReadingListButton";
import TagBadge from "./TagBadge";

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

  const accentColor = article.tags.items[0]?.color ?? "#F59E0B";

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className="group rounded-xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-primary/40"
      style={{ borderTopColor: accentColor }}
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {article.tags.items.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {article.tags.items.map((tag) => (
                <TagBadge key={tag.slug} tag={tag} />
              ))}
            </div>
          )}

          <Link href={`/articles/${article.slug}`} className="group/title">
            <h2 className="font-display text-lg font-semibold leading-snug text-text-primary transition-colors duration-200 group-hover/title:text-primary">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-muted">
                {article.excerpt}
              </p>
            )}
          </Link>

          <div className="flex items-center gap-3 text-xs text-text-muted">
            <span>{date}</span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <Clock size={10} strokeWidth={2} />
              {article.readingTime} min read
            </span>
            <ArrowRight
              size={12}
              className="ml-auto opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary"
            />
          </div>
        </div>

        <div className="shrink-0 pt-0.5">
          <ReadingListButton articleSlug={article.slug} />
        </div>
      </div>
    </motion.li>
  );
}
