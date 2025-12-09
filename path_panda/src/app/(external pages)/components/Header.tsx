"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/docs", label: "Docs" },
  ]

  return (
    <header className="bg-[#f9f7fe] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-[#2d2d2f] hover:opacity-80 transition-opacity duration-300"
          >
            🐼 PathPanda
          </Link>

          {/* Center: Navigation Menu - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2d2d2f] hover:underline hover:underline-offset-2 transition-all duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Get Started Button */}
          <div className="hidden md:flex">
            <Link
              href="/get-started"
              className="bg-[#7a5e46] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6a4e36] transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#2d2d2f] hover:opacity-70 transition-opacity"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-[#e0dce8]">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#2d2d2f] hover:text-[#7a5e46] transition-colors duration-300 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/get-started"
                className="bg-[#7a5e46] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#6a4e36] transition-all duration-300 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
