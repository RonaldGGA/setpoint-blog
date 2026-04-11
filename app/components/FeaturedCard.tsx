"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Article } from "@/types/contentful";
import { ArrowRight } from "lucide-react";
import TagBadge from "./TagBadge";

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
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.36 }}
      className="mb-14"
    >
      <div className="group relative min-h-95 overflow-hidden rounded-2xl border border-border transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_60px_-15px_#f59e0b35]">
        {article.coverImage ? (
          <Image
            src={article.coverImage.url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 860px"
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 bg-surface">
            <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-secondary/8" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/85 to-background/20" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Featured
              </span>
              {article.tags.items.length > 0 && (
                <>
                  <span className="text-border">·</span>
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {article.tags.items.map((tag) => (
                      <TagBadge
                        key={tag.slug}
                        tag={tag}
                        className="border border-current/30 bg-black/30 backdrop-blur-sm"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href={`/articles/${article.slug}`}>
              <h2 className="relative font-display text-3xl font-bold leading-tight text-text-primary transition-colors duration-200 group-hover:text-primary sm:text-4xl after:absolute after:inset-0 after:-m-8 after:content-['']">
                {article.title}
              </h2>
            </Link>

            <p className="mt-3 max-w-xl leading-relaxed text-text-muted">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5 text-sm">
              <div className="flex items-center gap-3 text-text-muted">
                <span>{date}</span>
                <span className="text-border">·</span>
                <span>{article.readingTime} min read</span>
              </div>
              <Link
                href={`/articles/${article.slug}`}
                className="relative z-10 flex items-center gap-1.5 font-medium text-primary"
              >
                Read article
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
