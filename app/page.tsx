import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLES } from "@/lib/queries/articles";
import { Article, GetArticlesQuery } from "@/types/contentful";
import ArticleCard from "./components/ArticleCard";

export const revalidate = 60;

export default async function Home() {
  const { data } = await getClient().query<GetArticlesQuery>({
    query: GET_ARTICLES,
  });

  const articles: Article[] = data?.articleCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-[var(--color-text-primary)]">
          Setpoint
        </h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Technical publishing for Industry 4.0 — SCADA, PLCs, IIoT, and modern
          software.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  );
}
