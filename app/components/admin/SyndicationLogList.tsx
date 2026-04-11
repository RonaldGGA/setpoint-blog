"use client";

import { useState, useTransition } from "react";
import { getSyndicationLogsPaginated } from "@/lib/actions/syndication";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Log = {
  id: string;
  articleSlug: string;
  platform: string;
  status: string;
  externalUrl: string | null;
  createdAt: Date;
};

type Props = {
  initialLogs: Log[];
  initialNextCursor: string | null;
};

export default function SyndicationLogList({
  initialLogs,
  initialNextCursor,
}: Props) {
  const [logs, setLogs] = useState(initialLogs);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    if (!nextCursor) return;
    startTransition(async () => {
      const { logs: newLogs, nextCursor: newCursor } =
        await getSyndicationLogsPaginated(nextCursor);
      setLogs((prev) => [...prev, ...newLogs]);
      setNextCursor(newCursor);
    });
  };

  if (logs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-text-muted">
        No activity yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="divide-y divide-border rounded-xl border border-border bg-surface">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between px-4 py-3 text-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  log.status === "SUCCESS"
                    ? "bg-secondary"
                    : log.status === "FAILED"
                      ? "bg-red-500"
                      : "bg-text-muted"
                }`}
              />
              <span className="font-mono text-xs text-text-muted">
                {log.articleSlug}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              {log.externalUrl && (
                <Link
                  href={log.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline underline-offset-2"
                >
                  View on Hashnode
                </Link>
              )}
              <span className="capitalize">{log.status.toLowerCase()}</span>
              <span>
                {new Date(log.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {nextCursor && (
        <button
          onClick={loadMore}
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-4 text-sm text-text-muted transition-colors hover:border-border/80 hover:text-text-primary disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Loading...
            </>
          ) : (
            "Load more"
          )}
        </button>
      )}
    </div>
  );
}
