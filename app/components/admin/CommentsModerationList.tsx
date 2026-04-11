"use client";

import { useState, useTransition } from "react";
import { getPendingCommentsPaginated } from "@/lib/actions/comments";
import { PendingComment } from "@/types/comments";
import CommentModerationCard from "./CommentModerationCard";
import { Loader2 } from "lucide-react";

type Props = {
  initialComments: PendingComment[];
  initialNextCursor: string | null;
};

export default function CommentsModerationList({
  initialComments,
  initialNextCursor,
}: Props) {
  const [comments, setComments] = useState(initialComments);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    if (!nextCursor) return;
    startTransition(async () => {
      const { comments: newComments, nextCursor: newCursor } =
        await getPendingCommentsPaginated(nextCursor);
      setComments((prev) => [...prev, ...newComments]);
      setNextCursor(newCursor);
    });
  };

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentModerationCard key={comment.id} comment={comment} />
      ))}

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
            "Load more comments"
          )}
        </button>
      )}
    </div>
  );
}
