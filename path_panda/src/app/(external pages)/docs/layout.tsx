'use client';

import { useState } from "react";
import DocsSidebar from "../../../../components/docs/DocsSidebar";
import OnThisPageSidebar from "../../../../components/docs/OnThisPageSidebar";
import { Menu, X } from 'lucide-react';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile Header with Toggles */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b p-4 flex items-center justify-between">
        <button onClick={() => setIsNavOpen(true)} className="flex items-center gap-2 font-semibold">
          <Menu className="w-5 h-5" />
          Menu
        </button>
        <button onClick={() => setIsTocOpen(true)} className="flex items-center gap-2 font-semibold">
          On this page
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-20 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Left Sidebar - Main Navigation */}
        <aside className={`fixed left-0 right-0 bottom-0 top-[69px] z-50 bg-white overflow-y-auto lg:bg-transparent lg:static lg:block lg:col-span-2 lg:border-r ${isNavOpen ? 'block' : 'hidden'}`}>
          <div className="lg:sticky lg:top-8 p-8">
            <button onClick={() => setIsNavOpen(false)} className="lg:hidden absolute top-4 right-4 p-2">
              <X className="w-6 h-6" />
            </button>
            <DocsSidebar onLinkClick={() => setIsNavOpen(false)} />
          </div>
        </aside>

        {/* Center - Main Content */}
        <main className="col-span-1 lg:col-span-8 p-8">
          {children}
        </main>

        {/* Right Sidebar - On This Page */}
        <aside className={`fixed left-0 right-0 bottom-0 top-[69px] z-50 bg-white overflow-y-auto lg:bg-transparent lg:static lg:block lg:col-span-2 lg:border-l ${isTocOpen ? 'block' : 'hidden'}`}>
          <div className="lg:sticky lg:top-8 p-8">
            <button onClick={() => setIsTocOpen(false)} className="lg:hidden absolute top-4 right-4 p-2">
              <X className="w-6 h-6" />
            </button>
            <OnThisPageSidebar onLinkClick={() => setIsTocOpen(false)} />
          </div>
        </aside>
      </div>
    </div>
  );
}
