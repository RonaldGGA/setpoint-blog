# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: article.spec.ts >> Article page >> has canonical URL meta tag
- Location: e2e\article.spec.ts:48:7

# Error details

```
Error: expect(locator).toBeAttached() failed

Locator: locator('link[rel="canonical"]')
Expected: attached
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeAttached" with timeout 5000ms
  - waiting for locator('link[rel="canonical"]')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - link "▸ Setpoint" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e5]: ▸
        - text: Setpoint
      - generic [ref=e6]:
        - button "Toggle theme" [ref=e7]:
          - img [ref=e8]
        - link "Articles" [ref=e14] [cursor=pointer]:
          - /url: /articles
        - link "Series" [ref=e15] [cursor=pointer]:
          - /url: /series
        - link "About" [ref=e16] [cursor=pointer]:
          - /url: /about
        - link "Newsletter" [ref=e17] [cursor=pointer]:
          - /url: /newsletter
  - main [ref=e18]:
    - generic [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]: Test tag 3
        - generic [ref=e22]: test tag 2
        - generic [ref=e23]: test tag 1
      - heading "test article 2" [level=1] [ref=e24]
      - paragraph [ref=e25]: Something in excerpt
      - generic [ref=e26]:
        - generic [ref=e27]: April 3, 2026
        - generic [ref=e28]: ·
        - generic [ref=e29]: 2 min read
        - generic [ref=e30]: ·
        - generic [ref=e31]: series-test-1
    - generic [ref=e32]:
      - heading "What is Lorem Ipsum?" [level=2] [ref=e33]
      - paragraph [ref=e34]: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      - heading "Why do we use it?" [level=2] [ref=e35]
      - paragraph [ref=e36]: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    - generic [ref=e37]:
      - generic [ref=e38]:
        - img [ref=e40]
        - heading "Discussion" [level=2] [ref=e42]
        - generic [ref=e43]: "2"
      - generic [ref=e45]:
        - paragraph [ref=e46]: Sign in to join the discussion.
        - link "Sign in →" [ref=e47] [cursor=pointer]:
          - /url: /login
      - list [ref=e48]:
        - listitem [ref=e49]:
          - generic [ref=e50]:
            - img "Ronald" [ref=e52]
            - generic [ref=e53]:
              - generic [ref=e54]:
                - generic [ref=e55]: Ronald
                - generic [ref=e56]: Apr 7, 2026
              - paragraph [ref=e57]: Mi primer comentario
              - button "Reply" [ref=e58]:
                - img [ref=e59]
                - text: Reply
        - listitem [ref=e62]:
          - generic [ref=e63]:
            - img "Ronald" [ref=e65]
            - generic [ref=e66]:
              - generic [ref=e67]:
                - generic [ref=e68]: Ronald
                - generic [ref=e69]: Apr 7, 2026
              - paragraph [ref=e70]: Mi segundo comentario, ahora si lo apruebo de verdad Funcionara el espacio?
              - button "Reply" [ref=e71]:
                - img [ref=e72]
                - text: Reply
  - contentinfo [ref=e75]:
    - generic [ref=e76]:
      - generic [ref=e77]:
        - generic [ref=e78]: ▸
        - generic [ref=e79]: Setpoint — Ronald González de Armas
      - generic [ref=e80]:
        - link "GitHub" [ref=e81] [cursor=pointer]:
          - /url: https://github.com/RonaldGGA
        - link "Portfolio" [ref=e82] [cursor=pointer]:
          - /url: https://portfolio-ronalddearmas.vercel.app
        - link "About" [ref=e83] [cursor=pointer]:
          - /url: /about
  - button "Open Next.js Dev Tools" [ref=e89] [cursor=pointer]:
    - img [ref=e90]
  - alert [ref=e93]
```

# Test source

```ts
  1  | /**
  2  |  * e2e/article.spec.ts
  3  |  * E2E tests for individual article pages.
  4  |  *
  5  |  * IMPORTANT: Replace "test-slug-2" with a real slug from your Contentful space.
  6  |  * This test hits the real app with real data — no mocks.
  7  |  */
  8  | import { test, expect } from "@playwright/test";
  9  | 
  10 | // ─── Change this to a real slug from your Contentful space ───────────────────
  11 | const TEST_SLUG = process.env.TEST_ARTICLE_SLUG ?? "test-slug-2";
  12 | const ARTICLE_URL = `/articles/${TEST_SLUG}`;
  13 | 
  14 | test.describe("Article page", () => {
  15 |   test("renders the article title", async ({ page }) => {
  16 |     await page.goto(ARTICLE_URL);
  17 |     // The h1 should be visible and non-empty
  18 |     const heading = page.getByRole("heading", { level: 1 });
  19 |     await expect(heading).toBeVisible();
  20 |     const text = await heading.innerText();
  21 |     expect(text.length).toBeGreaterThan(0);
  22 |   });
  23 | 
  24 |   test("renders reading time", async ({ page }) => {
  25 |     await page.goto(ARTICLE_URL);
  26 |     // Reading time is displayed as "X min read"
  27 |     await expect(page.getByText(/min read/)).toBeVisible();
  28 |   });
  29 | 
  30 |   test("renders the article body content", async ({ page }) => {
  31 |     await page.goto(ARTICLE_URL);
  32 |     // The prose div contains the Rich Text content from Contentful
  33 |     const body = page.locator(".prose");
  34 |     await expect(body).toBeVisible();
  35 |   });
  36 | 
  37 |   test("has JSON-LD structured data in the HTML", async ({ page }) => {
  38 |     await page.goto(ARTICLE_URL);
  39 |     // Verify JSON-LD script tag exists — important for SEO
  40 |     const jsonLd = page.locator('script[type="application/ld+json"]');
  41 |     await expect(jsonLd.first()).toBeAttached();
  42 | 
  43 |     // Verify it contains TechArticle schema
  44 |     const content = await jsonLd.first().textContent();
  45 |     expect(content).toContain("TechArticle");
  46 |   });
  47 | 
  48 |   test("has canonical URL meta tag", async ({ page }) => {
  49 |     await page.goto(ARTICLE_URL);
  50 |     const canonical = page.locator('link[rel="canonical"]');
> 51 |     await expect(canonical).toBeAttached();
     |                             ^ Error: expect(locator).toBeAttached() failed
  52 |   });
  53 | 
  54 |   test("reading progress bar is present", async ({ page }) => {
  55 |     await page.goto(ARTICLE_URL);
  56 |     // ReadingProgress component renders a fixed bar at the top
  57 |     // It has a specific role or we can check by its fixed position style
  58 |     const progressBar = page.locator('[role="progressbar"]');
  59 |     await expect(progressBar).toBeAttached();
  60 |   });
  61 | 
  62 |   test("returns 404 for non-existent slug", async ({ page }) => {
  63 |     const response = await page.goto("/articles/this-slug-does-not-exist-xyz");
  64 |     // Next.js notFound() returns 404
  65 |     expect(response?.status()).toBe(404);
  66 |   });
  67 | });
  68 | 
```