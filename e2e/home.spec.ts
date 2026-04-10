/**
 * e2e/home.spec.ts
 * E2E tests for the Setpoint home page.
 * Playwright opens a real browser and navigates to the running app.
 */
import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and has Setpoint in the title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Setpoint/);
  });

  test("renders the navbar", async ({ page }) => {
    await page.goto("/");
    // Navbar should have the Setpoint logo/brand link
    const navbar = page.getByRole("navigation");
    await expect(navbar).toBeVisible();
  });

  test("renders at least one article card", async ({ page }) => {
    await page.goto("/");
    // Article cards link to /articles/[slug]
    // We look for any anchor that starts with /articles/
    const articleLinks = page.locator('a[href^="/articles/"]');
    await expect(articleLinks.first()).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo"); // <footer> has contentinfo role
    await expect(footer).toBeVisible();
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    // Allow cache HIT/MISS logs but no JS errors
    expect(errors).toHaveLength(0);
  });
});
