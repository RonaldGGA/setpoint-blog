import { getClient } from "@/lib/ApolloClient";
import { GET_ALL_SERIES } from "@/lib/queries/articles";
import { GetAllSeriesQuery, SeriesWithCount } from "@/types/contentful";
import SeriesCard from "../components/SeriesCard";
import { withCache } from "@/lib/cache";

export const revalidate = 300;

export default async function SeriesPage() {
  const { data } = await withCache("series:all", 300, () =>
    getClient().query<GetAllSeriesQuery>({ query: GET_ALL_SERIES })
  );
  const series: SeriesWithCount[] = data?.seriesCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Series
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Structured learning paths
        </h1>
        <p className="mt-3 text-text-muted">
          Articles grouped by topic — read them in order or jump to what you
          need.
        </p>
      </div>

      {series.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-24">
          <p className="text-sm text-text-muted">No series published yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((s, index) => (
            <SeriesCard key={s.slug} series={s} index={index} />
          ))}
        </div>
      )}
    </main>
  );
}
