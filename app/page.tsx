import { getClient } from "@/lib/ApolloClient";
import {
  GET_FEATURED_ARTICLE,
  GET_LATEST_ARTICLES,
} from "@/lib/queries/articles";
import {
  GetFeaturedArticleQuery,
  GetLatestArticlesQuery,
  Article,
} from "@/types/contentful";
import ArticleCard from "./components/ArticleCard";
import FeaturedCard from "./components/FeaturedCard";
import HeroSection from "./components/HeroSection";

export const revalidate = 60;

export default async function Home() {
  const [featuredRes, latestRes] = await Promise.all([
    getClient().query<GetFeaturedArticleQuery>({ query: GET_FEATURED_ARTICLE }),
    getClient().query<GetLatestArticlesQuery>({ query: GET_LATEST_ARTICLES }),
  ]);

  const featured: Article | undefined =
    featuredRes.data?.articleCollection?.items[0];
  const grid: Article[] = latestRes.data?.articleCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <HeroSection />
      {featured && <FeaturedCard article={featured} />}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </main>
  );
}
