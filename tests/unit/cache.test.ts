/**
 * tests/unit/cache.test.ts
 * Unit tests for lib/cache.ts — withCache logic
 *
 * Strategy: mock @upstash/redis so tests don't need a real Redis instance.
 * The mock simulates get/set behavior in memory.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock @upstash/redis ──────────────────────────────────────────────────────
// We intercept the redis module before importing withCache.
// This is the standard Vitest pattern for mocking external dependencies.
// The mock stores values in a plain JS Map — no network needed.

const store = new Map<string, unknown>();

vi.mock("@/lib/redis", () => ({
  redis: {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    set: vi.fn(async (key: string, value: unknown) => {
      store.set(key, value);
      return "OK";
    }),
  },
}));

// Import AFTER mock is set up
import { withCache } from "@/lib/cache";

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("withCache", () => {
  beforeEach(() => {
    // Clear the in-memory store and reset call counts before each test
    store.clear();
    vi.clearAllMocks();
  });

  it("calls fetcher on CACHE MISS and returns the data", async () => {
    const fetcher = vi.fn().mockResolvedValue({ title: "Test Article" });

    const result = await withCache("article:test", 300, fetcher);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ title: "Test Article" });
  });

  it("does NOT call fetcher on CACHE HIT", async () => {
    // Pre-populate the store — simulates a previous cache set
    store.set("article:cached", { title: "Cached Article" });

    const fetcher = vi.fn().mockResolvedValue({ title: "Fresh Article" });

    const result = await withCache("article:cached", 300, fetcher);

    // Fetcher should never be called — data came from cache
    expect(fetcher).not.toHaveBeenCalled();
    expect(result).toEqual({ title: "Cached Article" });
  });

  it("stores fetcher result in Redis after a MISS", async () => {
    const { redis } = await import("@/lib/redis");
    const fetcher = vi.fn().mockResolvedValue({ title: "New Article" });

    await withCache("article:new", 300, fetcher);

    // redis.set should have been called with the key and the fetched data
    expect(redis.set).toHaveBeenCalledWith(
      "article:new",
      { title: "New Article" },
      { ex: 300 }
    );
  });

  it("returns correct data type — works with strings", async () => {
    const fetcher = vi.fn().mockResolvedValue("simple string value");
    const result = await withCache("key:string", 60, fetcher);
    expect(result).toBe("simple string value");
  });

  it("returns correct data type — works with arrays", async () => {
    const articles = [{ slug: "a" }, { slug: "b" }];
    const fetcher = vi.fn().mockResolvedValue(articles);
    const result = await withCache("home:latest", 60, fetcher);
    expect(result).toEqual(articles);
  });

  it("uses TTL passed as argument when calling redis.set", async () => {
    const { redis } = await import("@/lib/redis");
    const fetcher = vi.fn().mockResolvedValue("data");

    await withCache("key:ttl-test", 600, fetcher); // 600s TTL

    expect(redis.set).toHaveBeenCalledWith("key:ttl-test", "data", { ex: 600 });
  });
});
