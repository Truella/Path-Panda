'use client';

import {
  Plus,
  Map,
  Zap,
  Eye,
  Trash2,
  Loader2,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
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
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-red-800 font-semibold mb-2 text-sm sm:text-base">
              Error loading tours
            </h3>
            <p className="text-red-600 text-sm">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm text-red-600 hover:text-red-700 underline"
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
        <div className="border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#555557]">
              Analytics
            </h1>
            <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm mt-1">
              Track the performance of your onboarding tours
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatsCard
              title="Tours Started"
              value={stats.toursStarted.toString()}
              change="Total number of tour initiations"
              icon={<Map className="w-5 h-5 sm:w-6 sm:h-6" />}
              bgColor="bg-gray-100"
              textColor="text-amber-700"
            />
            <StatsCard
              title="Completed"
              value={stats.completed.toString()}
              change="Users who completed the tour"
              icon={<Eye className="w-5 h-5 sm:w-6 sm:h-6" />}
              bgColor="bg-gray-100"
              textColor="text-amber-700"
            />
            <StatsCard
              title="Skipped"
              value={stats.skipped.toString()}
              change="Users who skipped the tour"
              icon={<Map className="w-5 h-5 sm:w-6 sm:h-6" />}
              bgColor="bg-gray-100"
              textColor="text-amber-700"
            />
            <StatsCard
              title="Completion Rate"
              value={stats.completionRate}
              change="Average completion rate"
              icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6" />}
              bgColor="bg-gray-100"
              textColor="text-amber-700"
            />
          </div>

          {/* Tour Performance Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-[#555557]">
                  Tour Performance
                </h2>
                <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm mt-1">
                  Detailed metrics for each tour
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

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-gray-400" />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && tours?.length === 0 && (
              <div className="text-center py-12 border border-gray-200 rounded-lg bg-white">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#555557] mb-2">
                  No tours yet
                </h3>
                <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm">
                  Create your first tour to get started
                </p>
              </div>
            )}

            {/* Tours List - Beautiful Cards */}
            {!isLoading && tours && tours.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="group relative bg-white border border-gray-200 rounded-xl p-5 sm:p-6 hover:border-[#d4a574] hover:shadow-lg transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-linear-to-br from-[#7a5e46] via-[#a67c52] to-[#d4a574] rounded-lg flex items-center justify-center shrink-0">
                          <Map className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-bold text-[#555557] text-base sm:text-lg truncate flex-1 min-w-0">
                          {tour.title}
                        </h3>
                        {/* Status Badge and Delete Button */}
                        <div className="flex items-center justify-between">
                          <div>
                            {!tour.is_active && (
                              <span className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                                Inactive
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteTour(tour.id, tour.title)
                            }
                            disabled={deleteTourMutation.isPending}
                            className="text-gray-400 hover:text-red-600 transition disabled:opacity-50 shrink-0 p-1.5 hover:bg-red-50 rounded-lg"
                            title="Delete tour"
                          >
                            {deleteTourMutation.isPending ? (
                              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {tour.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tour.description}
                      </p>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Steps</p>
                        <p className="text-lg sm:text-xl font-bold text-[#555557]">
                          {tour.steps?.length || 0}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Started</p>
                        <p className="text-lg sm:text-xl font-bold text-[#555557]">
                          0
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Completed</p>
                        <p className="text-lg sm:text-xl font-bold text-[#555557]">
                          0
                        </p>
                      </div>
                    </div>

                    {/* Completion Rate */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">
                          Completion Rate
                        </span>
                        <span className="text-sm font-bold bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent">
                          0.0%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] rounded-full transition-all duration-500"
                          style={{ width: '0%' }}
                        />
                      </div>
                    </div>

                    {/* Embed Key */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-500 mb-1 font-medium">
                        Embed Key
                      </p>
                      <code className="text-xs text-gray-700 font-mono break-all">
                        {tour.embed_key}
                      </code>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => router.push(`/dashboard/tours/${tour.id}`)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-[#555557] rounded-lg transition-all duration-200 font-medium text-sm group-hover:bg-linear-to-r group-hover:from-[#7a5e46] group-hover:via-[#a67c52] group-hover:to-[#d4a574] group-hover:text-white"
                    >
                      <BarChart3 className="w-4 h-4" />
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
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
