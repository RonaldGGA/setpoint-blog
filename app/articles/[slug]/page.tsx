import CommentSection from "@/app/components/CommentSection";
import ReadingProgress from "@/app/components/ReadingProgress";
import TagBadge from "@/app/components/TagBadge";
import { getClient } from "@/lib/ApolloClient";
import { withCache } from "@/lib/cache";
import { GET_ARTICLE_BY_SLUG } from "@/lib/queries/articles";
import { GetArticleBySlugQuery } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import ShareButtons from "@/app/components/SharedButton";
import ArticleCoverFallback from "@/app/components/ArticleCoverFallback";

export const revalidate = 300;

const BASE_URL = "https://setpoint-blog.vercel.app";

type Props = {
  params: Promise<{ slug: string }>;
};

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
      { "@type": "ListItem", position: 1, name: "Setpoint", item: BASE_URL },
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ReadingProgress />

      {article.coverImage ? (
        <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
          <Image
            src={article.coverImage.url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        </div>
      ) : (
        <ArticleCoverFallback
          accentColor={article.tags.items[0]?.color ?? "#F59E0B"}
          tagName={article.tags.items[0]?.name}
        />
      )}

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mx-auto max-w-2xl">
          <div className={"-mt-16 relative z-10 pt-0"}>
            <Link
              href="/articles"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <ArrowLeft size={14} />
              All articles
            </Link>

            {article.tags.items.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {article.tags.items.map((tag) => (
                  <TagBadge key={tag.slug} tag={tag} />
                ))}
              </div>
            )}

            <h1 className="font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
              {article.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between border-b border-border pb-8">
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span>{date}</span>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} strokeWidth={2} />
                  {article.readingTime} min read
                </span>
                {article.series && (
                  <>
                    <span className="text-border">·</span>
                    <span className="text-secondary">
                      {article.series.title}
                    </span>
                  </>
                )}
              </div>
              <ShareButtons title={article.title} url={articleUrl} />
            </div>
          </div>

          {article.body && (
            <div className="prose mt-10">
              {documentToReactComponents(article.body.json)}
            </div>
          )}

          <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
            <Link
              href="/articles"
              className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <ArrowLeft size={14} />
              Back to articles
            </Link>
            <ShareButtons title={article.title} url={articleUrl} />
          </div>
        </div>

        <CommentSection articleSlug={slug} />
      </main>
    </>
  );
}
