'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { TourStep } from '../../types/tour';

// Define proper types for the modal props
export type NewStepData = Omit<TourStep, 'id' | 'tour_id' | 'step_id' | 'created_at'>;

interface BaseStepEditorModalProps {
  onClose: () => void;
  isSaving?: boolean;
}

interface NewStepEditorModalProps extends BaseStepEditorModalProps {
  step: { title: string; content: string; selector: string; position: string; order: number };
  onSave: (step: NewStepData) => void;
  isNewStep: true;
}

interface ExistingStepEditorModalProps extends BaseStepEditorModalProps {
  step: TourStep;
  onSave: (step: TourStep) => void;
  isNewStep?: false;
}

type StepEditorModalProps = NewStepEditorModalProps | ExistingStepEditorModalProps;

export default function StepEditorModal({
  step,
  onSave,
  onClose,
  isSaving = false,
  isNewStep = false,
}: StepEditorModalProps) {
  const [title, setTitle] = useState(step.title);
  const [content, setContent] = useState(step.content);
  const [selector, setSelector] = useState(step.selector);
  const [position, setPosition] = useState(step.position || 'bottom');

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    if (isNewStep) {
      // For new steps, only pass the fields needed
      const newStepData: NewStepData = {
        title: title.trim(),
        content: content.trim(),
        selector: selector.trim(),
        position,
        order: step.order,
      };
      (onSave as (step: NewStepData) => void)(newStepData);
    } else {
      // For existing steps, pass the full step object
      const updatedStep: TourStep = {
        ...(step as TourStep),
        title: title.trim(),
        content: content.trim(),
        selector: selector.trim(),
        position,
      };
      (onSave as (step: TourStep) => void)(updatedStep);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg p-6 sm:p-8 border border-[#d4a574] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-2">
          {isNewStep ? 'Add New Step' : `Edit Step ${step.order}`}
        </h2>
        <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mb-6 text-sm sm:text-base">
          {isNewStep ? 'Create a new tour step' : 'Update step details'}
        </p>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Welcome to Dashboard"
              disabled={isSaving}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 disabled:opacity-50 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe what users will learn in this step..."
              rows={4}
              disabled={isSaving}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 disabled:opacity-50 text-sm sm:text-base resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              disabled={isSaving}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black disabled:opacity-50 text-sm sm:text-base"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="center">Center</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
              Target Element (CSS Selector)
            </label>
            <input
              type="text"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder="e.g., #my-button, .nav-item"
              disabled={isSaving}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-black placeholder-gray-400 text-xs sm:text-sm disabled:opacity-50"
            />
            <p className="text-xs text-gray-500 mt-2">
              Optional: Specify which element this step should highlight
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-200 rounded-lg text-[#555557] hover:bg-gray-50 transition font-semibold disabled:opacity-50 cursor-pointer text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isNewStep ? 'Adding...' : 'Saving...'}
              </>
            ) : (
              isNewStep ? 'Add Step' : 'Save Step'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}