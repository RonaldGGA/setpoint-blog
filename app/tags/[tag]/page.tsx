import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLES_BY_TAG } from "@/lib/queries/articles";
import { withCache } from "@/lib/cache";
import { Article } from "@/types/contentful";
import ArticleCard from "@/app/components/ArticleCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag} — Setpoint`,
    description: `Articles tagged with "${tag}" on Setpoint — Industry 4.0 × Software.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const articles = await withCache<Article[]>(`tag:${tag}`, 60, async () => {
    const { data } = (await getClient().query({
      query: GET_ARTICLES_BY_TAG,
      variables: { slug: tag },
    })) as {
      data: {
        tagCollection?: {
          items?: Array<{
            linkedFrom?: { articleCollection?: { items?: Article[] } };
          }>;
        };
      };
    };
    return (
      data?.tagCollection?.items?.[0]?.linkedFrom?.articleCollection?.items ??
      []
    );
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/articles"
        className="mb-12 flex w-fit items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        <ArrowLeft size={14} />
        Back to articles
      </Link>

      <header className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Tag
          </span>
        </div>

        <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
          {tag}
        </h1>

        <p className="mt-3 text-sm text-text-muted">
          {articles.length === 0
            ? "No articles yet"
            : articles.length === 1
              ? "1 article"
              : `${articles.length} articles`}
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-2xl">
            #
          </div>
          <p className="text-sm font-medium text-text-primary">
            No articles tagged &ldquo;{tag}&rdquo; yet
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Check back later or browse all articles.
          </p>
          <Link
            href="/articles"
            className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Browse all articles
          </Link>
        </div>
      )}
    </main>
  );
}
