"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type UpdateProfileInput = {
  name: string;
  image: string;
};

type ActionResult = { success: true } | { success: false; error: string };

export async function updateProfile(
  input: UpdateProfileInput
): Promise<ActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Not authenticated." };
  }

  const name = input.name.trim();
  if (!name) {
    return { success: false, error: "Name cannot be empty." };
  }

  await auth.api.updateUser({
    headers: await headers(),
    body: {
      name,
      image: input.image.trim() || null,
    },
  });

  revalidatePath("/profile");
  return { success: true };
}
