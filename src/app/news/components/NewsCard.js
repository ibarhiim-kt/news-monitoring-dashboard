"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabaseClient } from "@/app/lib/supabase/client";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";
import { useNewsStore } from "@/app/store/newStore";

const NewsCard = ({ article }) => {
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);
  const setSelectedArticle = useNewsStore((state) => state.setSelectedArticle);

  const handleClick = () => {
    setSelectedArticle(article); 
  };

  useEffect(() => {
    const session = supabaseClient.auth.getSession();
    session.then(({ data }) => setUser(data.session?.user || null));
  }, []);

   useEffect(() => {
  if (!user) return; 

  const fetchSaved = async () => {
    const { data, error } = await supabaseClient
      .from("saved_articles")
      .select("link")
      .eq("user_id", user.id)
      .eq("link", article.link)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error("Error checking saved article:", error);
    }

    setSaved(!!data);
  };

  fetchSaved();
}, [article.link, user]);


  const handleSave = async (e) => {
  e.preventDefault();

  if (!user) {
    window.location.href = "/signin";
    return;
  }

  if (!saved) {
    const { data, error } = await supabaseClient
      .from("saved_articles")
      .insert([
        {
          user_id: user.id,
          title: article.title,
          summary: article.summary,
          link: article.link,
          image: article.image,
          source: article.source,
          author: article.author,
          date: article.date,
        },
      ]);

    if (error) console.error("Error saving article:", error);
    else setSaved(true);
  } else {
    const { error } = await supabaseClient
      .from("saved_articles")
      .delete()
      .eq("user_id", user.id)
      .eq("link", article.link);

    if (error) console.error("Error removing article:", error);
    else setSaved(false);
  }
};

  return (
    
    <Link
      href={{
        pathname: "/news-details",
        query: { title: article.title },
      }}
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
          {user ? (saved ? "Saved" : "Save") : "Log in to Save"}
        </button>
      </div>
    </Link>
  );
};

export default NewsCard;
