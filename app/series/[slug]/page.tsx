import { getClient } from "@/lib/ApolloClient";
import { GET_SERIES_BY_SLUG } from "@/lib/queries/articles";
import { GetSeriesBySlugQuery, SeriesDetail } from "@/types/contentful";
import ArticleCard from "@/app/components/ArticleCard";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookMarked } from "lucide-react";
import { withCache } from "@/lib/cache";

export const revalidate = 300;

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data } = await withCache(`series:${slug}`, 300, () =>
    getClient().query<GetSeriesBySlugQuery>({
      query: GET_SERIES_BY_SLUG,
      variables: { slug },
    })
  );

  const series: SeriesDetail | undefined = data?.seriesCollection?.items[0];

  // Serie no existe → 404
  if (!series) notFound();

  const articles = series.linkedFrom.articleCollection.items;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 space-y-6">
        {/* Cover image */}
        {series.coverImage && (
          <div className="relative h-48 w-full overflow-hidden rounded-xl">
            <Image
              src={series.coverImage.url}
              alt={series.coverImage.description ?? series.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
          </div>
        )}

        {/* Meta */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookMarked size={18} className="text-[var(--color-primary)]" />
            <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
              Series
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--color-text-primary)]">
            {series.title}
          </h1>
          {series.description && (
            <p className="text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
              {series.description}
            </p>
          )}
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            {articles.length} article{articles.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border)] mb-10" />

      {/* Articles */}
      {articles.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 gap-3
                        rounded-xl border border-dashed border-[var(--color-border)]"
        >
          <BookMarked size={32} className="text-[var(--color-border)]" />
          <p className="text-sm text-[var(--color-text-muted)]">
            No articles in this series yet
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      )}
    </main>
  );
}
