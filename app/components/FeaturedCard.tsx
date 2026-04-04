"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Article } from "@/types/contentful";
import { ArrowRight } from "lucide-react";
import TagBadge from "./TagBade";

type Props = {
  article: Article;
};

export default function FeaturedCard({ article }: Props) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
      className="mb-12"
    >
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all hover:border-[var(--color-primary)]/40 lg:grid-cols-2"
      >
        <div className="flex flex-col justify-between p-8 lg:p-10">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                Featured
              </span>
            </div>

            {article.tags.items.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {article.tags.items.map((tag) => (
                  <TagBadge key={tag.slug} tag={tag} />
                ))}
              </div>
            )}

            <h2 className="font-display text-2xl font-bold leading-tight text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)] sm:text-3xl">
              {article.title}
            </h2>

            <p className="mt-3 leading-relaxed text-[var(--color-text-muted)]">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
              <span>{date}</span>
              <span className="text-[var(--color-border)]">·</span>
              <span>{article.readingTime} min read</span>
            </div>

            <span className="ml-2 flex items-center gap-1 font-medium text-[var(--color-primary)] transition-transform group-hover:translate-x-1">
              Read <ArrowRight size={15} />
            </span>
          </div>
        </div>

        {article.coverImage ? (
          <div className="relative min-h-56 w-full overflow-hidden lg:min-h-full">
            <Image
              src={article.coverImage.url}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="relative min-h-56 overflow-hidden bg-[var(--color-background)] lg:min-h-full">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, var(--color-primary) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl font-bold text-[var(--color-primary)] opacity-20">
                SP
              </span>
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
