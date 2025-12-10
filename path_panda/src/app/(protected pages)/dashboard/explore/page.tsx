'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, Loader2, Eye } from 'lucide-react';
import { Header } from '../../../../../components/dashboard/header';
import { ExploreCard } from '../../../../../components/dashboard/explore-card';
import { useTours } from '../../../../../hooks/useTours';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const TOURS_PER_PAGE = 6;

type StepsFilter = 'all' | '1-3' | '4-6' | '7+';

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [stepsFilter, setStepsFilter] = useState<StepsFilter>('all');

  // Fetch all tours from Supabase
  const { data: allTours, isLoading, error } = useTours();

  // Filter to only show active tours
  const activeTours = useMemo(() => {
    return allTours?.filter((tour) => tour.is_active !== false) || [];
  }, [allTours]);

  // Filter tours based on search term and filters
  const filteredTours = useMemo(() => {
    let filtered = activeTours;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tour.description &&
            tour.description.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Steps filter
    if (stepsFilter !== 'all') {
      filtered = filtered.filter((tour) => {
        const stepCount = tour.steps?.length || 0;
        switch (stepsFilter) {
          case '1-3':
            return stepCount >= 1 && stepCount <= 3;
          case '4-6':
            return stepCount >= 4 && stepCount <= 6;
          case '7+':
            return stepCount >= 7;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [activeTours, searchTerm, stepsFilter]);

  // Check if any filters are active
  const hasActiveFilters = stepsFilter !== 'all';

  // Clear all filters
  const clearFilters = () => {
    setStepsFilter('all');
    setSearchTerm('');
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE);
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * TOURS_PER_PAGE;
    const endIndex = startIndex + TOURS_PER_PAGE;
    return filteredTours.slice(startIndex, endIndex);
  }, [filteredTours, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    const timer = setTimeout(() => setCurrentPage(1), 0);
    return () => clearTimeout(timer);
  }, [searchTerm, stepsFilter]);

  // Reset page if currentPage exceeds totalPages
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage((prev) =>
        prev > totalPages && totalPages > 0 ? 1 : prev,
      );
    }, 0);
    return () => clearTimeout(timer);
  }, [totalPages]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
    <div className="min-h-screen bg-[#f9f7fe]">
      <Header />

      <main className="overflow-auto max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-[#555557] truncate">
                Explore Tours
              </h1>
              <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm sm:text-base mt-1">
                Discover and view active onboarding tours
                {!isLoading &&
                  activeTours &&
                  ` • ${activeTours.length} ${activeTours.length === 1 ? 'tour' : 'tours'} available`}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Search and Filter Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
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
                onClick={() => setShowFilters(!showFilters)}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2 border rounded-lg transition disabled:opacity-50 ${
                  hasActiveFilters || showFilters
                    ? 'bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                disabled={isLoading}
              >
                <Filter className="w-5 h-5" />
                Filter
                {hasActiveFilters && (
                  <span className="bg-white text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-[#f9f7fe] border border-gray-200 rounded-xl p-6 space-y-6 shadow-md animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#555557] text-lg">
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Clear all
                    </button>
                  )}
                </div>

                <div>
                  {/* Steps Filter */}
                  <label className="block text-sm font-medium text-[#555557] mb-3">
                    Number of Steps
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {(['all', '1-3', '4-6', '7+'] as StepsFilter[]).map(
                      (steps) => (
                        <button
                          key={steps}
                          onClick={() => setStepsFilter(steps)}
                          className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition shadow-sm ${
                            stepsFilter === steps
                              ? 'bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white shadow-md'
                              : 'bg-white text-[#555557] hover:bg-gray-100'
                          }`}
                        >
                          {steps === 'all' ? 'All' : `${steps} steps`}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {stepsFilter !== 'all' && (
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 bg-[#d4a574] text-black px-3 py-1 rounded-full text-sm">
                  Steps: {stepsFilter}
                  <button
                    onClick={() => setStepsFilter('all')}
                    className="hover:bg-gray-800 rounded-full p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* Results count */}
          {!isLoading && filteredTours.length > 0 && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {paginatedTours.length} of {filteredTours.length} tour
              {filteredTours.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-gray-400 mb-4" />
              <p className="text-gray-600">Loading tours...</p>
            </div>
          )}

          {/* Empty State - No Tours */}
          {!isLoading && activeTours && activeTours.length === 0 && (
            <div className="text-center py-12 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#555557] mb-2">
                No tours available
              </h3>
              <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent text-sm">
                There are no active tours to explore at the moment.
              </p>
            </div>
          )}

          {/* Empty State - No Search Results */}
          {!isLoading &&
            activeTours &&
            activeTours.length > 0 &&
            filteredTours.length === 0 && (
              <div className="text-center py-12 border border-gray-200 rounded-lg">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">
                  No tours found
                </h3>
                <p className="text-gray-600 mb-4">
                  No tours match your current filters.
                  {searchTerm && ` Try adjusting your search.`}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-black hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

          {/* Tours Grid */}
          {!isLoading && filteredTours.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTours.map((tour) => (
                  <ExploreCard key={tour.id} tour={tour} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                          className={
                            currentPage === 1
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>

                      {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === 'ellipsis' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              onClick={() => setCurrentPage(page as number)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(totalPages, prev + 1),
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? 'pointer-events-none opacity-50'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}