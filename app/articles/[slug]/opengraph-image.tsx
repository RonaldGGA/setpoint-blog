import { ImageResponse } from "next/og";
import { getClient } from "@/lib/ApolloClient";
import { GET_ARTICLE_BY_SLUG } from "@/lib/queries/articles";
import type { GetArticleBySlugQuery } from "@/types/contentful";
import { withCache } from "@/lib/cache";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontRegularData = fetch(
  new URL("./Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const fontBoldData = fetch(new URL("./Inter-Bold.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export default async function ArticleOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const cached = await withCache(`article:${slug}`, 300, async () => {
    const { data } = await getClient().query<GetArticleBySlugQuery>({
      query: GET_ARTICLE_BY_SLUG,
      variables: { slug },
    });
    return data;
  });

  const article = cached?.articleCollection?.items[0] ?? null;
  console.log("OG article data:", JSON.stringify(article, null, 2));

  const [regularFont, boldFont] = await Promise.all([
    fontRegularData,
    fontBoldData,
  ]);

  const title = article?.title ?? "Setpoint";
  const firstTag = article?.tags?.items?.[0];
  const tagName = firstTag?.name ?? "Industry 4.0";
  const tagColor = firstTag?.color ?? "#F59E0B";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#08090E",
        padding: "64px 72px",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#F59E0B",
            letterSpacing: "-0.5px",
            fontFamily: "Inter",
          }}
        >
          Setpoint
        </span>
        <span style={{ color: "#2A2D3E", fontSize: "24px" }}>·</span>
        <span
          style={{
            color: "#6B7280",
            fontSize: "20px",
            fontFamily: "Inter",
          }}
        >
          setpoint-blog.vercel.app
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          paddingTop: "32px",
          paddingBottom: "32px",
        }}
      >
        <p
          style={{
            fontSize: title.length > 60 ? "44px" : "56px",
            fontWeight: 700,
            color: "#E8EAF0",
            lineHeight: 1.2,
            margin: 0,
            maxWidth: "980px",
            fontFamily: "Inter",
          }}
        >
          {title}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#0F1117",
            border: `1px solid ${tagColor}`,
            borderRadius: "8px",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: tagColor,
            }}
          />
          <span
            style={{
              fontSize: "20px",
              color: tagColor,
              fontWeight: 500,
              fontFamily: "Inter",
            }}
          >
            {tagName}
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: regularFont, weight: 400, style: "normal" },
        { name: "Inter", data: boldFont, weight: 700, style: "normal" },
      ],
    }
  );
}
