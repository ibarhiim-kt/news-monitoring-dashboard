

export async function fetchNews() {
  try {
    const res = await fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2025-10-11&sortBy=publishedAt&apiKey=acdebd2609b14bf3a5cb102855dcf613",
      { next: { revalidate: 3600 } } // cache for 1 hour
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news articles");
    }

    const data = await res.json();

    return data.articles.slice(0, 12).map((article, index) => ({
      id: index,
      title: article.title || "Untitled Article",
      summary: article.description || "No description available.",
      author: article.author || "Unknown Author",
      source: article.source?.name || "Unknown Source",
      date: new Date(article.publishedAt).toLocaleDateString(),
      image: article.urlToImage || "/file.svg", // fallback image
      link: article.url || "#",
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
