"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Article } from "@/types/contentful";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: Article[];
};

export default function ArticlesList({ articles }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.tags.items.some((t) => t.name.toLowerCase().includes(q))
    );
  }, [query, articles]);

  return (
    <>
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 focus-within:border-primary/50 transition-colors">
        <Search size={16} className="shrink-0 text-text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by title, excerpt or tag..."
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-text-muted transition-colors hover:text-text-primary"
          >
            <X size={14} />
          </button>
        )}
        {query && (
          <span className="text-xs text-text-muted">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24">
          <p className="text-sm text-text-muted">
            No articles match{" "}
            <span className="text-text-primary">&quot;{query}&quot;</span>
          </p>
          <button
            onClick={() => setQuery("")}
            className="text-xs text-primary underline underline-offset-2"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
