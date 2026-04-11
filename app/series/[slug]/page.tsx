import { getClient } from "@/lib/ApolloClient";
import { GET_SERIES_BY_SLUG } from "@/lib/queries/articles";
import { GetSeriesBySlugQuery, SeriesDetail } from "@/types/contentful";
import ArticleCard from "@/app/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookMarked } from "lucide-react";
import { withCache } from "@/lib/cache";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data } = await withCache(`series:${slug}`, 300, () =>
    getClient().query<GetSeriesBySlugQuery>({
      query: GET_SERIES_BY_SLUG,
      variables: { slug },
    })
  );

  const series: SeriesDetail | undefined = data?.seriesCollection?.items[0];
  if (!series) notFound();

  const articles = series.linkedFrom.articleCollection.items;
  const accentColor = "#F59E0B";

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24">
      <Link
        href="/series"
        className="inline-flex items-center gap-1.5 pt-8 pb-6 text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        <ArrowLeft size={14} />
        All series
      </Link>

      {series.coverImage ? (
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{ aspectRatio: "21/9" }}
        >
          <Image
            src={series.coverImage.url}
            alt={series.coverImage.description ?? series.title}
            fill
            sizes="(max-width: 768px) 100vw, 860px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        </div>
      ) : (
        <div
          className="relative w-full overflow-hidden rounded-xl bg-surface"
          style={{ aspectRatio: "21/9" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${accentColor}14 1px, transparent 1px), linear-gradient(90deg, ${accentColor}14 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)",
            }}
          />
          <div
            className="absolute -top-16 left-1/2 h-64 w-150 -translate-x-1/2 rounded-full opacity-15"
            style={{ background: accentColor, filter: "blur(80px)" }}
          />
          <svg
            className="absolute inset-0 h-full w-full opacity-10"
            viewBox="0 0 800 220"
            preserveAspectRatio="xMidYMid slice"
          >
            <line
              x1="60"
              y1="40"
              x2="240"
              y2="110"
              stroke={accentColor}
              strokeWidth="1"
            />
            <line
              x1="240"
              y1="110"
              x2="460"
              y2="55"
              stroke={accentColor}
              strokeWidth="1"
            />
            <line
              x1="460"
              y1="55"
              x2="660"
              y2="130"
              stroke={accentColor}
              strokeWidth="1"
            />
            <line
              x1="660"
              y1="130"
              x2="800"
              y2="70"
              stroke={accentColor}
              strokeWidth="1"
            />
          </svg>
          {[
            { top: "18%", left: "8%", size: 3 },
            { top: "50%", left: "30%", size: 2 },
            { top: "25%", left: "58%", size: 4 },
            { top: "59%", left: "83%", size: 2 },
          ].map((d, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-50"
              style={{
                top: d.top,
                left: d.left,
                width: d.size,
                height: d.size,
                background: accentColor,
              }}
            />
          ))}
          <span
            className="absolute right-6 top-5 text-[10px] font-semibold uppercase tracking-widest opacity-50"
            style={{ color: accentColor }}
          >
            Setpoint
          </span>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
        </div>
      )}

      <div className="-mt-16 relative z-10 pb-10">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-5 bg-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            Series
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
          {series.title}
        </h1>

        {series.description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-muted">
            {series.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 font-mono text-xs text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {articles.length} article{articles.length === 1 ? "" : "s"} in this
          series
        </div>
      </div>

      <div className="h-px bg-border mb-8" />

      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-5 bg-primary" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Articles
        </span>
        <span className="ml-auto font-mono text-xs text-text-muted">
          {articles.length} total
        </span>
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24">
          <BookMarked size={28} className="text-border" />
          <p className="text-sm text-text-muted">
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

      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/series"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={14} />
          Back to series
        </Link>
      </div>
    </main>
  );
}
