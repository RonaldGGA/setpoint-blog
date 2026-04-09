// components/CommentSection.tsx
import { getApprovedComments } from "@/lib/actions/comments";
import CommentForm from "./CommentForm";
import { MessageSquare } from "lucide-react";
import CommentItem from "./CommentItem";

type Props = {
  articleSlug: string;
};

export default async function CommentSection({ articleSlug }: Props) {
  const comments = await getApprovedComments(articleSlug);

  return (
    <section className="mt-20 border-t border-[var(--color-border)] pt-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
          <MessageSquare size={14} className="text-[var(--color-primary)]" />
        </div>
        <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
          Discussion
        </h2>
        {comments.length > 0 && (
          <span className="font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-2.5 py-0.5">
            {comments.length}
          </span>
        )}
      </div>

      <div className="mb-12">
        <CommentForm articleSlug={articleSlug} />
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-[var(--color-text-muted)] text-center py-8">
          No comments yet. Be the first.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-[var(--color-border)]">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              articleSlug={articleSlug}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
