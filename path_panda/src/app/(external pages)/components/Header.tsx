'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f9f7fe]/90 backdrop-blur-xl border-b border-white/30">
      {/* Matches Hero's starting color exactly */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[#7a5e46]"
          >
            PathPanda
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2d2d2f]/70 font-medium text-lg tracking-wide transition-all duration-300 hover:text-[#7a5e46] hover:scale-110 origin-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA – clean & minimal */}
          <div className="hidden md:block">
            <Link
              href="/get-started"
              className="px-8 py-4 bg-[#7a5e46] text-white font-semibold rounded-full transition-all duration-300 transform hover:bg-[#6b513b] hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-lg hover:bg-[#7a5e46]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7 text-[#2d2d2f]" />
            ) : (
              <Menu className="w-7 h-7 text-[#2d2d2f]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-6 space-y-5 border-t border-[#7a5e46]/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-medium text-[#2d2d2f]/70 hover:text-[#7a5e46] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full mt-6 py-4 bg-[#7a5e46] text-white text-center font-semibold rounded-full hover:bg-[#6b513b] transition-all"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
