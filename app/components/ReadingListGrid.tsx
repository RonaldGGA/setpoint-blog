"use client";

import { useState, useTransition } from "react";
import { Article } from "@/types/contentful";
import { getReadingListSlugsPaginated } from "@/lib/actions/reading-list";
import ReadingListItem from "./ReadingListItem";
import { Loader2 } from "lucide-react";
import { getArticlesBySlugs } from "@/lib/actions/articles";

type Props = {
  initialArticles: Article[];
  initialNextCursor: string | null;
};

export default function ReadingListGrid({
  initialArticles,
  initialNextCursor,
}: Props) {
  const [articles, setArticles] = useState(initialArticles);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    if (!nextCursor) return;
    startTransition(async () => {
      const { slugs, nextCursor: newCursor } =
        await getReadingListSlugsPaginated(nextCursor);
      const newArticles = await getArticlesBySlugs(slugs);
      setArticles((prev) => [...prev, ...newArticles]);
      setNextCursor(newCursor);
    });
  };

  return (
    <div className="space-y-4">
      <ul className="grid gap-4 sm:grid-cols-2">
        {articles.map((article, index) => (
          <ReadingListItem key={article.slug} article={article} index={index} />
        ))}
      </ul>

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
