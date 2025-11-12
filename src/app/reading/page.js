'use client';
import { useEffect, useState } from 'react';
import ReadingCard from './components/ReadingCard';
import { fetchNews } from '../lib/fetchNews'; // ✅ adjust path as needed

export default function ReadingPage() {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const articles = await fetchNews();
      setSaved(articles); // later replace with user-saved ones
      setLoading(false);
    }
    loadNews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">Loading articles...</section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6 sm:px-10 md:px-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          My Reading List
        </h2>

        {saved.length === 0 ? (
          <p className="text-gray-500">Your reading list is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saved.map((article) => (
              <ReadingCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
