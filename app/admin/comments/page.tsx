import { getPendingCommentsPaginated } from "@/lib/actions/comments";
import { MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import CommentsModerationList from "@/app/components/admin/CommentsModerationList";

export default async function AdminCommentsPage() {
  const [{ comments, nextCursor }, totalPending] = await Promise.all([
    getPendingCommentsPaginated(),
    prisma.comment.count({ where: { status: "PENDING" } }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Comments
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            {totalPending === 0
              ? "No pending comments."
              : `${totalPending} comment${totalPending === 1 ? "" : "s"} waiting for review.`}
          </p>
        </div>
        {totalPending > 0 && (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {totalPending} pending
          </span>
        )}
      </div>

      {totalPending === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24">
          <MessageSquare size={24} className="text-border" />
          <p className="text-sm text-text-muted">All caught up.</p>
        </div>
      ) : (
        <CommentsModerationList
          initialComments={comments}
          initialNextCursor={nextCursor}
        />
      )}
    </div>
  );
}
