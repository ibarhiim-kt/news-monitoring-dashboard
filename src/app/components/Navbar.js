// components/Header.jsx
'use client'
import { useState } from 'react';
import AuthButton from './AuthButtons';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Right side: Profile + Mobile Menu Button */}
        
        <div className="flex items-center space-x-4">
          <AuthButton />
          <Image
            src="/globe.svg" // replace with your profile image in /public
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full"
          />

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