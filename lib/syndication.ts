export async function adaptArticleWithAI(article: {
  title: string;
  excerpt: string;
  body: string;
  slug: string;
}): Promise<string> {
  const prompt = `You are helping Ronald González, a Full-Stack Developer and Automation Engineering student, adapt a technical article for Hashnode.

Keep his voice: technical, clear, practical. Never change facts or code.

Original article:
Title: ${article.title}
Excerpt: ${article.excerpt}
Content: ${article.body}

Instructions:
- Write a slightly different intro (2-3 sentences) mentioning this was originally published at setpoint.vercel.app
- Keep the rest of the article exactly the same
- Return only the article content in markdown, nothing else`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const content = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (content) {
      console.log("✅ Gemini adapted the article");
      return content;
    }
  } catch (error) {
    console.warn("⚠️ Gemini failed, trying OpenRouter...", error);
  }

  const openRouterRes = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );

  const openRouterData = await openRouterRes.json();
  const fallbackContent = openRouterData?.choices?.[0]?.message?.content;

  if (!fallbackContent) {
    throw new Error("Both Gemini and OpenRouter failed");
  }

  console.log("✅ OpenRouter adapted the article");
  return fallbackContent;
}
