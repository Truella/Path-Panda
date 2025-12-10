'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '../../../../../../components/dashboard/header';
import { TourSidebar } from '../../../../../../components/dashboard/tour-sidebar';
import { useTour } from '../../../../../../hooks/useTour';
import { useUpdateTour } from '../../../../../../hooks/useUpdateTour';
import { useAddTourStep } from '../../../../../../hooks/useAddTourStep';
import { useUpdateTourStep } from '../../../../../../hooks/useUpdateTourStep';
import { useDeleteTourStep } from '../../../../../../hooks/useDeleteTourStep';
import type { TourStep } from '../../../../../../types/tour';

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [editingStep, setEditingStep] = useState<TourStep | null>(null);

  // Initialize form data once when tour loads
  if (tour && !isInitialized) {
    setTourName(tour.title);
    setTourDescription(tour.description || '');
    setIsInitialized(true);
  }

  const steps = tour?.steps || [];
  const isNewTour = !tourName && !tourDescription;

  const handleAddStep = async () => {
    if (!tour) return;

    const newOrder = steps.length + 1;

    try {
      await addStepMutation.mutateAsync({
        tour_id: tour.id,
        step_id: `step_${Date.now()}`,
        title: 'New Step',
        content: 'Add description here',
        selector: '',
        position: 'bottom',
        order: newOrder,
      });

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

  const handleDeleteStep = async (stepId: string) => {
    if (!confirm('Are you sure you want to delete this step?')) return;

    try {
      await deleteStepMutation.mutateAsync({
        stepId,
        tourId: tour!.id,
      });

      toast.success('Step deleted successfully');
    } catch (error) {
      toast.error('Failed to delete step', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  const handleSaveChanges = async () => {
    if (steps.length < 5) {
      toast.error('Tours must have at least 5 steps');
      return;
    }

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
        },
      });

      toast.success('Tour saved successfully!');
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
      <div className="flex flex-col min-h-screen bg-[#f9f7fe]">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-md text-center shadow-sm">
            {/* Icon */}
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">!</span>
            </div>

            <h3 className="text-xl font-semibold text-[#555557] mb-2">
              Failed to load tour
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              {error?.message || 'Tour not found'}
            </p>

            <button
              onClick={() => router.push('/dashboard/tours')}
              className="cursor-pointer bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574]
                       text-white px-4 py-2 rounded-lg font-medium text-sm
                       hover:opacity-90 transition"
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

      <main className="flex-1 overflow-auto flex justify-center item">
        <TourSidebar active="steps" />

        <div className="w-full max-w-4xl">
          <div className="bg-white sticky top-8 z-10 mb-8">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 max-w-3xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-black transition p-1"
                  disabled={isSaving}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-black">
                    {isNewTour ? 'Create Tour Steps' : 'Edit Tour'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Customize your tour steps and settings
                  </p>
                </div>
              </div>
              <button
                onClick={handleSaveChanges}
                disabled={isSaving || steps.length < 5}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {updateTourMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>

          <div className="p-8 max-w-3xl">
            {/* Tour Information Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Tour Information
              </h2>

              <div className="space-y-6">
                {/* Tour Name */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Tour Name
                  </label>
                  <input
                    type="text"
                    value={tourName}
                    onChange={(e) => setTourName(e.target.value)}
                    placeholder="e.g., Product Walkthrough"
                    disabled={isSaving}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 disabled:opacity-50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Description
                  </label>
                  <textarea
                    value={tourDescription}
                    onChange={(e) => setTourDescription(e.target.value)}
                    placeholder="Describe what this tour guides users through..."
                    rows={4}
                    disabled={isSaving}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Tour Steps Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-black">Tour Steps</h2>
                  <p className="text-gray-600 mt-1">
                    Minimum 5 steps required. Current: {steps.length}
                  </p>
                </div>
                <button
                  onClick={handleAddStep}
                  disabled={addStepMutation.isPending}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addStepMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  Add Step
                </button>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                {steps.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-600">
                      No steps added yet. Create your first step to get started.
                    </p>
                  </div>
                ) : (
                  steps.map((step) => (
                    <div
                      key={step.id}
                      onClick={() => setEditingStep(step)}
                      className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-100 transition cursor-pointer"
                    >
                      {/* Step Number */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-bold shrink-0 text-sm">
                        {step.order}
                      </div>

                      {/* Step Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-black truncate">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
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
                          handleDeleteStep(step.id);
                        }}
                        disabled={deleteStepMutation.isPending}
                        className="text-red-600 hover:text-red-700 p-2 transition disabled:opacity-50"
                      >
                        {deleteStepMutation.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Requirement Warning */}
              {steps.length < 5 && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded-lg">
                  <p className="text-amber-800 font-medium text-sm">
                    ⚠ Your tour needs {5 - steps.length} more step(s) to be
                    saved.
                  </p>
                </div>
              )}

              {/* Success State */}
              {steps.length >= 5 && (
                <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg">
                  <p className="text-green-800 font-medium text-sm">
                    ✓ Your tour meets the minimum requirements and is ready to
                    save.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Step Editor Modal */}
          {editingStep && (
            <StepEditorModal
              step={editingStep}
              onSave={handleUpdateStep}
              onClose={() => setEditingStep(null)}
              isSaving={updateStepMutation.isPending}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* Step Editor Modal Component */
interface StepEditorModalProps {
  step: TourStep;
  onSave: (step: TourStep) => void;
  onClose: () => void;
  isSaving?: boolean;
}

function StepEditorModal({
  step,
  onSave,
  onClose,
  isSaving = false,
}: StepEditorModalProps) {
  const [title, setTitle] = useState(step.title);
  const [content, setContent] = useState(step.content);
  const [selector, setSelector] = useState(step.selector);
  const [position, setPosition] = useState(step.position || 'bottom');

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    onSave({
      ...step,
      title: title.trim(),
      content: content.trim(),
      selector: selector.trim(),
      position,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-black mb-6">
          Edit Step {step.order}
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black disabled:opacity-50"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black disabled:opacity-50"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black disabled:opacity-50"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="center">Center</option>
            </select>
          </div>

          {/* CSS Selector */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Target Element (CSS Selector)
            </label>
            <input
              type="text"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder="e.g., #my-button, .nav-item"
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 text-sm disabled:opacity-50"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-black hover:bg-gray-50 transition font-semibold disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Step'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
