'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Panda, LogOut } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="border-b border-[#d4a574] bg-[#f5f4f7] sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]">
              <Panda className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent">
              PathPanda
            </span>
          </div>

          {/* Navigation Links */}
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
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {/* Email */}
          <p className="text-sm text-gray-600 hover:underline hover:text-black transition cursor-default">
            user@example.com
          </p>

          {/* Sign Out button */}
          <button className="flex items-center gap-2 text-gray-600 hover:text-[#d4a574] transition font-medium text-sm cursor-pointer">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
