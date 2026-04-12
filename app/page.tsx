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
import { withCache } from "@/lib/cache";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const [featuredRes, latestRes] = await Promise.all([
    withCache("home:featured", 60, () =>
      getClient().query<GetFeaturedArticleQuery>({
        query: GET_FEATURED_ARTICLE,
      })
    ),
    withCache("home:latest", 60, () =>
      getClient().query<GetLatestArticlesQuery>({ query: GET_LATEST_ARTICLES })
    ),
    withCache("home:saved-slugs", 60, () => Promise.resolve([])),
  ]);

  const featured: Article | undefined =
    featuredRes.data?.articleCollection?.items[0];
  const grid: Article[] = latestRes.data?.articleCollection?.items ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 overflow-x-hidden">
      <HeroSection />
      {featured && <FeaturedCard article={featured} />}

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Latest
          </span>
        </div>
        <Link
          href="/articles"
          className="group flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          View all articles
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </main>
  );
}
