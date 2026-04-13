import { getSyndicationSettings } from "@/lib/actions/syndication";
import { getClient } from "@/lib/ApolloClient";
import { GET_ALL_ARTICLES_SLUGS_AND_TITLES } from "@/lib/queries/articles";
import SyndicationRow from "@/app/components/admin/SyndicationRow";
import { GetAllArticlesSlugsAndTitlesQuery } from "@/types/contentful";

export default async function AdminSyndicationPage() {
  const { data } = await getClient().query<GetAllArticlesSlugsAndTitlesQuery>({
    query: GET_ALL_ARTICLES_SLUGS_AND_TITLES,
  });
  const allArticles = data?.articleCollection?.items ?? [];

  const settings = await getSyndicationSettings();
  const settingsMap = new Map(settings.map((s) => [s.articleSlug, s.enabled]));

  const articlesWithSettings = allArticles.map((article) => ({
    articleSlug: article.slug,
    title: article.title,
    enabled: settingsMap.get(article.slug) ?? false,
    updatedAt: null,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Syndication
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Control which articles get published to Hashnode automatically.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-text-primary">
          All articles
        </h2>
        {articlesWithSettings.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16">
            <p className="text-sm text-text-muted">No articles found.</p>
          </div>
        ) : (
          <div className="divide-y divide-border rounded-xl border border-border bg-surface">
            {articlesWithSettings.map((article) => (
              <SyndicationRow key={article.articleSlug} setting={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
