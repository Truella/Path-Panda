'use client';

import { useState } from 'react';
import { Plus, Map, Zap, Eye } from 'lucide-react';
import { Sidebar } from '../../../../components/dashboard/sidebar';
import { StatsCard } from '../../../../components/dashboard/stats-card';
import { TourCard } from '../../../../components/dashboard/tour-card';
import { mockTours } from '../../../../constants/mockTours';

export default function Dashboard() {
  const [tours, setTours] = useState(mockTours);

  const handleDeleteTour = (id: string) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-gray-200 bg-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Your Tour Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Create and manage engaging onboarding experiences
              </p>
            </div>
          </div>
        </header>

        <div className="p-8 bg-gray-50">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Active Tours"
              value="12"
              change="+3 this month"
              icon={<Map className="w-6 h-6" />}
              bgColor="bg-amber-100"
              textColor="text-amber-700"
            />
            <StatsCard
              title="Total Views"
              value="2,847"
              change="+456 this week"
              icon={<Eye className="w-6 h-6" />}
              bgColor="bg-gray-100"
              textColor="text-gray-700"
            />
            <StatsCard
              title="Completion Rate"
              value="71%"
              change="+5% vs last month"
              icon={<Zap className="w-6 h-6" />}
              bgColor="bg-green-50"
              textColor="text-green-700"
            />
          </div>

            {/* Tours Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Tours</h2>
                <button className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition">
                  <Plus className="w-5 h-5" />
                  Create Tour
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onDelete={() => handleDeleteTour(tour.id)}
                  />
                ))}
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
