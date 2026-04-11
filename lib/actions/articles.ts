"use server";

import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLES_BY_SLUGS } from "@/lib/queries/articles";
import { GetArticlesBySlugsQuery, Article } from "@/types/contentful";

export async function getArticlesBySlugs(slugs: string[]): Promise<Article[]> {
  if (slugs.length === 0) return [];
  const { data } = await getClient().query<GetArticlesBySlugsQuery>({
    query: GET_ARTICLES_BY_SLUGS,
    variables: { slugs },
  });
  return data?.articleCollection?.items ?? [];
}
