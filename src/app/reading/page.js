// app/reading/page.js
"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import NewsCard from "../news/components/NewsCard";

export default function ReadingListPage() {
  const { user, isSignedIn } = useUser();
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    if (!isSignedIn) return;
    const saved = JSON.parse(localStorage.getItem(`readingList_${user.id}`)) || [];
    setReadingList(saved);
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Reading List</h1>
        <p className="text-gray-600">
          Please <a href="https://factual-quail-9.accounts.dev/sign-in" className="text-purple-600 underline">sign in</a> to view your saved articles.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white py-5 px-6 sm:px-10 md:px-16  ">
      <h1 className="text-3xl md:text-4xl font-bold mb-12">Your Reading List</h1>
      {readingList.length === 0 ? (
        <p className="text-gray-500">You haven’t saved any articles yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {readingList.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
