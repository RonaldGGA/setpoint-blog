import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/contentful";
import { ArrowRight } from "lucide-react";
import TagBadge from "./TagBadge";
import { contentfulImageLoader } from "@/lib/utils";

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
    <div className="mb-14">
      <div className="group relative overflow-hidden rounded-2xl border border-border transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-[0_0_60px_-15px_#f59e0b35]">
        <div className="relative min-h-75 sm:min-h-90 lg:min-h-105">
          {article.coverImage ? (
            <Image
              src={contentfulImageLoader({
                src: article.coverImage.url,
                width: 860,
              })}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 860px"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-surface">
              <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-secondary/8" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-background via-background/85 to-background/20" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
            <div className="max-w-2xl">
              <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4 sm:gap-3">
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

              <Link href={`/articles/${article.slug}`} className="group/title">
                <h2 className="font-display text-2xl font-bold leading-tight text-text-primary transition-colors duration-200 group-hover/title:text-primary sm:text-3xl lg:text-4xl">
                  {article.title}
                </h2>
              </Link>

              <p className="mt-2 hidden max-w-xl leading-relaxed text-text-muted sm:mt-3 sm:block">
                {article.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4 text-sm sm:mt-6 sm:pt-5">
                <div className="flex items-center gap-2 text-text-muted sm:gap-3">
                  <span>{date}</span>
                  <span className="text-border">·</span>
                  <span>{article.readingTime} min read</span>
                </div>
                <Link
                  href={`/articles/${article.slug}`}
                  className="relative z-10 flex items-center gap-1.5 font-medium text-primary"
                >
                  Read
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
