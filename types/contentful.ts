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

export interface ArticleBody {
  json: Record<string, unknown>;
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  syndication: boolean;
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
