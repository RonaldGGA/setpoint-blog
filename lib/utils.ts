import type { ImageLoaderProps } from "next/image";

/**
 * lib/utils.ts
 * Pure utility functions — no side effects, easy to test
 */

/**
 * Calculates estimated reading time in minutes.
 * Based on average adult reading speed of 200 words per minute.
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

/**
 * Formats a date string to English locale.
 * Example: "2026-04-03T05:09:00.000Z" → "April 3, 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Converts a title string to a URL-safe slug.
 * Example: "Hello World! This is a Test" → "hello-world-this-is-a-test"
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Truncates text to a maximum length, adding ellipsis if needed.
 * Example: truncateExcerpt("Hello world", 5) → "Hello..."
 */
export function truncateExcerpt(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function contentfulImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const url = src.startsWith("//") ? `https:${src}` : src;

  const base = url.split("?")[0];

  return `${base}?w=${width}&fm=webp&q=${quality ?? 75}&fit=fill`;
}
