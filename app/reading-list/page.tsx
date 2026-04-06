import { getReadingListSlugs } from "@/lib/actions/reading-list";
import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLES_BY_SLUGS } from "@/lib/queries/articles";
import { GetArticlesBySlugsQuery } from "@/types/contentful";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import ReadingListItem from "../components/ReadingListItem";

export default async function ReadingListPage() {
  const slugs = await getReadingListSlugs();

  if (slugs.length === 0) {
    return <EmptyState />;
  }

  const { data } = await getClient().query<GetArticlesBySlugsQuery>({
    query: GET_ARTICLES_BY_SLUGS,
    variables: { slugs },
  });

  const articles = data?.articleCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
            <Bookmark
              size={16}
              className="text-[var(--color-primary)]"
              fill="currentColor"
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
            Reading List
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] pl-12">
          <span className="text-[var(--color-primary)] font-medium">
            {articles.length}
          </span>{" "}
          {articles.length === 1 ? "article" : "articles"} saved
        </p>
      </div>

      {/* Divider with label */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Saved articles
        </span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* List */}
      <ul className="flex flex-col divide-y divide-[var(--color-border)]">
        {articles.map((article, index) => (
          <ReadingListItem key={article.slug} article={article} index={index} />
        ))}
      </ul>
    </main>
  );
}

function EmptyState() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <div className="flex flex-col items-center justify-center py-32 text-center">
        {/* Icon with glow */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-[var(--color-primary)]/20 blur-2xl scale-150" />
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-primary)]/20">
            <Bookmark
              size={32}
              strokeWidth={1.5}
              className="text-[var(--color-primary)]"
            />
          </div>
        </div>

        {/* Text */}
        <h1 className="font-display text-2xl font-bold text-[var(--color-text-primary)] mb-3">
          Nothing saved yet
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed mb-8">
          Hit the bookmark on any article to save it here for later.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-[#08090E] text-sm font-semibold transition-all hover:bg-[var(--color-primary-hover)] hover:scale-[1.02] active:scale-[0.98]"
        >
          Browse articles →
        </Link>

        {/* Decorative grid */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>
    </main>
  );
}
