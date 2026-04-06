"use client";

import { useState } from "react";
import { createComment } from "@/lib/actions/comments";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";

type Props = {
  articleSlug: string;
  parentId?: string;
  onSuccess?: () => void;
};

export default function CommentForm({
  articleSlug,
  parentId,
  onSuccess,
}: Props) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isReply = Boolean(parentId);
  const maxChars = 2000;
  const remaining = maxChars - content.length;
  const isOverLimit = remaining < 0;

  async function handleSubmit() {
    if (!content.trim() || isOverLimit || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    const result = await createComment({ articleSlug, content, parentId });

    if (result.success) {
      setContent("");
      setStatus("success");
      onSuccess?.();
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Sign in to join the discussion.
        </p>
        <Link
          href="/login"
          className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
        >
          Sign in →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={isReply ? "Write a reply..." : "Write a comment..."}
          rows={isReply ? 3 : 4}
          disabled={status === "loading" || status === "success"}
          className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-colors duration-200 focus:border-[var(--color-primary)]/60 focus:ring-1 focus:ring-[var(--color-primary)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`font-mono text-xs tabular-nums transition-colors ${
            isOverLimit
              ? "text-red-400"
              : remaining < 100
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text-muted)] opacity-50"
          }`}
        >
          {remaining}
        </span>

        <div className="flex items-center gap-3">
          {status === "error" && (
            <p className="text-xs text-red-400">{errorMsg}</p>
          )}

          {status === "success" && (
            <p className="text-xs text-[var(--color-primary)]">
              ✓ Submitted — pending review
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={
              !content.trim() ||
              isOverLimit ||
              status === "loading" ||
              status === "success"
            }
            className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold text-[#08090E] transition-all hover:bg-[var(--color-primary-hover)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
          >
            {status === "loading" ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Send size={12} />
            )}
            {isReply ? "Reply" : "Comment"}
          </button>
        </div>
      </div>
    </div>
  );
}
