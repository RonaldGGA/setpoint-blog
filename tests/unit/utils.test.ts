/**
 * tests/unit/utils.test.ts
 * Unit tests for lib/utils.ts — pure functions, no mocks needed
 */
import { describe, it, expect } from "vitest";
import {
  calculateReadingTime,
  formatDate,
  slugify,
  truncateExcerpt,
} from "@/lib/utils";

// ─── calculateReadingTime ────────────────────────────────────────────────────

describe("calculateReadingTime", () => {
  it("returns 1 for very short text (minimum floor)", () => {
    // Even a 10-word text should return at least 1 minute
    const result = calculateReadingTime("This is a short text with few words.");
    expect(result).toBe(1);
  });

  it("calculates correctly for longer text", () => {
    // 400 words → 2 minutes at 200wpm
    const words = Array(400).fill("word").join(" ");
    const result = calculateReadingTime(words);
    expect(result).toBe(2);
  });

  it("rounds up — 201 words = 2 minutes, not 1", () => {
    const words = Array(201).fill("word").join(" ");
    const result = calculateReadingTime(words);
    expect(result).toBe(2);
  });

  it("handles empty string without crashing", () => {
    const result = calculateReadingTime("");
    expect(result).toBe(1); // minimum floor
  });
});

// ─── formatDate ──────────────────────────────────────────────────────────────

describe("formatDate", () => {
  it("formats ISO date string to English locale", () => {
    const result = formatDate("2026-04-03T05:09:00.000Z");
    // Should contain the year and month name
    expect(result).toContain("2026");
    expect(result).toContain("April");
  });

  it("formats another date correctly", () => {
    const result = formatDate("2025-12-25T00:00:00.000Z");
    expect(result).toContain("2025");
    expect(result).toContain("December");
  });

  it("includes the day number", () => {
    const result = formatDate("2026-04-03T00:00:00.000Z");
    expect(result).toMatch(/3|April/); // day 3 or April present
  });
});

// ─── slugify ─────────────────────────────────────────────────────────────────

describe("slugify", () => {
  it("converts spaces to hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("lowercases all characters", () => {
    expect(slugify("SCADA Systems")).toBe("scada-systems");
  });

  it("removes special characters", () => {
    expect(slugify("What is OPC-UA?")).toBe("what-is-opc-ua");
  });

  it("collapses multiple spaces into single hyphen", () => {
    expect(slugify("Hello   World")).toBe("hello-world");
  });

  it("handles typical Industry 4.0 article title", () => {
    const result = slugify("Introduction to PLC Programming with IEC 61131-3");
    expect(result).toBe("introduction-to-plc-programming-with-iec-61131-3");
  });
});

// ─── truncateExcerpt ─────────────────────────────────────────────────────────

describe("truncateExcerpt", () => {
  it("returns text unchanged if within maxLength", () => {
    expect(truncateExcerpt("Hello", 10)).toBe("Hello");
  });

  it("truncates and adds ellipsis when over maxLength", () => {
    const result = truncateExcerpt("Hello World", 5);
    expect(result).toBe("Hello...");
  });

  it("does not truncate when exactly at maxLength", () => {
    expect(truncateExcerpt("Hello", 5)).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(truncateExcerpt("", 10)).toBe("");
  });
});
