import { getClient } from "@/lib/ApolloClient";
import { GET_ALL_ARTICLES } from "@/lib/queries/articles";
import { GetAllArticlesQuery, Article } from "@/types/contentful";
import { withCache } from "@/lib/cache";
import ArticlesList from "@/app/components/ArticlesList";

export const revalidate = 60;

export default async function ArticlesPage() {
  const { data } = await withCache("articles:all", 60, () =>
    getClient().query<GetAllArticlesQuery>({ query: GET_ALL_ARTICLES })
  );
  const articles: Article[] = data?.articleCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Articles
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          Everything published
        </h1>
        <p className="mt-3 text-text-muted">
          {articles.length} article{articles.length === 1 ? "" : "s"} — search
          or browse below.
        </p>
      </div>

      <ArticlesList articles={articles} />
    </main>
  );
}
