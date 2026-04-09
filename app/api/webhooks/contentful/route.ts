import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLE_BY_SLUG } from "@/lib/queries/articles";
import { GetArticleBySlugQuery } from "@/types/contentful";
import { getSyndicationSettings } from "@/lib/actions/syndication";
import { adaptArticleWithAI } from "@/lib/syndication";
import { publishToHashnode } from "@/lib/hashnode";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const slug = body?.fields?.slug?.["en-US"];
    if (!slug) {
      return NextResponse.json({ error: "No slug found" }, { status: 400 });
    }

    const settings = await getSyndicationSettings();
    const articleSettings = settings.find((s) => s.articleSlug === slug);
    if (!articleSettings?.enabled) {
      return NextResponse.json({
        skipped: true,
        reason: "Syndication disabled",
      });
    }

    const { data } = await getClient().query<GetArticleBySlugQuery>({
      query: GET_ARTICLE_BY_SLUG,
      variables: { slug },
    });
    const article = data?.articleCollection?.items[0];
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const adaptedContent = await adaptArticleWithAI({
      title: article.title,
      excerpt: article.excerpt ?? "",
      body: JSON.stringify(article.body),
      slug: article.slug,
    });
    const published = await publishToHashnode({
      title: article.title,
      content: adaptedContent,
      slug: article.slug,
      excerpt: article.excerpt ?? "",
    });

    await prisma.syndicationLog.create({
      data: {
        articleSlug: slug,
        platform: "hashnode",
        status: "SUCCESS",
        externalUrl: published.url,
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, url: published.url });
  } catch (error) {
    console.error("Webhook error:", error);

    const body = await req.json().catch(() => ({}));
    const slug = body?.fields?.slug?.["en-US"];
    if (slug) {
      await prisma.syndicationLog.create({
        data: {
          articleSlug: slug,
          platform: "hashnode",
          status: "FAILED",
        },
      });
    }

    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
