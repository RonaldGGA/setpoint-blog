"use client";

import { useState } from "react";
import { toggleSyndication } from "@/lib/actions/syndication";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = {
  articleSlug: string;
  articleTitle: string;
  initialEnabled: boolean;
};

export default function SyndicationRow({
  articleSlug,
  articleTitle,
  initialEnabled,
}: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const next = !enabled;
    setEnabled(next); // optimistic update
    const result = await toggleSyndication(articleSlug, next);
    if (!result.success) {
      setEnabled(!next); // revert si falla
    }
    setLoading(false);
  }

  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-lg
                    border border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      {/* Article info */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${
            enabled ? "bg-emerald-500" : "bg-[var(--color-border)]"
          }`}
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
            {articleTitle}
          </p>
          <Link
            href={`/articles/${articleSlug}`}
            target="_blank"
            className="flex items-center gap-1 text-xs font-mono text-[var(--color-text-muted)]
                       hover:text-[var(--color-secondary)] transition-colors duration-200"
          >
            /articles/{articleSlug}
            <ExternalLink size={10} />
          </Link>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`relative w-10 h-5.5 rounded-full transition-colors duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed shrink-0
                    ${enabled ? "bg-emerald-500" : "bg-[var(--color-border)]"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white
                      shadow-sm transition-transform duration-300
                      ${enabled ? "translate-x-[18px]" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
