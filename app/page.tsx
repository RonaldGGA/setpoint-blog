import { query } from "@/lib/ApolloClient";
import { GET_ARTICLES } from "@/lib/queries/articles";
import { Article, GetArticleQuery } from "@/types/contentful";

export default async function Home() {
  const { data } = await query<GetArticleQuery>({ query: GET_ARTICLES });

  if (!data)
    return (
      <main>
        <p>No articles found.</p>
      </main>
    );

  const articles: Article[] = data.articleCollection.items;

  return (
    <main>
      {articles.map((article) => (
        <div key={article.slug}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <span>{article.readingTime} min read</span>
        </div>
      ))}
    </main>
  );
}
