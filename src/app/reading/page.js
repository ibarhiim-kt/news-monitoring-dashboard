"use client";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/app/lib/supabase/client";
import NewsCard from "@/app/news/components/NewsCard"; 
import SkeletonNewsCard from '@/app/news/components/SkeletonNewsCard';

const SavedNews = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setUser(data.session?.user || null);
    };
    fetchUser();
  }, []);

  
  useEffect(() => {
    if (!user) return;

    const fetchSavedArticles = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("saved_articles")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching saved articles:", error);
      } else {
        setSavedArticles(data);
      }
      setLoading(false);
    };

    fetchSavedArticles();
  }, [user]);


  if (loading) return <SkeletonNewsCard />;

  
  if (!savedArticles.length) return <p className="py-5 px-6 sm:px-10 md:px-16">No saved articles yet.</p>;

  return (
    
       <div className="py-5 px-6 sm:px-10 md:px-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {savedArticles.map((article) => (
        <NewsCard key={article.link} article={article} />
      ))}
    </div>
    
 
  );
};

export default SavedNews;
