import { gql } from "@apollo/client";

export const GET_FEATURED_ARTICLE = gql`
  query GetFeaturedArticle {
    articleCollection(where: { featured: true }, limit: 1) {
      items {
        title
        slug
        excerpt
        publishedAt
        readingTime
        coverImage {
          url
          description
        }
        tags: tagsCollection {
          items {
            name
            slug
            color
          }
        }
        series {
          title
          slug
        }
        seriesOrder
      }
    }
  }
`;

export const GET_LATEST_ARTICLES = gql`
  query GetLatestArticles {
    articleCollection(
      where: { featured: false }
      order: publishedAt_DESC
      limit: 6
    ) {
      items {
        title
        slug
        excerpt
        publishedAt
        readingTime
        coverImage {
          url
          description
        }
        tags: tagsCollection {
          items {
            name
            slug
            color
          }
        }
        series {
          title
          slug
        }
        seriesOrder
      }
    }
  }
`;

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    articleCollection(order: publishedAt_DESC) {
      items {
        title
        slug
        excerpt
        publishedAt
        readingTime
        coverImage {
          url
          description
        }
        tags: tagsCollection {
          items {
            name
            slug
            color
          }
        }
        series {
          title
          slug
        }
        seriesOrder
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    articleCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        excerpt
        publishedAt
        readingTime
        syndication
        coverImage {
          url
          description
        }
        body {
          json
        }
        tags: tagsCollection {
          items {
            name
            slug
            color
          }
        }
        series {
          title
          slug
        }
        seriesOrder
      }
    }
  }
`;

export const GET_ARTICLES_BY_SLUGS = gql`
  query GetArticlesBySlugs($slugs: [String!]!) {
    articleCollection(where: { slug_in: $slugs }) {
      items {
        title
        slug
        excerpt
        publishedAt
        readingTime
        coverImage {
          url
          title
        }
        tags: tagsCollection {
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

export const GET_ALL_SERIES = gql`
  query GetAllSeries {
    seriesCollection(order: title_ASC) {
      items {
        title
        slug
        description
        coverImage {
          url
          description
        }
        linkedFrom {
          articleCollection {
            total
          }
        }
      }
    }
  }
`;
export const GET_SERIES_BY_SLUG = gql`
  query GetSeriesBySlug($slug: String!) {
    seriesCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        description
        coverImage {
          url
          description
        }
        linkedFrom {
          articleCollection(order: seriesOrder_ASC) {
            total
            items {
              title
              slug
              excerpt
              publishedAt
              readingTime
              seriesOrder
              coverImage {
                url
                description
              }
              tags: tagsCollection {
                items {
                  name
                  slug
                  color
                }
              }
            }
          }
        }
      }
    }
  }
`;
