// news/page.js
import NewsList from "./components/NewsList";
import { Suspense } from 'react';

import { fetchNews } from '../lib/fetchNews';
import SkeletonNewsCard from './components/SkeletonNewsCard';


export default async function NewsPage() {

const articles = await fetchNews();
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
