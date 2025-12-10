'use client';

import { useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;

  title?: string;
  description?: string;
}

export default function DeleteConfirmModal({
  onConfirm,
  onCancel,
  isDeleting = false,
  title = "Delete Item?",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteConfirmModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 border border-red-200">
        <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-full mx-auto mb-4">
          <Trash2 className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#555557] text-center mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
          {description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-200 rounded-lg text-[#555557] hover:bg-gray-50 transition font-semibold disabled:opacity-50 cursor-pointer text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
