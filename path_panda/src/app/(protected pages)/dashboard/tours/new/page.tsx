'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../../../../../../components/dashboard/header';
import { TourSidebar } from '../../../../../../components/dashboard/tour-sidebar';
import { useCreateTour } from '../../../../../../hooks/useCreateTour';
import { useAuth } from '../../../../../../hooks/useAuth';

export default function CreateTourPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const { userId, loading: authLoading } = useAuth();
  const createTourMutation = useCreateTour();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check auth
    if (!userId) {
      setError('You must be logged in to create a tour');
      toast.error('Authentication required', {
        description: 'Please sign in to create tours',
      });
      router.push('/auth');
      return;
    }

    // Validation
    if (!title.trim()) {
      setError('Tour title is required');
      return;
    }
    if (!description.trim()) {
      setError('Tour description is required');
      return;
    }

    try {
      const newTour = await createTourMutation.mutateAsync({
        user_id: userId,
        title: title.trim(),
        description: description.trim(),
        is_active: false, // Default to false
      });

      toast.success('Tour created successfully', {
        description: `"${newTour.title}" is ready for steps.`,
      });

      router.push(`/dashboard/tours/${newTour.id}/edit`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create tour';
      setError(errorMessage);
      toast.error('Failed to create tour', {
        description: errorMessage,
      });
    }
  };

  // Loading state during auth check
  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  // If not logged in
  if (!userId) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto flex justify-center">
        {/* Hide sidebar on mobile */}
        <div className="hidden lg:block">
          <TourSidebar active="details" />
        </div>

        <div className="w-full max-w-4xl">
          {/* Header - Responsive */}
          <div className="bg-white sticky top-0 sm:top-8 z-10 mb-4 sm:mb-8">
            <div className="flex items-center justify-start px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-200 max-w-3xl">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-black transition p-1 cursor-pointer"
                  disabled={createTourMutation.isPending}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#555557]">
                    Create New Tour
                  </h1>
                  <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mt-1 text-sm sm:text-base">
                    Set up a new onboarding tour for your website
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card - Responsive */}
          <div className="p-4 sm:p-8 max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-[#d4a574] p-4 sm:p-8"
            >
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-2">
                  Tour Details
                </h2>
                <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mb-4 sm:mb-6 text-sm sm:text-base">
                  Start by giving your tour a name and description
                </p>

                {/* Title */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
                    Tour Name
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Product Walkthrough"
                    disabled={createTourMutation.isPending}
                    className={`
      w-full
      px-3 sm:px-4 py-2.5 sm:py-3
      border border-gray-200
      rounded-xl
      bg-white
      text-black text-sm sm:text-base
      placeholder-gray-400
      shadow-sm
      transition-all
      focus:outline-none
      focus:ring-2 focus:ring-[#d4a574]
      focus:border-[#d4a574]
      hover:border-gray-300
      disabled:opacity-50
      disabled:cursor-not-allowed
    `}
                  />
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe what this tour will guide users through..."
                    disabled={createTourMutation.isPending}
                    className={`
      w-full
      px-3 sm:px-4 py-2.5 sm:py-3
      border border-gray-200
      rounded-xl
      bg-white
      text-black text-sm sm:text-base
      placeholder-gray-400
      shadow-sm
      transition-all
      focus:outline-none
      focus:ring-2 focus:ring-[#d4a574]
      focus:border-[#d4a574]
      hover:border-gray-300
      disabled:opacity-50
      disabled:cursor-not-allowed
      resize-none
    `}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-xs sm:text-sm font-medium">
                      {error}
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-[#555557] hover:bg-gray-50 transition font-semibold cursor-pointer disabled:opacity-50 text-sm sm:text-base"
                  disabled={createTourMutation.isPending}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3
                    bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]
                    text-white rounded-lg 
                    hover:opacity-90 transition font-semibold 
                    flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm sm:text-base"
                  disabled={createTourMutation.isPending}
                >
                  {createTourMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Tour'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
