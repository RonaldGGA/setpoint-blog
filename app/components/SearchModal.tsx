"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { searchArticles } from "@/lib/actions/search";
import { Article } from "@/types/contentful";
import TagBadge from "./TagBade";

type Props = {
  open: boolean;
  onClose: () => void;
};

function SearchModalContent({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onClose]);

  const handleSearch = () => {
    if (!query.trim()) return;
    startTransition(async () => {
      const res = await searchArticles(query);
      setResults(res);
      setSearched(true);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative flex justify-center px-4 pt-24">
        <div
          ref={modalRef}
          className="w-full max-w-xl rounded-2xl border border-border bg-surface shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search size={16} className="shrink-0 text-text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  setSearched(false);
                }}
                className="text-text-muted transition-colors hover:text-text-primary"
              >
                <X size={14} />
              </button>
            )}
            <button
              onClick={handleSearch}
              disabled={!query.trim() || isPending}
              className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-40"
            >
              {isPending ? "Searching..." : "Search"}
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {!searched && !isPending && (
              <div className="flex items-center justify-center gap-2 py-10 text-sm text-text-muted">
                <Search size={14} />
                Type and press Enter or Search
              </div>
            )}

            {searched && results.length === 0 && (
              <div className="py-10 text-center text-sm text-text-muted">
                No articles found for{" "}
                <span className="text-text-primary">&quot;{query}&quot;</span>
              </div>
            )}

            {results.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                onClick={onClose}
                className="group flex flex-col gap-1.5 border-b border-border/50 px-4 py-4 transition-colors last:border-0 hover:bg-border/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium text-text-primary transition-colors group-hover:text-primary">
                    {article.title}
                  </span>
                  <ArrowRight
                    size={14}
                    className="mt-0.5 shrink-0 text-text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </div>
                {article.excerpt && (
                  <p className="line-clamp-1 text-xs text-text-muted">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  {article.tags.items.slice(0, 2).map((tag) => (
                    <TagBadge key={tag.slug} tag={tag} />
                  ))}
                  <span className="ml-auto flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={10} />
                    {article.readingTime} min
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const changeIsMounted = () => {
      setMounted(true);
    };
    changeIsMounted();
  }, []);

  if (!open || !mounted) return null;

  return createPortal(<SearchModalContent onClose={onClose} />, document.body);
}
