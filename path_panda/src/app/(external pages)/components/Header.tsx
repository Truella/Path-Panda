'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Panda } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../../../hooks/useAuth';
import LogoutButton from '../../../../components/auth/LogoutButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f5f4f7] border-b border-[#d4a574]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]">
              <Panda className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent">
              PathPanda
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium text-lg tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'text-[#a67c52] font-bold'
                      : 'text-gray-600 hover:text-[#d4a574]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-gradient-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white font-semibold rounded-full transition-all duration-300 transform hover:opacity-90 hover:scale-105 shadow-sm"
                >
                  Back to Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link
                href="/get-started"
                className="px-8 py-4 bg-gradient-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white font-semibold rounded-full transition-all duration-300 transform hover:opacity-90 hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-lg text-gray-600 hover:text-[#a67c52] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-6 space-y-5 border-t border-[#d4a574]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-xl font-medium transition-all duration-300 ${
                    isActive ? 'text-[#a67c52] font-bold' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4">
              {isAuthenticated ? (
                <div className='flex flex-col gap-4'>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-4 bg-gradient-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white text-center font-semibold rounded-full hover:opacity-90 transition-all"
                  >
                    Back to Dashboard
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  href="/get-started"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 bg-gradient-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white text-center font-semibold rounded-full hover:opacity-90 transition-all"
                >
                  Get Started
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}