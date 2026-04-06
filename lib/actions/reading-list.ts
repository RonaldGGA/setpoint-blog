"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function toggleReadingList(
  articleSlug: string
): Promise<{ saved: boolean; error?: string }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { saved: false, error: "unauthenticated" };
  }

  const userId = session.user.id;

  const existing = await prisma.readingListItem.findUnique({
    where: {
      userId_articleSlug: { userId, articleSlug },
    },
  });

  if (existing) {
    await prisma.readingListItem.delete({
      where: { id: existing.id },
    });
    revalidatePath("/reading-list");
    return { saved: false };
  } else {
    await prisma.readingListItem.create({
      data: { userId, articleSlug },
    });
    revalidatePath("/reading-list");
    return { saved: true };
  }
}

export async function getReadingListSlugs(): Promise<string[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return [];

  const items = await prisma.readingListItem.findMany({
    where: { userId: session.user.id },
    select: { articleSlug: true },
  });

  return items.map((item) => item.articleSlug);
}
