import { getReadingListSlugsPaginated } from "@/lib/actions/reading-list";
import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLES_BY_SLUGS } from "@/lib/queries/articles";
import { GetArticlesBySlugsQuery, Article } from "@/types/contentful";
import { Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReadingListGrid from "../components/ReadingListGrid";

export default async function ReadingListPage() {
  const { slugs, nextCursor } = await getReadingListSlugsPaginated();

  if (slugs.length === 0) return <EmptyState />;

  const { data } = await getClient().query<GetArticlesBySlugsQuery>({
    query: GET_ARTICLES_BY_SLUGS,
    variables: { slugs },
  });
  const articles: Article[] = data?.articleCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Reading List
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-text-primary">
          Saved articles
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          <span className="font-medium text-primary">{articles.length}</span>{" "}
          {articles.length === 1 ? "article" : "articles"} saved
        </p>
      </div>

      <ReadingListGrid
        initialArticles={articles}
        initialNextCursor={nextCursor}
      />
    </main>
  );
}

function EmptyState() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Reading List
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-text-primary">
          Saved articles
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-32 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-surface">
          <Bookmark size={24} strokeWidth={1.5} className="text-primary" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-text-primary">
            Nothing saved yet
          </p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-text-muted">
            Hit the bookmark on any article to save it here for later.
          </p>
        </div>
        <Link
          href="/articles"
          className="mt-2 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Browse articles
          <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}
