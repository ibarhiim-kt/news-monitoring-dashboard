'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabaseClient } from '../lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check session on mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setUser(data.session?.user || null);
    };
    getUser();

    // Subscribe to auth changes
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();

    window.location.href = '/'
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <div className="text-3xl font-bold text-purple-600">Buletin</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-gray-900">Stories</a>
          <a href="#" className="hover:text-gray-900">Creator</a>
          <a href="#" className="hover:text-gray-900">Community</a>
          <a href="#" className="hover:text-gray-900">Subscribe</a>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition"
              >
                Logout
              </button>

              <Image
                src="/globe.svg" // replace with your profile image
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full"
              />
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/signin')}
                className="cursor-pointer bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="cursor-pointer bg-white border border-purple-600 text-purple-600 px-3 py-1 rounded-lg text-sm hover:bg-purple-50 transition"
              >
                Sign Up
              </button>
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden px-6 pb-4 flex flex-col space-y-2 text-gray-700 font-medium">
          <a href="#" className="hover:text-gray-900">Stories</a>
          <a href="#" className="hover:text-gray-900">Creator</a>
          <a href="#" className="hover:text-gray-900">Community</a>
          <a href="#" className="hover:text-gray-900">Subscribe</a>
        </nav>
      )}
    </nav>
  );
}
