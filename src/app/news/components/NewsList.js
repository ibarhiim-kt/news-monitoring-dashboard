// news/components/NewsList.js
"use client";
import React from "react";
import NewsCard from "./NewsCard";

const NewsList = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
