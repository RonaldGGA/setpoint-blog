"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { CommentWithAuthor } from "@/types/comments";

type CreateCommentInput = {
  articleSlug: string;
  content: string;
  parentId?: string;
};

type ActionResult = { success: true } | { success: false; error: string };

export async function createComment(
  input: CreateCommentInput
): Promise<ActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "You must be logged in to comment." };
  }

  const content = input.content.trim();
  if (!content) {
    return { success: false, error: "Comment cannot be empty." };
  }
  if (content.length > 2000) {
    return { success: false, error: "Comment is too long (max 2000 chars)." };
  }

  if (input.parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: input.parentId },
      select: { articleSlug: true, parentId: true },
    });

    if (!parent) {
      return { success: false, error: "Parent comment not found." };
    }
    if (parent.articleSlug !== input.articleSlug) {
      return { success: false, error: "Invalid parent comment." };
    }
    if (parent.parentId) {
      return { success: false, error: "Cannot reply to a reply." };
    }
  }

  await prisma.comment.create({
    data: {
      content,
      articleSlug: input.articleSlug,
      parentId: input.parentId ?? null,
      authorId: session.user.id,
    },
  });

  revalidatePath(`/articles/${input.articleSlug}`);
  revalidatePath("/admin/comments");

  return { success: true };
}

export async function getApprovedComments(
  articleSlug: string
): Promise<CommentWithAuthor[]> {
  const comments = await prisma.comment.findMany({
    where: {
      articleSlug,
      status: "APPROVED",
      parentId: null,
    },
    orderBy: { createdAt: "asc" },
    include: {
      author: {
        select: { name: true, image: true },
      },
      replies: {
        where: { status: "APPROVED" },
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: { name: true, image: true },
          },
        },
      },
    },
  });

  return comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    author: comment.author,
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt,
      author: reply.author,
      replies: [],
    })),
  }));
}

import { PendingComment } from "@/types/comments";

export async function getPendingComments(): Promise<PendingComment[]> {
  const comments = await prisma.comment.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  });

  return comments.map((c) => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt,
    articleSlug: c.articleSlug,
    author: c.author,
  }));
}

export async function moderateComment(
  commentId: string,
  action: "APPROVED" | "REJECTED"
): Promise<ActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized." };
  }

  await prisma.comment.update({
    where: { id: commentId },
    data: { status: action },
  });

  revalidatePath("/admin/comments");

  return { success: true };
}

const COMMENTS_PAGE_SIZE = 10;

export async function getPendingCommentsPaginated(cursor?: string): Promise<{
  comments: PendingComment[];
  nextCursor: string | null;
}> {
  const comments = await prisma.comment.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    take: COMMENTS_PAGE_SIZE + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
    include: {
      author: { select: { name: true, image: true } },
    },
  });

  const hasMore = comments.length > COMMENTS_PAGE_SIZE;
  const items = hasMore ? comments.slice(0, COMMENTS_PAGE_SIZE) : comments;

  return {
    comments: items.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      articleSlug: c.articleSlug,
      author: c.author,
    })),
    nextCursor: hasMore ? items[items.length - 1].id : null,
  };
}
