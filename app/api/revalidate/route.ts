import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Promise.all([
    redis.del("home:featured"),
    redis.del("home:latest"),
    redis.del("articles:all"),
  ]);

  revalidatePath("/");
  revalidatePath("/articles");

  return NextResponse.json({ revalidated: true });
}
