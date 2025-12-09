'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit3, Trash2, Eye } from 'lucide-react';
import type { TourStep } from '../../constants/mockTours';
import { EmbedScriptModal } from './embed-script-modal';

export function TourCard({
  tour,
  onDelete,
}: {
  tour: {
    id: string;
    title: string;
    description: string;
    steps: TourStep[];
    views: number;
    completionRate: number;
    lastUpdated: string;
    color: string;
  };
  onDelete: () => void;
}) {
  const router = useRouter();
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const stepCount = tour.steps.length;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${tour.color}`}
              >
                {stepCount} steps
              </div>
            </div>
            <h3 className="text-lg font-bold text-amber-700">{tour.title}</h3>
            <p className="text-black text-sm mt-1">{tour.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => router.push(`/dashboard/tours/${tour.id}`)}
            className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition font-medium"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => setShowEmbedModal(true)}
            className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            <Eye className="w-4 h-4" />
            Embed
          </button>

          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center cursor-pointer gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-xs">Updated</p>
            <p className="text-gray-900 text-sm font-semibold mt-1">
              {tour.lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Embed Modal */}
      <EmbedScriptModal
        isOpen={showEmbedModal}
        onClose={() => setShowEmbedModal(false)}
        tourId={tour.id}
      />
    </>
  );
}
