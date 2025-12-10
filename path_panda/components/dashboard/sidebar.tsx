'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Home, Map, LogOut, Panda } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from '../../db/supabaseClient';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const getInitials = (email: string | undefined) => {
    if (!email) return '';
    const parts = email.split('@')[0].split('.');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out. Please try again.');
    } else {
      toast.success('Logged out successfully!');
      router.push('/get-started');
    }
  };

  return (
    <aside className="w-64 bg-gray-100 text-gray-900 flex flex-col border-r">
      {/* Logo */}
      <div className="p-7">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
            <Panda className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">PathPanda</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        {!loading && user ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center font-bold text-white">
              {getInitials(user.email)}
            </div>
            <p className="font-semibold text-sm text-gray-900 truncate">{user.email}</p>
          </div>
        ) : (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        <NavItem href="/dashboard" icon={<Home className="w-5 h-5" />} label="Dashboard" currentPath={pathname} />
        <NavItem href="/dashboard/tours" icon={<Map className="w-5 h-5" />} label="Tours" currentPath={pathname} />
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 space-y-2">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-gray-700 hover:bg-gray-200`}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
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

