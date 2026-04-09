import CommentSection from "@/app/components/CommentSection";
import ReadingProgress from "@/app/components/ReadingProgress";
import TagBadge from "@/app/components/TagBade";
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

  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <ReadingProgress />
      <div className="mx-auto max-w-2xl">
        {article.tags.items.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags.items.map((tag) => (
              <TagBadge key={tag.slug} tag={tag} />
            ))}
          </div>
        )}

        <h1 className="font-display text-3xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-muted)]">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center gap-4 border-b border-[var(--color-border)] pb-8 text-sm text-[var(--color-text-muted)]">
          <span>{date}</span>
          <span className="text-[var(--color-border)]">·</span>
          <span>{article.readingTime} min read</span>
          {article.series && (
            <>
              <span className="text-[var(--color-border)]">·</span>
              <span className="text-[var(--color-secondary)]">
                {article.series.title}
              </span>
            </>
          )}
        </div>
      </div>

      {article.body && (
        <div className="prose mx-auto mt-10 max-w-2xl">
          {documentToReactComponents(article.body.json)}
        </div>
      )}
      <CommentSection articleSlug={slug} />
    </main>
  );
}
