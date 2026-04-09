import { getClient } from "@/lib/ApolloClient";
import { GET_ALL_ARTICLES } from "@/lib/queries/articles";
import { GetAllArticlesQuery, Article } from "@/types/contentful";
import ArticleCard from "@/app/components/ArticleCard";
import { BookOpen } from "lucide-react";

export const revalidate = 60;

export default async function ArticlesPage() {
  const { data } = await getClient().query<GetAllArticlesQuery>({
    query: GET_ALL_ARTICLES,
  });

  const articles: Article[] = data?.articleCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            All Articles
          </h1>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          {articles.length} article{articles.length === 1 ? "" : "s"} published
        </p>
      </div>

      {articles.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-24 gap-3
                        rounded-xl border border-dashed border-[var(--color-border)]"
        >
          <BookOpen size={32} className="text-[var(--color-border)]" />
          <p className="text-sm text-[var(--color-text-muted)]">
            No articles published yet
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </main>
  );
}
