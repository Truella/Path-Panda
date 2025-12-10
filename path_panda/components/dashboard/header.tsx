'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Panda, LogOut, Menu, X } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="border-b border-[#d4a574] bg-[#f5f4f7] sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]">
            <Panda className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent">
            PathPanda
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 transition font-medium text-sm border-b ${
                isActive('/dashboard')
                  ? 'border-b-[#a67c52] text-[#a67c52]'
                  : 'border-b-transparent text-gray-600 hover:border-b-[#d4a574] hover:text-[#d4a574]'
              }`}
            >
              Analytics
            </Link>
            <Link
              href="/dashboard/tours"
              className={`px-4 py-2 transition font-medium text-sm border-b ${
                isActive('/dashboard/tours')
                  ? 'border-b-[#a67c52] text-[#a67c52]'
                  : 'border-b-transparent text-gray-600 hover:border-b-[#d4a574] hover:text-[#d4a574]'
              }`}
            >
              Tours
            </Link>
          </nav>

          {/* Desktop User Section */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600 hover:underline hover:text-black transition cursor-default">
              user@example.com
            </p>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#d4a574] transition font-medium text-sm cursor-pointer">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-600 hover:text-[#a67c52] transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d4a574] bg-[#f5f4f7]">
          <nav className="flex flex-col px-4 py-2">
            <Link
              href="/dashboard"
              onClick={closeMobileMenu}
              className={`px-4 py-3 transition font-medium text-sm border-l-4 ${
                isActive('/dashboard')
                  ? 'border-l-[#a67c52] text-[#a67c52] bg-white/50'
                  : 'border-l-transparent text-gray-600 hover:border-l-[#d4a574] hover:text-[#d4a574] hover:bg-white/30'
              }`}
            >
              Analytics
            </Link>
            <Link
              href="/dashboard/tours"
              onClick={closeMobileMenu}
              className={`px-4 py-3 transition font-medium text-sm border-l-4 ${
                isActive('/dashboard/tours')
                  ? 'border-l-[#a67c52] text-[#a67c52] bg-white/50'
                  : 'border-l-transparent text-gray-600 hover:border-l-[#d4a574] hover:text-[#d4a574] hover:bg-white/30'
              }`}
            >
              Tours
            </Link>
          </nav>

          {/* Mobile User Section */}
          <div className="flex flex-col px-4 py-3 border-t border-[#d4a574]/30 gap-2">
            <p className="text-sm text-gray-600 px-4">
              user@example.com
            </p>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#d4a574] transition font-medium text-sm px-4 py-2 hover:bg-white/30 rounded">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}