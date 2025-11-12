// app/news/[id]/page.js
'use client';

import { useNewsStore } from '../store/newStore';
import Link from 'next/link';

export default function NewsDetail() {
  // Sample data for now
  const selectedArticle = useNewsStore((state) => state.selectedArticle);

  if (!selectedArticle) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        No article selected.
      </div>
    );
  }
  
  return (
    
    
    <div  className="min-h-screen bg-gray-50 flex justify-center items-start p-4">
       <div className="left-3 absolute">
    <Link
      href="/"
      className="bg-gray-200 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition"
    >
      Back
    </Link>
  </div>
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Image */}
        <div className="w-full h-64 sm:h-80 md:h-96 relative">
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            fill
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
          <p className="text-gray-700 text-base sm:text-lg mb-6">{selectedArticle.summary}</p>

          <div className="flex flex-col sm:flex-row sm:justify-between text-gray-500 text-sm sm:text-base">
            <span>Author: {selectedArticle.author}</span>
            <span>Source: {selectedArticle.source}</span>
            <span>Date: {selectedArticle.date}</span>
          </div>
        </div>
      </div>
    </div>
    
  );
}
