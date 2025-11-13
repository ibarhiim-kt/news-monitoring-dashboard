"use client";

import { useEffect, useState } from "react";
import NewsCard from "../news/components/NewsCard";
import { supabaseClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ReadingListPage() {
  const [user, setUser] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const router = useRouter();

  // Check Supabase session
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseClient.auth.getSession();
      const currentUser = data.session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const saved = JSON.parse(localStorage.getItem(`readingList_${currentUser.id}`)) || [];
        setReadingList(saved);
      }
    };

    getUser();

    // Optional: subscribe to auth changes
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        const saved = JSON.parse(localStorage.getItem(`readingList_${currentUser.id}`)) || [];
        setReadingList(saved);
      } else {
        setReadingList([]);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Reading List</h1>
        <p className="text-gray-600">
          Please{" "}
          <button
            onClick={() => router.push("/signin")}
            className="text-purple-600 underline"
          >
            sign in
          </button>{" "}
          to view your saved articles.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white py-5 px-6 sm:px-10 md:px-16">
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
