import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLE_BY_SLUG } from "@/lib/queries/articles";
import { GetArticleBySlugQuery } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await getClient().query<GetArticleBySlugQuery>({
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug },
  });

  const article = data?.articleCollection?.items[0];

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage.url] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const { data } = await getClient().query<GetArticleBySlugQuery>({
    query: GET_ARTICLE_BY_SLUG,
    variables: { slug },
  });

  const article = data?.articleCollection?.items[0];

  if (!article) notFound();

  return (
    <main>
      <h1>{article.title}</h1>
      <p>{article.excerpt}</p>
      {article.body && (
        <div>{documentToReactComponents(article.body.json)}</div>
      )}
    </main>
  );
}
