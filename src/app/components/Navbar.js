'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { supabaseClient } from '../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

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

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    window.location.href = '/';
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
        <div className="flex items-center space-x-4 relative">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile trigger */}
              <div className='flex items-center space-x-2'>
               
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer flex items-center space-x-2 focus:outline-none"
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 font-medium">
                  {user.user_metadata?.full_name || user.email}
                </span>                
              
              </button>
               
               <Image
                  src={user.user_metadata?.avatar_url || '/globe.svg'}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              </div>
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
