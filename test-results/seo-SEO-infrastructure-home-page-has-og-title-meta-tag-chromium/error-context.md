# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seo.spec.ts >> SEO infrastructure >> home page has og:title meta tag
- Location: e2e\seo.spec.ts:43:7

# Error details

```
Error: expect(locator).toBeAttached() failed

Locator: locator('meta[property="og:title"]')
Expected: attached
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeAttached" with timeout 5000ms
  - waiting for locator('meta[property="og:title"]')

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
      - heading "Setpoint" [level=1] [ref=e20]
      - paragraph [ref=e21]: Technical publishing for Industry 4.0 — SCADA, PLCs, IIoT, and modern software.
    - link "Featured Test title A test excerpt April 3, 2026 · 2 min read Read Test title" [ref=e23] [cursor=pointer]:
      - /url: /articles/test-slug
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e27]: Featured
          - heading "Test title" [level=2] [ref=e28]
          - paragraph [ref=e29]: A test excerpt
        - generic [ref=e30]:
          - generic [ref=e31]:
            - generic [ref=e32]: April 3, 2026
            - generic [ref=e33]: ·
            - generic [ref=e34]: 2 min read
          - generic [ref=e35]:
            - text: Read
            - img [ref=e36]
      - img "Test title" [ref=e39]
    - generic [ref=e41]:
      - link "Test tag 3 test tag 2 test tag 1 01 test article 2 Something in excerpt Apr 3, 2026 2 min" [ref=e42] [cursor=pointer]:
        - /url: /articles/test-slug-2
        - generic [ref=e43]:
          - generic [ref=e44]:
            - generic [ref=e45]: Test tag 3
            - generic [ref=e46]: test tag 2
            - generic [ref=e47]: test tag 1
          - generic [ref=e48]: "01"
        - heading "test article 2" [level=2] [ref=e49]
        - paragraph [ref=e50]: Something in excerpt
        - generic [ref=e51]:
          - generic [ref=e52]: Apr 3, 2026
          - generic [ref=e54]:
            - img [ref=e55]
            - text: 2 min
      - button "Save to reading list" [ref=e59] [cursor=pointer]:
        - img [ref=e60]
  - contentinfo [ref=e62]:
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]: ▸
        - generic [ref=e66]: Setpoint — Ronald González de Armas
      - generic [ref=e67]:
        - link "GitHub" [ref=e68] [cursor=pointer]:
          - /url: https://github.com/RonaldGGA
        - link "Portfolio" [ref=e69] [cursor=pointer]:
          - /url: https://portfolio-ronalddearmas.vercel.app
        - link "About" [ref=e70] [cursor=pointer]:
          - /url: /about
  - button "Open Next.js Dev Tools" [ref=e76] [cursor=pointer]:
    - img [ref=e77]
  - alert [ref=e80]
```

# Test source

```ts
  1  | /**
  2  |  * e2e/seo.spec.ts
  3  |  * E2E tests for SEO — sitemap, robots.txt, OG images, meta tags.
  4  |  * These verify that the SEO infrastructure built in Fase 6 works correctly.
  5  |  */
  6  | import { test, expect } from "@playwright/test";
  7  | 
  8  | test.describe("SEO infrastructure", () => {
  9  |   test("sitemap.xml responds with 200", async ({ page }) => {
  10 |     const response = await page.goto("/sitemap.xml");
  11 |     expect(response?.status()).toBe(200);
  12 |   });
  13 | 
  14 |   test("sitemap.xml contains the base URL", async ({ page }) => {
  15 |     await page.goto("/sitemap.xml");
  16 |     const content = await page.content();
  17 |     expect(content).toContain("setpoint-blog.vercel.app");
  18 |   });
  19 | 
  20 |   test("sitemap.xml contains /articles/ entries", async ({ page }) => {
  21 |     await page.goto("/sitemap.xml");
  22 |     const content = await page.content();
  23 |     expect(content).toContain("/articles/");
  24 |   });
  25 | 
  26 |   test("robots.txt responds with 200", async ({ page }) => {
  27 |     const response = await page.goto("/robots.txt");
  28 |     expect(response?.status()).toBe(200);
  29 |   });
  30 | 
  31 |   test("robots.txt disallows /admin/", async ({ page }) => {
  32 |     await page.goto("/robots.txt");
  33 |     const content = await page.content();
  34 |     expect(content).toContain("/admin/");
  35 |   });
  36 | 
  37 |   test("robots.txt references the sitemap", async ({ page }) => {
  38 |     await page.goto("/robots.txt");
  39 |     const content = await page.content();
  40 |     expect(content).toContain("sitemap.xml");
  41 |   });
  42 | 
  43 |   test("home page has og:title meta tag", async ({ page }) => {
  44 |     await page.goto("/");
  45 |     const ogTitle = page.locator('meta[property="og:title"]');
> 46 |     await expect(ogTitle).toBeAttached();
     |                           ^ Error: expect(locator).toBeAttached() failed
  47 |   });
  48 | 
  49 |   test("home page has og:description meta tag", async ({ page }) => {
  50 |     await page.goto("/");
  51 |     const ogDesc = page.locator('meta[property="og:description"]');
  52 |     await expect(ogDesc).toBeAttached();
  53 |   });
  54 | });
  55 | 
```