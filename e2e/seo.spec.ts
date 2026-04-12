/**
 * e2e/seo.spec.ts
 * E2E tests for SEO — sitemap, robots.txt, OG images, meta tags.
 * These verify that the SEO infrastructure built in Fase 6 works correctly.
 */
import { test, expect } from "@playwright/test";

test.describe("SEO infrastructure", () => {
  test("sitemap.xml responds with 200", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });

  test("sitemap.xml contains the base URL", async ({ page }) => {
    await page.goto("/sitemap.xml");
    const content = await page.content();
    expect(content).toContain("setpoint-blog.vercel.app");
  });

  test("sitemap.xml contains /articles/ entries", async ({ page }) => {
    await page.goto("/sitemap.xml");
    const content = await page.content();
    expect(content).toContain("/articles/");
  });

  test("robots.txt responds with 200", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });

  test("robots.txt disallows /admin/", async ({ page }) => {
    await page.goto("/robots.txt");
    const content = await page.content();
    expect(content).toContain("/admin/");
  });

  test("robots.txt references the sitemap", async ({ page }) => {
    await page.goto("/robots.txt");
    const content = await page.content();
    expect(content).toContain("sitemap.xml");
  });

  test("home page has og:title meta tag", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toBeAttached();
  });

  test("home page has og:description meta tag", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const ogDesc = page.locator('meta[property="og:description"]');
    await expect(ogDesc).toBeAttached();
  });
});
