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
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  const { userId, loading: authLoading } = useAuth();
  const createTourMutation = useCreateTour();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if user is authenticated
    if (!userId) {
      setError('You must be logged in to create a tour');
      toast.error('Authentication required', {
        description: 'Please sign in to create tours'
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
        is_active: isActive,
      });

      toast.success('Tour created successfully', {
        description: `"${newTour.title}" is ready for steps.`
      });

      // Redirect to the edit page to add steps
      router.push(`/dashboard/tours/${newTour.id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create tour';
      setError(errorMessage);
      toast.error('Failed to create tour', {
        description: errorMessage
      });
    }
  };

  // Show loading while checking auth
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

  // Redirect to auth if not logged in
  if (!userId) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto flex justify-center">
        {/* Left sidebar */}
        <TourSidebar active="details" />

        {/* Center content */}
        <div className="w-full max-w-4xl">
          {/* Page Header with Back Button */}
          <div className="bg-white sticky top-8 z-10 mb-8">
            <div className="flex items-center justify-start px-8 py-6 border-b border-gray-200 max-w-3xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-black transition p-1"
                  disabled={createTourMutation.isPending}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-black">
                    Create New Tour
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Set up a new onboarding tour for your website
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 max-w-3xl">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-gray-200 p-8"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Tour Details
                </h2>
                <p className="text-gray-600 mb-6">
                  Start by giving your tour a name and description
                </p>

                {/* Tour Name */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-black mb-3">
                    Tour Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Product Walkthrough"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400"
                    disabled={createTourMutation.isPending}
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-black mb-3">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this tour will guide users through..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400"
                    disabled={createTourMutation.isPending}
                  />
                </div>

                {/* Active Status Toggle */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-black focus:ring-2 focus:ring-gray-400"
                      disabled={createTourMutation.isPending}
                    />
                    <div>
                      <span className="block text-sm font-semibold text-black">
                        Active
                      </span>
                      <span className="text-xs text-gray-600">
                        Tour will be visible to users immediately
                      </span>
                    </div>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-lg text-black hover:bg-gray-50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={createTourMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={createTourMutation.isPending}
                >
                  {createTourMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
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