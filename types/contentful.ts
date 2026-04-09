export interface CoverImage {
  url: string;
  description: string;
}

export interface Tag {
  name: string;
  slug: string;
  color: string | null;
}

export interface Series {
  title: string;
  slug: string;
}

import { Document } from "@contentful/rich-text-types";

export interface ArticleBody {
  json: Document;
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  syndication: boolean;
  featured?: boolean;
  coverImage: CoverImage | null;
  tags: { items: Tag[] };
  series: Series | null;
  seriesOrder: number | null;
  body?: ArticleBody;
}

export interface ArticleCollection {
  items: Article[];
}

export interface GetArticlesQuery {
  articleCollection: ArticleCollection;
}

export interface GetArticleBySlugQuery {
  articleCollection: ArticleCollection;
}

export interface GetArticlesBySlugsQuery {
  articleCollection: ArticleCollection;
}

export type GetFeaturedArticleQuery = {
  articleCollection: {
    items: Article[];
  };
};

export type GetLatestArticlesQuery = {
  articleCollection: {
    items: Article[];
  };
};

export type GetAllArticlesQuery = {
  articleCollection: {
    items: Article[];
  };
};

export type SeriesWithCount = {
  title: string;
  slug: string;
  description: string | null;
  coverImage: CoverImage | null;
  linkedFrom: {
    articleCollection: {
      total: number;
    };
  };
};

export type GetAllSeriesQuery = {
  seriesCollection: {
    items: SeriesWithCount[];
  };
};

export type SeriesDetail = {
  title: string;
  slug: string;
  description: string | null;
  coverImage: CoverImage | null;
  linkedFrom: {
    articleCollection: {
      total: number;
      items: Article[];
    };
  };
};

export type GetSeriesBySlugQuery = {
  seriesCollection: {
    items: SeriesDetail[];
  };
};
