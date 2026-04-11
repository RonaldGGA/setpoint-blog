"use server";

import { getClient } from "@/lib/ApolloClient";
import { gql } from "@apollo/client";
import { Article } from "@/types/contentful";

const SEARCH_ARTICLES = gql`
  query SearchArticles($query: String!) {
    articleCollection(
      where: { OR: [{ title_contains: $query }, { excerpt_contains: $query }] }
      limit: 8
      order: publishedAt_DESC
    ) {
      items {
        title
        slug
        excerpt
        publishedAt
        readingTime
        tags: tagsCollection(limit: 3) {
          items {
            name
            slug
            color
          }
        }
      }
    }
  }
`;

export async function searchArticles(query: string): Promise<Article[]> {
  if (!query.trim() || query.trim().length < 2) return [];

  const { data } = await getClient().query<{
    articleCollection: { items: Article[] };
  }>({
    query: SEARCH_ARTICLES,
    variables: { query: query.trim() },
  });

  return data?.articleCollection?.items ?? [];
}
