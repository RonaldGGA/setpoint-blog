/**
 * e2e/auth.spec.ts
 * E2E tests for authentication and route protection.
 * Verifies that protected routes redirect unauthenticated users to /login.
 */
import { test, expect } from "@playwright/test";

test.describe("Route protection", () => {
  test("/admin redirects to /login when not authenticated", async ({
    page,
  }) => {
    await page.goto("/admin");
    // Should end up at /login — either direct redirect or after a moment
    await expect(page).toHaveURL(/\/login/);
  });

  test("/reading-list redirects to /login when not authenticated", async ({
    page,
  }) => {
    await page.goto("/reading-list");
    await expect(page).toHaveURL(/\/login/);
  });

  test("/profile redirects to /login when not authenticated", async ({
    page,
  }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/login/);
  });

  test("/login page renders sign in options", async ({ page }) => {
    await page.goto("/login");
    // Login page should have GitHub and Google buttons
    await expect(page.getByText(/GitHub/i)).toBeVisible();
    await expect(page.getByText(/Google/i)).toBeVisible();
  });

  test("public pages are accessible without auth", async ({ page }) => {
    // These should NOT redirect
    await page.goto("/");
    await expect(page).not.toHaveURL(/\/login/);

    await page.goto("/about");
    await expect(page).not.toHaveURL(/\/login/);

    await page.goto("/articles");
    await expect(page).not.toHaveURL(/\/login/);
  });
});
