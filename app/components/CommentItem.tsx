// components/CommentItem.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import CommentForm from "./CommentForm";
import { Reply } from "lucide-react";
import { CommentWithAuthor } from "@/types/comments";

type Props = {
  comment: CommentWithAuthor;
  articleSlug: string;
  isReply?: boolean;
};

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function CommentItem({
  comment,
  articleSlug,
  isReply = false,
}: Props) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const date = new Date(comment.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className={`flex flex-col gap-4 py-6 ${isReply ? "pl-10" : ""}`}>
      <div className="flex gap-3">
        <div className="shrink-0">
          {comment.author.image ? (
            <Image
              src={comment.author.image}
              alt={comment.author.name ?? "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30">
              <span className="font-mono text-[10px] font-bold text-[var(--color-primary)]">
                {getInitials(comment.author.name)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              {comment.author.name ?? "Anonymous"}
            </span>
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {date}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-[var(--color-text-muted)] whitespace-pre-wrap break-words">
            {comment.content}
          </p>

          {!isReply && (
            <button
              onClick={() => setShowReplyForm((v) => !v)}
              className="flex items-center gap-1.5 self-start mt-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              <Reply size={12} />
              {showReplyForm ? "Cancel" : "Reply"}
            </button>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div className="pl-11">
          <CommentForm
            articleSlug={articleSlug}
            parentId={comment.id}
            onSuccess={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <ul className="flex flex-col border-l border-[var(--color-border)] ml-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              articleSlug={articleSlug}
              isReply={true}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
