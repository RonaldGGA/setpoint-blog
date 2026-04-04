import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLES } from "@/lib/queries/articles";
import { Article, GetArticlesQuery } from "@/types/contentful";
import ArticleCard from "./components/ArticleCard";
import FeaturedCard from "./components/FeaturedCard";
import HeroSection from "./components/HeroSection";

export const revalidate = 60;

export default async function Home() {
  const { data } = await getClient().query<GetArticlesQuery>({
    query: GET_ARTICLES,
  });

  const articles: Article[] = data?.articleCollection?.items ?? [];
  const featured = articles.find((a) => a.featured);
  const grid = articles.filter((a) => !a.featured).slice(0, 6);

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
