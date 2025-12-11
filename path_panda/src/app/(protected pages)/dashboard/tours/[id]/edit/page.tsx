'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../../../../../../../components/dashboard/header';
import { TourSidebar } from '../../../../../../../components/dashboard/tour-sidebar';
import { useTour } from '../../../../../../../hooks/useTour';
import { useUpdateTour } from '../../../../../../../hooks/useUpdateTour';
import { useAddTourStep } from '../../../../../../../hooks/useAddTourStep';
import { useUpdateTourStep } from '../../../../../../../hooks/useUpdateTourStep';
import { useDeleteTourStep } from '../../../../../../../hooks/useDeleteTourStep';
import type { TourStep } from '../../../../../../../types/tour';
import DeleteConfirmModal from '../../../../../../../components/dashboard/delete-confirmation-modal';
import StepEditorModal, {
  type NewStepData,
} from '../../../../../../../components/dashboard/step-editor-modal';

export default function TourEditorPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;

  // Fetch tour data
  const { data: tour, isLoading, error } = useTour(tourId);
  const updateTourMutation = useUpdateTour();
  const addStepMutation = useAddTourStep();
  const updateStepMutation = useUpdateTourStep();
  const deleteStepMutation = useDeleteTourStep();

  // Initialize state with tour data, or keep current values if tour changes
  const [tourName, setTourName] = useState('');
  const [tourDescription, setTourDescription] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [editingStep, setEditingStep] = useState<TourStep | null>(null);
  const [isAddingNewStep, setIsAddingNewStep] = useState(false);

  // Initialize form data once when tour loads
  if (tour && !isInitialized) {
    setTourName(tour.title);
    setTourDescription(tour.description || '');
    setIsActive(tour.is_active);
    setIsInitialized(true);
  }

  const steps = tour?.steps || [];

  const handleAddStepClick = () => {
    setIsAddingNewStep(true);
  };

  const handleSaveNewStep = async (newStepData: NewStepData) => {
    if (!tour) return;

    const newOrder = steps.length + 1;

    try {
      await addStepMutation.mutateAsync({
        tour_id: tour.id,
        step_id: `step_${Date.now()}`,
        title: newStepData.title,
        content: newStepData.content,
        selector: newStepData.selector,
        position: newStepData.position,
        order: newOrder,
      });

      setIsAddingNewStep(false);
      toast.success('Step added successfully');
    } catch (error) {
      toast.error('Failed to add step', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  const handleUpdateStep = async (updatedStep: TourStep) => {
    try {
      await updateStepMutation.mutateAsync({
        stepId: updatedStep.id,
        tourId: tour!.id,
        updates: {
          title: updatedStep.title,
          content: updatedStep.content,
          selector: updatedStep.selector,
          position: updatedStep.position,
        },
      });

      setEditingStep(null);
      toast.success('Step updated successfully');
    } catch (error) {
      toast.error('Failed to update step', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  const [deletingStepId, setDeletingStepId] = useState<string | null>(null);

  const handleDeleteStep = async (stepId: string) => {
    try {
      await deleteStepMutation.mutateAsync({
        stepId,
        tourId: tour!.id,
      });

      setDeletingStepId(null);
      toast.success('Step deleted successfully');
    } catch (error) {
      toast.error('Failed to delete step', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  const handleActiveToggle = (checked: boolean) => {
  if (checked && steps.length < 5) {
    toast.error('Tour cannot be activated', {
      description: `This tour currently has only ${steps.length} step(s). Add at least ${5 - steps.length} more step(s) to make it available to all users.`,
    });
    return;
  }

  setIsActive(checked);

  if (checked) {
    toast.success('Tour is now active');
  } else {
    toast('Tour is now inactive');
  }
};


  const handleSaveChanges = async () => {
    if (!tourName.trim()) {
      toast.error('Tour name is required');
      return;
    }

    try {
      await updateTourMutation.mutateAsync({
        tourId: tour!.id,
        updates: {
          title: tourName.trim(),
          description: tourDescription.trim() || null,
          is_active: isActive,
        },
      });

      toast.success('Tour saved successfully!');
      router.push('/dashboard/tours');
    } catch (error) {
      toast.error('Failed to save tour', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading tour...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !tour) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-sm">
            {/* Icon */}
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">!</span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-[#555557] mb-2">
              Failed to load tour
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              {error?.message || 'Tour not found'}
            </p>

            <button
              onClick={() => router.push('/dashboard/tours')}
              className="cursor-pointer bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]
                       text-white px-4 py-2 rounded-lg font-medium text-sm
                       hover:opacity-90 transition w-full sm:w-auto"
            >
              Back to Tours
            </button>
          </div>
        </main>
      </div>
    );
  }

  const isSaving =
    updateTourMutation.isPending ||
    addStepMutation.isPending ||
    updateStepMutation.isPending ||
    deleteStepMutation.isPending;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto flex justify-center">
        {/* Hide sidebar on mobile */}
        <div className="hidden lg:block">
          <TourSidebar active="steps" />
        </div>

        <div className="w-full max-w-4xl">
          {/* Sticky header - responsive */}
          <div className="bg-white sticky top-0 sm:top-8 z-10 mb-4 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-200 max-w-3xl gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* <button
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-black transition p-1 cursor-pointer"
                  disabled={isSaving}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button> */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#555557]">
                    Tour Setup
                  </h1>
                  <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mt-1 text-sm sm:text-base">
                    Customize your tour steps and settings
                  </p>
                </div>
              </div>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                {updateTourMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-8 max-w-3xl">
            {/* Tour Information Section */}
            <div className="bg-white border border-[#d4a574] rounded-xl p-4 sm:p-8 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-2">
                Tour Information
              </h2>
              <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mb-4 sm:mb-6 text-sm sm:text-base">
                Update your tour details
              </p>

              <div className="space-y-4 sm:space-y-6">
                {/* Tour Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
                    Tour Name
                  </label>
                  <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder="e.g., Product Walkthrough"
                    disabled={isSaving}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 disabled:opacity-50 text-sm sm:text-base"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
                    Description
                  </label>
                  <textarea
                    value={tourDescription}
                    onChange={(e) => setTourDescription(e.target.value)}
                    placeholder="Describe what this tour guides users through..."
                    rows={4}
                    disabled={isSaving}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 disabled:opacity-50 text-sm sm:text-base resize-none"
                  />
                </div>

                {/* Active Toggle */}
                <div>
                  <label className="flex items-start sm:items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => handleActiveToggle(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 accent-[#a67c52] mt-0.5 sm:mt-0 shrink-0"
                      disabled={isSaving}
                    />
                    <div>
                      <span className="block text-sm font-semibold text-[#555557]">
                        Active
                      </span>
                      {steps.length < 5 && (
                        <span className="block text-xs text-amber-600 mt-1">
                          ⚠ Requires at least 5 steps to activate
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Tour Steps Section */}
            <div className="bg-white border border-[#d4a574] rounded-xl p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#555557]">
                    Tour Steps
                  </h2>
                  <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mt-1 text-sm sm:text-base">
                    Current steps: {steps.length}
                  </p>
                </div>
                <button
                  onClick={handleAddStepClick}
                  disabled={addStepMutation.isPending}
                  className="flex items-center justify-center gap-2 bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add Step
                </button>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                {steps.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-sm sm:text-base px-4">
                      No steps added yet. Create your first step to get started.
                    </p>
                  </div>
                ) : (
                  steps.map((step) => (
                    <div
                      key={step.id}
                      onClick={() => setEditingStep(step)}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#a67c52] hover:bg-gray-100 transition cursor-pointer"
                    >
                      {/* Step Number */}
                      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white font-bold shrink-0 text-xs sm:text-sm">
                        {step.order}
                      </div>

                      {/* Step Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#555557] truncate text-sm sm:text-base">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {step.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Selector: {step.selector || 'Not set'}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingStepId(step.id);
                        }}
                        disabled={deleteStepMutation.isPending}
                        className="text-red-600 hover:text-red-700 p-1 sm:p-2 transition disabled:opacity-50 shrink-0"
                      >
                        {deleteStepMutation.isPending ? (
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Step Count Info */}
              {steps.length < 5 && steps.length > 0 && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-50 border border-amber-300 rounded-lg">
                  <p className="text-amber-800 font-medium text-xs sm:text-sm">
                    ⚠ {5 - steps.length} more step(s) needed to activate this
                    tour.
                  </p>
                </div>
              )}

              {/* Success State */}
              {steps.length >= 5 && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border border-green-300 rounded-lg">
                  <p className="text-green-800 font-medium text-xs sm:text-sm">
                    ✓ Your tour has enough steps and can be activated.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Add New Step Modal */}
          {isAddingNewStep && (
            <StepEditorModal
              step={{
                title: '',
                content: '',
                selector: '',
                position: 'bottom',
                order: steps.length + 1,
              }}
              onSave={handleSaveNewStep}
              onClose={() => setIsAddingNewStep(false)}
              isSaving={addStepMutation.isPending}
              isNewStep={true}
            />
          )}

          {/* Step Editor Modal */}
          {editingStep && (
            <StepEditorModal
              step={editingStep}
              onSave={handleUpdateStep}
              onClose={() => setEditingStep(null)}
              isSaving={updateStepMutation.isPending}
            />
          )}

          {/* Delete Confirmation Modal */}
          {deletingStepId && (
            <DeleteConfirmModal
              title="Delete Step?"
              description="Are you sure you want to delete this step? This action cannot be undone."
              onConfirm={() => handleDeleteStep(deletingStepId)}
              onCancel={() => setDeletingStepId(null)}
              isDeleting={deleteStepMutation.isPending}
            />
          )}
        </div>
      </main>
    </div>
  );
}
