let cachedNews = null;
let lastFetched = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function fetchNews() {
  const now = new Date();

  // Serve cached data if it's still fresh
  if (cachedNews && lastFetched && (now - lastFetched) < CACHE_DURATION) {
    console.log("Serving news from cache");
    return cachedNews;
  }

  // Fetch new data from NewsAPI
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  console.log("Fetching news from NewsAPI with key:", apiKey);

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch news articles: ${res.status}`);
    }

    const data = await res.json();

    // Transform data into your format
    const articles = data.articles.slice(0, 12).map((article, index) => ({
      id: index,
      title: article.title || "Untitled Article",
      summary: article.description || "No description available.",
      author: article.author || "Unknown Author",
      source: article.source?.name || "Unknown Source",
      date: new Date(article.publishedAt).toLocaleDateString(),
      image: article.urlToImage || "/file.svg",
      link: article.url || "#",
    }));

    // Cache the result
    cachedNews = articles;
    lastFetched = new Date();

    console.log("News fetched and cached");
    return articles;
  } catch (error) {
    console.error(error);
    // If cache exists, serve stale cache even if fetch failed
    if (cachedNews) {
      console.log("Serving stale cached news due to fetch error");
      return cachedNews;
    }
    return [];
  }
}
