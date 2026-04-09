import CommentModerationCard from "@/app/components/admin/CommentModerationCard";
import { getPendingComments } from "@/lib/actions/comments";
import { MessageSquare } from "lucide-react";

export default async function AdminCommentsPage() {
  const comments = await getPendingComments();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-[var(--color-primary)]" />
            <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Comment Moderation
            </h1>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {comments.length === 0
              ? "No pending comments"
              : `${comments.length} comment${comments.length === 1 ? "" : "s"} waiting for review`}
          </p>
        </div>

        {comments.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 gap-3
                          rounded-xl border border-dashed border-[var(--color-border)]"
          >
            <MessageSquare size={32} className="text-[var(--color-border)]" />
            <p className="text-sm text-[var(--color-text-muted)]">
              All caught up — nothing to review
            </p>
          </div>
        )}

        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentModerationCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
