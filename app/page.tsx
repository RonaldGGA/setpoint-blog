import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLES } from "@/lib/queries/articles";
import { Article, GetArticlesQuery } from "@/types/contentful";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const { data } = await getClient().query<GetArticlesQuery>({
    query: GET_ARTICLES,
  });

  const articles: Article[] = data?.articleCollection?.items ?? [];

  if (articles.length === 0) {
    return (
      <main>
        <p>No articles found.</p>
      </main>
    );
  }

  return (
    <main>
      {articles.map((article) => (
        <div key={article.slug}>
          <Link href={`/articles/${article.slug}`}>
            <h2>{article.title}</h2>
          </Link>
          <p>{article.excerpt}</p>
          <span>{article.readingTime} min read</span>
        </div>
      ))}
    </main>
  );
}
