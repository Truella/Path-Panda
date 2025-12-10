import Link from "next/link"

export default function Footer() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/docs", label: "Docs" },
  ]

  return (
    <footer className="relative bg-[#f9f7fe] border-t border-[#e0dce8]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6 z-10">
        <nav className="flex flex-wrap gap-6 text-[#2d2d2f] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#7a5e46] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-[#2d2d2f]/70 text-center md:text-right">
          &copy; {new Date().getFullYear()} PathPanda. All rights reserved.
        </p>
      </div>

      <p className="absolute bottom-0 left-0 w-full text-center text-[#2d2d2f]/10 font-extrabold text-6xl pointer-events-none">
        PathPanda
      </p>
    </footer>
  )
}
