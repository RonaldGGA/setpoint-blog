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
