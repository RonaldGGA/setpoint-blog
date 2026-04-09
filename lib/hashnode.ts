const CREATE_DRAFT = `
  mutation CreateDraft($input: CreateDraftInput!) {
    createDraft(input: $input) {
      draft {
        id
      }
    }
  }
`;

const PUBLISH_DRAFT = `
  mutation PublishDraft($input: PublishDraftInput!) {
    publishDraft(input: $input) {
      post {
        id
        url
      }
    }
  }
`;

async function hashnodeRequest(query: string, variables: object) {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.HASHNODE_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
}

export async function publishToHashnode(article: {
  title: string;
  content: string;
  slug: string;
  excerpt: string;
}): Promise<{ id: string; url: string }> {
  const draftRes = await hashnodeRequest(CREATE_DRAFT, {
    input: {
      title: article.title,
      contentMarkdown: article.content,
      publicationId: process.env.HASHNODE_PUBLICATION_ID,
      originalArticleURL: `https://setpoint-blog.vercel.app/articles/${article.slug}`,
      subtitle: article.excerpt,
    },
  });

  const draftId = draftRes?.data?.createDraft?.draft?.id;
  if (!draftId) {
    throw new Error("Failed to create Hashnode draft");
  }

  console.log("✅ Draft created:", draftId);

  const publishRes = await hashnodeRequest(PUBLISH_DRAFT, {
    input: { draftId },
  });

  const post = publishRes?.data?.publishDraft?.post;
  if (!post) {
    throw new Error("Failed to publish Hashnode draft");
  }

  console.log("✅ Published to Hashnode:", post.url);
  return post;
}
