"use client";

import { useState } from "react";
import { moderateComment } from "@/lib/actions/comments";
import { PendingComment } from "@/types/comments";
import { CheckCircle, XCircle, Clock, User } from "lucide-react";

export default function CommentModerationCard({
  comment,
}: {
  comment: PendingComment;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "approved" | "rejected"
  >("idle");

  async function handleModerate(action: "APPROVED" | "REJECTED") {
    setStatus("loading");
    const result = await moderateComment(comment.id, action);
    if (result.success) {
      setStatus(action === "APPROVED" ? "approved" : "rejected");
    } else {
      setStatus("idle");
      console.error(result.error);
    }
  }

  if (status === "approved" || status === "rejected") {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] opacity-50">
        {status === "approved" ? (
          <CheckCircle size={16} className="text-emerald-500 shrink-0" />
        ) : (
          <XCircle size={16} className="text-red-500 shrink-0" />
        )}
        <span className="text-sm text-[var(--color-text-muted)]">
          {status === "approved" ? "Approved" : "Rejected"} —{" "}
          <span className="font-mono text-xs">{comment.articleSlug}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          {comment.author.image ? (
            <img
              src={comment.author.image}
              alt={comment.author.name ?? "User"}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[var(--color-border)] flex items-center justify-center">
              <User size={14} className="text-[var(--color-text-muted)]" />
            </div>
          )}
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            {comment.author.name ?? "Anonymous"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
          <Clock size={12} />
          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="px-4 pt-3">
        <span className="inline-block font-mono text-xs px-2 py-0.5 rounded-md bg-[var(--color-border)] text-[var(--color-secondary)]">
          /articles/{comment.articleSlug}
        </span>
      </div>

      <p className="px-4 py-3 text-sm text-[var(--color-text-primary)] leading-relaxed">
        {comment.content}
      </p>

      <div className="flex gap-2 px-4 pb-4">
        <button
          onClick={() => handleModerate("APPROVED")}
          disabled={status === "loading"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                     bg-emerald-500/10 text-emerald-500 border border-emerald-500/20
                     hover:bg-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle size={14} />
          Approve
        </button>

        <button
          onClick={() => handleModerate("REJECTED")}
          disabled={status === "loading"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                     bg-red-500/10 text-red-500 border border-red-500/20
                     hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <XCircle size={14} />
          Reject
        </button>
      </div>
    </div>
  );
}
