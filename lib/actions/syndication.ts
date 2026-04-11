"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true } | { success: false; error: string };

export async function getSyndicationSettings() {
  const settings = await prisma.syndicationSettings.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return settings;
}

export async function toggleSyndication(
  articleSlug: string,
  enabled: boolean
): Promise<ActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized." };
  }

  await prisma.syndicationSettings.upsert({
    where: { articleSlug },
    update: { enabled },
    create: { articleSlug, enabled },
  });

  revalidatePath("/admin/syndication");
  return { success: true };
}

const LOG_PAGE_SIZE = 15;

export async function getSyndicationLogsPaginated(cursor?: string): Promise<{
  logs: {
    id: string;
    articleSlug: string;
    platform: string;
    status: string;
    externalUrl: string | null;
    createdAt: Date;
  }[];
  nextCursor: string | null;
}> {
  const logs = await prisma.syndicationLog.findMany({
    orderBy: { createdAt: "desc" },
    take: LOG_PAGE_SIZE + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),
  });

  const hasMore = logs.length > LOG_PAGE_SIZE;
  const items = hasMore ? logs.slice(0, LOG_PAGE_SIZE) : logs;

  return {
    logs: items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
  };
}
