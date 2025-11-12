'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '@/app/lib/fetchNews';
import NewsCard from './NewsCard';
import SkeletonNewsCard from './SkeletonNewsCard';

export default function NewsList() {
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  if (isLoading) return <SkeletonNewsCard />;
  if (isError) return <p>Failed to load news.</p>;

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

