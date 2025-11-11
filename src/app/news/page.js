// news/page.js
import NewsList from "./components/NewsList";
import { Suspense } from 'react';
import SkeletonNewsCard from './components/SkeletonNewsCard';

export default async function NewsPage() {
  // Simulated API data — replace this with your API later
//   const articles = [
//     {
//       id: 1,
//       title: "Wanderlust Unleashed: Top Hidden Gems You Must Visit This Year",
//       summary:
//         "Discover unique, off-the-radar destinations around the world that offer unforgettable experiences.",
//       author: "Jhon Doe",
//       source: "Design",
//       date: "July 20, 2024",
//       image: "/file.svg",
//       link: "#",
//     },
//     {
//       id: 2,
//       title: "Travel Bucket List: 25 Destinations for Every Adventurer",
//       summary:
//         "Explore a curated list of must-visit places for every kind of traveler.",
//       author: "Jhon Doe",
//       source: "Sustainability",
//       date: "July 5, 2024",
//       image: "/file.svg",
//       link: "#",
//     },
//     {
//       id: 3,
//       title: "How to Travel Like a Local: Insider Tips for Authentic Experiences",
//       summary:
//         "Learn how to immerse yourself in the culture of each place you visit.",
//       author: "Jhon Doe",
//       source: "Cultural Insights",
//       date: "June 30, 2024",
//       image: "/file.svg",
//       link: "#",
//     },
//     {
//       id: 4,
//       title: "Escape the Ordinary: Unique Stays Around the World",
//       summary:
//         "This guide highlights one-of-a-kind accommodations that go beyond the usual hotels.",
//       author: "Jhon Doe",
//       source: "Environmental Awareness",
//       date: "June 25, 2024",
//       image: "/file.svg",
//       link: "#",
//     },
//   ];
const res = await fetch(
    "https://newsapi.org/v2/everything?q=tesla&from=2025-10-11&sortBy=publishedAt&apiKey=acdebd2609b14bf3a5cb102855dcf613",
    { next: { revalidate: 3600 } } // cache for 1 hour
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news articles");
  }

  const data = await res.json();

  // Take first 12 articles for display
  const articles = data.articles.slice(0, 12).map((article, index) => ({
    id: index,
    title: article.title || "Untitled Article",
    summary: article.description || "No description available.",
    author: article.author || "Unknown Author",
    source: article.source?.name || "Unknown Source",
    date: new Date(article.publishedAt).toLocaleDateString(),
    image: article.urlToImage || "/file.svg", // fallback to your public file.svg
    link: article.url || "#",
  }));

  return (
    <section className="bg-white py-5 px-6 sm:px-10 md:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Trending News
        </h2>
        <Suspense fallback={<SkeletonNewsCard />}>
          <NewsList articles={articles} />
        </Suspense>
      </div>
    </section>
  );
}
