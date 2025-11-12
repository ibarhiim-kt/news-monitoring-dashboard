"use client"; // important for using hooks

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname(); // get current path

  return (
    <header className="bg-white pt-16 pb-5 px-4 sm:px-8 md:px-16">
      <div className="container mx-auto text-center">
        <p className="inline-block bg-gray-200 rounded px-2 py-1 mb-2">
          Latest Articles
        </p>    
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Discover our latest news
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the achievements that set us apart. From groundbreaking
          projects to industry accolades, we take pride in our accomplishments.
        </p>

        <div className="mt-6 space-x-4">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg inline-block ${
              pathname === "/"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            News
          </Link>
          <Link
            href="/reading"
            className={`px-4 py-2 rounded-lg inline-block ${
              pathname === "/reading"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Reading List
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
