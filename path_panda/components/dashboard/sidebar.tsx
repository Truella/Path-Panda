'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Home, Map, LogOut, Panda } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname(); // current path

  return (
    <aside className="w-64 bg-gray-100 text-gray-900 flex flex-col border-r">
      {/* Logo */}
      <div className="p-7">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
            <Panda className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">PathPanda</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center font-bold text-white">
            JD
          </div>
          <p className="font-semibold text-sm text-gray-900">Company Name</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        <NavItem href="/dashboard" icon={<Home className="w-5 h-5" />} label="Dashboard" currentPath={pathname} />
        <NavItem href="/dashboard/tours" icon={<Map className="w-5 h-5" />} label="Tours" currentPath={pathname} />
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 space-y-2">
        <NavItem href="/logout" icon={<LogOut className="w-5 h-5" />} label="Logout" currentPath={pathname} />
      </div>
    </aside>
  );
}

function NavItem({
  href,
  icon,
  label,
  currentPath,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        isActive ? "bg-amber-700 text-white" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
