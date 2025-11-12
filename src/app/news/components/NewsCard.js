// news/components/NewsCard.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser} from "@clerk/nextjs";
import { useNewsStore } from "@/app/store/newStore";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

const NewsCard = ({ article }) => {
  const setSelectedArticle = useNewsStore((state) => state.setSelectedArticle);

  const handleClick = () => {
    setSelectedArticle(article); // save article in store
  };
  const { user, isSignedIn } = useUser();
  const [saved, setSaved] = useState(false);

  // Use a user-specific key for storage
  const storageKey = user ? `readingList_${user.id}` : "readingList_guest";

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem(storageKey)) || [];
    const isAlreadySaved = savedArticles.some((a) => a.link === article.link);
    setSaved(isAlreadySaved);
  }, [article.link, storageKey]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!isSignedIn) {

     window.location.href = "https://factual-quail-9.accounts.dev/sign-in";
      return;
    }

    let savedArticles = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (!saved) {
      savedArticles.push(article);
      localStorage.setItem(storageKey, JSON.stringify(savedArticles));
      setSaved(true);
    } else {
      savedArticles = savedArticles.filter((a) => a.link !== article.link);
      localStorage.setItem(storageKey, JSON.stringify(savedArticles));
      setSaved(false);
    }
  };

  return (
    <Link

      href={{
        pathname:'/news-details',
        query:{title:article.title}}}
      onClick={handleClick}
      
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div
        className="h-96 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${article.image})` }}
      ></div>

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

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`cursor-pointer mt-3 flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            saved
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {saved ? (
            <BookmarkSolidIcon className="w-5 h-5" />
          ) : (
            <BookmarkIcon className="w-5 h-5" />
          )}
          {isSignedIn ? (saved ? "Saved" : "Save") : "Log in to Save"}
        </button>
      </div>
    </Link>
  );
};

export default NewsCard;
