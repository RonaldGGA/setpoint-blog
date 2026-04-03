import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles {
    articleCollection {
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
