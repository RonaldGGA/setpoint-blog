"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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
