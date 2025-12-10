'use client';

import { Plus, Map, Zap, Eye, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../../../../components/dashboard/header';
import { StatsCard } from '../../../../components/dashboard/stats-card';
import { useTours } from '../../../../hooks/useTours';
import { useDeleteTour } from '../../../../hooks/useDeleteTour';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  // Fetch tours from the database
  const { data: tours, isLoading, error } = useTours();
  const deleteTourMutation = useDeleteTour();
  const router = useRouter();

  const handleDeleteTour = async (id: string, tourTitle: string) => {
    if (confirm('Are you sure you want to delete this tour?')) {
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

  // Calculate stats from real data
  const stats = {
    toursStarted: 0, // Will come from tour_analytics table (count of started_at)
    completed: 0, // Will come from tour_analytics table
    skipped: 0, // Calculate from analytics
    completionRate: '0.0%', // Calculate from analytics data
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading tours: {error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      <Header />

      <main className="overflow-auto">
        {/* Page Header */}
        <div className="border-b border-gray-200 ">
          <div className="px-8 py-6">
            <h1 className="text-2xl font-bold text-[#555557]">Analytics</h1>
            <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm mt-1">
              Track the performance of your onboarding tours
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Tours Started"
              value={stats.toursStarted.toString()}
              change="Total number of tour initiations"
              icon={<Map className="w-6 h-6" />}
              bgColor="bg-gray-100"
              textColor="text-gray-700"
            />
            <StatsCard
              title="Completed"
              value={stats.completed.toString()}
              change="Users who completed the tour"
              icon={<Eye className="w-6 h-6" />}
              bgColor="bg-gray-100"
              textColor="text-gray-700"
            />
            <StatsCard
              title="Skipped"
              value={stats.skipped.toString()}
              change="Users who skipped the tour"
              icon={<Map className="w-6 h-6" />}
              bgColor="bg-gray-100"
              textColor="text-gray-700"
            />
            <StatsCard
              title="Completion Rate"
              value={stats.completionRate}
              change="Average completion rate"
              icon={<Zap className="w-6 h-6" />}
              bgColor="bg-gray-100"
              textColor="text-gray-700"
            />
          </div>

          {/* Tour Performance Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#555557]">
                  Tour Performance
                </h2>
                <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm mt-1">
                  Detailed metrics for each tour
                </p>
              </div>
              <button
                onClick={() => router.push('/dashboard/tours/new')}
                className="flex items-center cursor-pointer gap-2 
             bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]
             text-white px-4 py-2 rounded-lg 
             hover:opacity-90 transition font-medium text-sm"
              >
                <Plus className="w-5 h-5" />
                Create Tour
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && tours?.length === 0 && (
              <div className="text-center py-12 border border-gray-200 rounded-lg">
                <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[#555557] mb-1">
                  No tours yet
                </h3>
                <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm">
                  Create your first tour to get started
                </p>
              </div>
            )}

            {/* Tours List */}
            {!isLoading && tours && tours.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-black">
                            {tour.title}
                          </h3>
                          {!tour.is_active && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Inactive
                            </span>
                          )}
                        </div>

                        {tour.description && (
                          <p className="text-gray-500 text-sm mb-2">
                            {tour.description}
                          </p>
                        )}

                        <p className="text-gray-600 text-sm">
                          Steps: {tour.steps?.length || 0} • Started: 0 •
                          Completed: 0 • Skipped: 0
                        </p>

                        <p className="text-gray-400 text-xs mt-2">
                          Embed Key:{' '}
                          <code className="bg-gray-100 px-1 py-0.5 rounded">
                            {tour.embed_key}
                          </code>
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-black">0.0%</p>

                        <button
                          onClick={() => handleDeleteTour(tour.id, tour.title)}
                          disabled={deleteTourMutation.isPending}
                          className="text-red-600 hover:text-red-700 transition disabled:opacity-50"
                          title="Delete tour"
                        >
                          {deleteTourMutation.isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs mt-3">
                      Completion Rate
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
