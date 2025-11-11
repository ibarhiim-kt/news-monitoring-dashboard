// news/components/NewsCard.js
"use client";
import React from "react";
import Link from "next/link";

const NewsCard = ({ article }) => {
  return (
    <Link
      href={article.link}
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Background image */}
      <div
        className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${article.image})` }}
      ></div>

      {/* Overlay content */}
      <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-4">
        <span className="text-sm font-medium text-purple-600">
          {article.source}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {article.summary}
        </p>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
