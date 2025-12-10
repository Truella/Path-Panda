'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../../../../../components/dashboard/header';
import { TourCard } from '../../../../../components/dashboard/tour-card';
import { useTours } from '../../../../../hooks/useTours';
import { useDeleteTour } from '../../../../../hooks/useDeleteTour';

export default function ToursPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tours from Supabase
  const { data: tours, isLoading, error } = useTours();
  const deleteTourMutation = useDeleteTour();

  const handleDeleteTour = async (id: string, tourTitle: string) => {
    if (confirm(`Are you sure you want to delete "${tourTitle}"?`)) {
      try {
        await deleteTourMutation.mutateAsync(id);
        toast.success('Tour deleted successfully', {
          description: `"${tourTitle}" has been removed from your tours.`,
        });
      } catch (error) {
        toast.error('Failed to delete tour', {
          description:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred. Please try again.',
        });
      }
    }
  };

  // Filter tours based on search term
  const filteredTours =
    tours?.filter(
      (tour) =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tour.description &&
          tour.description.toLowerCase().includes(searchTerm.toLowerCase())),
    ) || [];

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f9f7fe]">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-red-800 font-semibold mb-2">
              Failed to load tours
            </h3>
            <p className="text-red-600 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f7fe]">
      <Header />

      <main className="overflow-auto">
        {/* Page Header */}
        <div className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-[#555557] truncate">
                My Tours
              </h1>
              <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm sm:text-base mt-1">
                Create and manage your onboarding tours
                {!isLoading &&
                  tours &&
                  ` • ${tours.length} ${tours.length === 1 ? 'tour' : 'tours'}`}
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard/tours/new')}
              className="flex items-center justify-center cursor-pointer gap-2 
             bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]
             text-white px-4 py-2 rounded-lg 
             hover:opacity-90 transition font-medium text-sm whitespace-nowrap
             w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Create Tour
            </button>
          </div>
        </div>

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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                disabled={isLoading}
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              disabled={isLoading}
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-gray-400 mb-4" />
              <p className="text-gray-600">Loading your tours...</p>
            </div>
          )}

          {/* Empty State - No Tours */}
          {!isLoading && tours && tours.length === 0 && (
            <div className="text-center py-12 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#555557] mb-2">
                No tours yet
              </h3>
              <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm  mb-6">
                Create your first tour to get started!
              </p>
              <button
                onClick={() => router.push('/dashboard/tours/new')}
                className=" cursor-pointer gap-2 
             bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]
             text-white px-4 py-2 rounded-lg 
             hover:opacity-90 transition font-medium text-sm"
              >
                Create Your First Tour
              </button>
            </div>
          )}

          {/* Empty State - No Search Results */}
          {!isLoading &&
            tours &&
            tours.length > 0 &&
            filteredTours.length === 0 && (
              <div className="text-center py-12 border border-gray-200 rounded-lg">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">
                  No tours found
                </h3>
                <p className="text-gray-600 mb-4">
                  No tours match &quot;{searchTerm}&quot;. Try adjusting your
                  search.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-black hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

          {/* Tours Grid */}
          {!isLoading && filteredTours.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onDelete={() => handleDeleteTour(tour.id, tour.title)}
                  isDeleting={deleteTourMutation.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
