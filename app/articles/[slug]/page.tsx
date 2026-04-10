import CommentSection from "@/app/components/CommentSection";
import ReadingProgress from "@/app/components/ReadingProgress";
import TagBadge from "@/app/components/TagBade";
import { getClient } from "@/lib/ApolloClient";
import { withCache } from "@/lib/cache";
import { GET_ARTICLE_BY_SLUG } from "@/lib/queries/articles";
import { GetArticleBySlugQuery } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 300;

const BASE_URL = "https://setpoint-blog.vercel.app";

type Props = {
  params: Promise<{ slug: string }>;
};

// Shared fetcher — both generateMetadata and ArticlePage use the same cache key
async function getArticle(slug: string) {
  const { data } = await withCache(`article:${slug}`, 300, () =>
    getClient().query<GetArticleBySlugQuery>({
      query: GET_ARTICLE_BY_SLUG,
      variables: { slug },
    })
  );
  return data?.articleCollection?.items[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImage ? [article.coverImage.url] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const articleUrl = `${BASE_URL}/articles/${slug}`;

  // JSON-LD — Article schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: "Ronald González de Armas",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Setpoint",
      url: BASE_URL,
    },
    url: articleUrl,
    ...(article.coverImage && { image: article.coverImage.url }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Setpoint",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${BASE_URL}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
