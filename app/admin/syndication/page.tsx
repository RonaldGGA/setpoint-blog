import { getClient } from "@/lib/ApolloClient";
import { GET_ALL_ARTICLES } from "@/lib/queries/articles";
import { GetAllArticlesQuery, Article } from "@/types/contentful";
import { getSyndicationSettings } from "@/lib/actions/syndication";
import { Rss } from "lucide-react";
import SyndicationRow from "@/app/components/admin/SyndicationRow";

export const revalidate = 0;

export default async function AdminSyndicationPage() {
  const [{ data }, settings] = await Promise.all([
    getClient().query<GetAllArticlesQuery>({ query: GET_ALL_ARTICLES }),
    getSyndicationSettings(),
  ]);

  const articles: Article[] = data?.articleCollection?.items ?? [];

  const settingsMap = new Map(settings.map((s) => [s.articleSlug, s.enabled]));

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Rss size={20} className="text-[var(--color-primary)]" />
            <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Syndication
            </h1>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            Control which articles are syndicated to Hashnode
          </p>
        </div>

        {articles.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-3
                          rounded-xl border border-dashed border-[var(--color-border)]"
          >
            <Rss size={32} className="text-[var(--color-border)]" />
            <p className="text-sm text-[var(--color-text-muted)]">
              No articles found
            </p>
          </div>
        )}

        <div className="space-y-2">
          {articles.map((article) => (
            <SyndicationRow
              key={article.slug}
              articleSlug={article.slug}
              articleTitle={article.title}
              initialEnabled={settingsMap.get(article.slug) ?? false}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
