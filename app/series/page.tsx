import { getClient } from "@/lib/ApolloClient";
import { GET_ALL_SERIES } from "@/lib/queries/articles";
import { GetAllSeriesQuery, SeriesWithCount } from "@/types/contentful";
import { BookMarked } from "lucide-react";
import SeriesCard from "../components/SeriesCard";

export const revalidate = 300;

export default async function SeriesPage() {
  const { data } = await getClient().query<GetAllSeriesQuery>({
    query: GET_ALL_SERIES,
  });

  const series: SeriesWithCount[] = data?.seriesCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2">
          <BookMarked size={20} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Series
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          {series.length === 0
            ? "No series yet"
            : `${series.length} series published`}
        </p>
      </div>

      {series.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-24 gap-3
                        rounded-xl border border-dashed border-[var(--color-border)]"
        >
          <BookMarked size={32} className="text-[var(--color-border)]" />
          <p className="text-sm text-[var(--color-text-muted)]">
            No series published yet
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {series.map((s, index) => (
          <SeriesCard key={s.slug} series={s} index={index} />
        ))}
      </div>
    </main>
  );
}
