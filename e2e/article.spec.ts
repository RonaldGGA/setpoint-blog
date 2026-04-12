/**
 * e2e/article.spec.ts
 * E2E tests for individual article pages.
 *
 * IMPORTANT: Replace "test-slug-2" with a real slug from your Contentful space.
 * This test hits the real app with real data — no mocks.
 */
import { test, expect } from "@playwright/test";

// ─── Change this to a real slug from your Contentful space ───────────────────
const TEST_SLUG =
  process.env.TEST_ARTICLE_SLUG ??
  "why-i-built-this-blog-with-nextjs-instead-of-no-code-tool";
const ARTICLE_URL = `/articles/${TEST_SLUG}`;

test.describe("Article page", () => {
  test("renders the article title", async ({ page }) => {
    await page.goto(ARTICLE_URL);
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    const text = await heading.innerText();
    expect(text.length).toBeGreaterThan(0);
  });

  test("renders reading time", async ({ page }) => {
    await page.goto(ARTICLE_URL);
    // Reading time is displayed as "X min read"
    await expect(page.getByText(/min read/)).toBeVisible();
  });

  test("renders the article body content", async ({ page }) => {
    await page.goto(ARTICLE_URL);
    // The prose div contains the Rich Text content from Contentful
    const body = page.locator(".prose");
    await expect(body).toBeVisible();
  });

  test("has JSON-LD structured data in the HTML", async ({ page }) => {
    await page.goto(ARTICLE_URL);
    // Verify JSON-LD script tag exists — important for SEO
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached();

    // Verify it contains TechArticle schema
    const content = await jsonLd.first().textContent();
    expect(content).toContain("TechArticle");
  });

  test("has canonical URL meta tag", async ({ page }) => {
    await page.goto(ARTICLE_URL);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toBeAttached();
  });

  test("reading progress bar is present", async ({ page }) => {
    await page.goto(ARTICLE_URL, { waitUntil: "networkidle" });
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeAttached({ timeout: 10000 });
  });

  test("returns 404 for non-existent slug", async ({ page }) => {
    const response = await page.goto("/articles/this-slug-does-not-exist-xyz");
    // Next.js notFound() returns 404
    expect(response?.status()).toBe(404);
  });
});
