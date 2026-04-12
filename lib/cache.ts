import { redis } from "./redis";

export async function withCache<T>(
  key: string,
  ttl: number,
  fetcher: () => Promise<T>
): Promise<T> {
  if (!redis) {
    console.warn(`⚠️ CACHE DISABLED — ${key}, fetching directly...`);
    return fetcher();
  }

  const cached = await redis.get<T>(key);
  if (cached) {
    console.log(`✅ CACHE HIT — ${key}`);
    return cached;
  }

  console.log(`❌ CACHE MISS — ${key}, fetching...`);
  const data = await fetcher();
  await redis.set(key, data, { ex: ttl });
  return data;
}
