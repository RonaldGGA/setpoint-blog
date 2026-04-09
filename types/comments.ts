export type CommentWithAuthor = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string | null;
    image: string | null;
  };
  replies: CommentWithAuthor[];
};

export type PendingComment = {
  id: string;
  content: string;
  createdAt: Date;
  articleSlug: string;
  author: {
    name: string | null;
    image: string | null;
  };
};
