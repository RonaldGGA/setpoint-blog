import { MetadataRoute } from "next";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@apollo/client";
import { withCache } from "@/lib/cache";

const BASE_URL = "https://setpoint-blog.vercel.app";

// Minimal query — only slug and publishedAt, no body needed
const GET_ALL_SLUGS = gql`
  query GetAllSlugs {
    articleCollection(order: publishedAt_DESC, limit: 200) {
      items {
        slug
        publishedAt
      }
    }
    seriesCollection(limit: 50) {
      items {
        slug
      }
    }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await withCache("sitemap:all", 300, async () => {
    const { data } = await getClient().query({ query: GET_ALL_SLUGS });
    return data;
  });

  const articles = data?.articleCollection?.items ?? [];
  const series = data?.seriesCollection?.items ?? [];

  const articleEntries: MetadataRoute.Sitemap = articles.map(
    (article: { slug: string; publishedAt: string }) => ({
      url: `${BASE_URL}/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const seriesEntries: MetadataRoute.Sitemap = series.map(
    (s: { slug: string }) => ({
      url: `${BASE_URL}/series/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/series`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticPages, ...articleEntries, ...seriesEntries];
}
