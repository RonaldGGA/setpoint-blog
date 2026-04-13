"use client";

import { useState } from "react";
import { toggleSyndication } from "@/lib/actions/syndication";

type Props = {
  setting: {
    articleSlug: string;
    title: string;
    enabled: boolean;
    updatedAt: Date | null;
  };
};

export default function SyndicationRow({ setting }: Props) {
  const [enabled, setEnabled] = useState(setting.enabled);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const res = await toggleSyndication(setting.articleSlug, !enabled);
    if (res.success) setEnabled((prev) => !prev);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="font-mono text-sm text-text-muted">
        {setting.articleSlug}
      </span>
      <div className="flex items-center gap-4">
        <span className="text-xs text-text-muted">
          {setting.updatedAt
            ? new Date(setting.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "—"}
        </span>
        <button
          onClick={handleToggle}
          disabled={loading}
          aria-label={`${enabled ? "Disable" : "Enable"} syndication for ${setting.articleSlug}`}
          className={`relative h-5 w-9 rounded-full p-0 transition-colors duration-200 disabled:opacity-50 ${
            enabled ? "bg-primary" : "bg-border"
          }`}
        >
          <span
            className="absolute top-0.5 h-4 w-4 rounded-full bg-background shadow transition-all duration-200"
            style={{ left: enabled ? "18px" : "2px" }}
          />
        </button>
      </div>
    </div>
  );
}
