'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Sidebar } from '../../../../../components/dashboard/sidebar';
import { TourCard } from '../../../../../components/dashboard/tour-card';
import { CreateTourModal } from '../../../../../components/dashboard/create-tour-modal';
import { mockTours, Tour } from '../../../../../constants/mockTours';

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>(mockTours);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateTour = (tourData: {
    title: string;
    description: string;
  }) => {
    const newTour: Tour = {
      id: Date.now().toString(),
      ...tourData,
      steps: [],
      views: 0,
      completionRate: 0,
      lastUpdated: 'Just now',
      color: 'bg-blue-100 text-blue-700',
    };
    setTours([...tours, newTour]);
    setShowCreateModal(false);
  };

  const handleDeleteTour = (id: string) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-gray-200 bg-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tours</h1>
              <p className="text-gray-600 mt-1">
                Manage all your onboarding tours
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              New Tour
            </button>
          </div>
        </header>

        <div className="p-8">
          {/* Search Bar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Tours Grid */}
          {filteredTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No tours found. Create your first tour to get started!
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Create Tour
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onDelete={() => handleDeleteTour(tour.id)}
                />
              ))}
            </div>
          )}
        </div>

        <CreateTourModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTour}
        />
      </main>
    </div>
  );
}
