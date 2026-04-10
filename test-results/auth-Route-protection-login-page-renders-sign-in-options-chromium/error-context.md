# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Route protection >> /login page renders sign in options
- Location: e2e\auth.spec.ts:31:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/GitHub/i)
Expected: visible
Error: strict mode violation: getByText(/GitHub/i) resolved to 2 elements:
    1) <button>Sign in with GitHub</button> aka getByRole('button', { name: 'Sign in with GitHub' })
    2) <a target="_blank" rel="noopener noreferrer" href="https://github.com/RonaldGGA" class="transition-colors hover:text-[var(--color-text-primary)]">GitHub</a> aka getByRole('link', { name: 'GitHub' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/GitHub/i)

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
        - button "Toggle theme" [ref=e7]
        - link "Articles" [ref=e8] [cursor=pointer]:
          - /url: /articles
        - link "Series" [ref=e9] [cursor=pointer]:
          - /url: /series
        - link "About" [ref=e10] [cursor=pointer]:
          - /url: /about
        - link "Newsletter" [ref=e11] [cursor=pointer]:
          - /url: /newsletter
  - generic [ref=e12]:
    - heading "Login Test" [level=1] [ref=e13]
    - button "Sign in with GitHub" [ref=e14]
    - button "Sign in with Google" [ref=e15]
  - contentinfo [ref=e16]:
    - generic [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]: ▸
        - generic [ref=e20]: Setpoint — Ronald González de Armas
      - generic [ref=e21]:
        - link "GitHub" [ref=e22] [cursor=pointer]:
          - /url: https://github.com/RonaldGGA
        - link "Portfolio" [ref=e23] [cursor=pointer]:
          - /url: https://portfolio-ronalddearmas.vercel.app
        - link "About" [ref=e24] [cursor=pointer]:
          - /url: /about
```

# Test source

```ts
  1  | /**
  2  |  * e2e/auth.spec.ts
  3  |  * E2E tests for authentication and route protection.
  4  |  * Verifies that protected routes redirect unauthenticated users to /login.
  5  |  */
  6  | import { test, expect } from "@playwright/test";
  7  | 
  8  | test.describe("Route protection", () => {
  9  |   test("/admin redirects to /login when not authenticated", async ({
  10 |     page,
  11 |   }) => {
  12 |     await page.goto("/admin");
  13 |     // Should end up at /login — either direct redirect or after a moment
  14 |     await expect(page).toHaveURL(/\/login/);
  15 |   });
  16 | 
  17 |   test("/reading-list redirects to /login when not authenticated", async ({
  18 |     page,
  19 |   }) => {
  20 |     await page.goto("/reading-list");
  21 |     await expect(page).toHaveURL(/\/login/);
  22 |   });
  23 | 
  24 |   test("/profile redirects to /login when not authenticated", async ({
  25 |     page,
  26 |   }) => {
  27 |     await page.goto("/profile");
  28 |     await expect(page).toHaveURL(/\/login/);
  29 |   });
  30 | 
  31 |   test("/login page renders sign in options", async ({ page }) => {
  32 |     await page.goto("/login");
  33 |     // Login page should have GitHub and Google buttons
> 34 |     await expect(page.getByText(/GitHub/i)).toBeVisible();
     |                                             ^ Error: expect(locator).toBeVisible() failed
  35 |     await expect(page.getByText(/Google/i)).toBeVisible();
  36 |   });
  37 | 
  38 |   test("public pages are accessible without auth", async ({ page }) => {
  39 |     // These should NOT redirect
  40 |     await page.goto("/");
  41 |     await expect(page).not.toHaveURL(/\/login/);
  42 | 
  43 |     await page.goto("/about");
  44 |     await expect(page).not.toHaveURL(/\/login/);
  45 | 
  46 |     await page.goto("/articles");
  47 |     await expect(page).not.toHaveURL(/\/login/);
  48 |   });
  49 | });
  50 | 
```