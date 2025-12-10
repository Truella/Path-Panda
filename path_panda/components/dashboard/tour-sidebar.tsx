'use client';

import { FilePlus2, ListChecks, ChevronRight } from 'lucide-react';

interface TourSidebarProps {
  active: 'details' | 'steps';
}

export function TourSidebar({ active }: TourSidebarProps) {
  return (
    <aside className="w-64 p-6 hidden md:block mt-45">
      <div className="space-y-2">
        {/* Section 1 - Tour Details */}
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            active === 'details'
              ? 'bg-gray-100 font-semibold text-black'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <FilePlus2 className="w-5 h-5 shrink-0" />
          <span className="text-sm">Tour Details</span>
          {active === 'details' && (
            <ChevronRight className="w-4 h-4 ml-auto" />
          )}
        </div>

        {/* Connector Line */}
        <div className="flex justify-start pl-6">
          <div className="w-0.5 h-4 bg-gray-200"></div>
        </div>

        {/* Section 2 - Create Tour Steps */}
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            active === 'steps'
              ? 'bg-gray-100 font-semibold text-black'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ListChecks className="w-5 h-5 shrink-0" />
          <span className="text-sm">Create Tour Steps</span>
          {active === 'steps' && (
            <ChevronRight className="w-4 h-4 ml-auto" />
          )}
        </div>
      </div>
    </aside>
  );
}