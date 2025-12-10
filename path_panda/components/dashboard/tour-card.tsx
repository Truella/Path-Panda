"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit3, Trash2, Eye, Loader2 } from "lucide-react"
import type { TourWithSteps } from "../../types/tour"
import { EmbedScriptModal } from "./embed-script-modal"

interface TourCardProps {
  tour: TourWithSteps
  onDelete: () => void
  isDeleting?: boolean
}

export function TourCard({ tour, onDelete, isDeleting = false }: TourCardProps) {
  const router = useRouter()
  const [showEmbedModal, setShowEmbedModal] = useState(false)
  const stepCount = tour.steps?.length || 0

  // Format the updated_at date
  const lastUpdated = new Date(tour.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Generate color based on step count
  const getStepColor = (count: number) => {
    if (count === 0) return "bg-gray-100 text-gray-600"
    if (count <= 3) return "bg-blue-100 text-blue-600"
    if (count <= 6) return "bg-purple-100 text-purple-600"
    return "bg-green-100 text-green-600"
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStepColor(stepCount)}`}>
                {stepCount} {stepCount === 1 ? 'step' : 'steps'}
              </div>
              {!tour.is_active && (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                  Inactive
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-black">{tour.title}</h3>
            <p className="text-black text-sm mt-1">
              {tour.description || "No description provided"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => router.push(`/dashboard/tours/${tour.id}`)}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => setShowEmbedModal(true)}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-green-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye className="w-4 h-4" />
            Embed
          </button>

          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center cursor-pointer gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 text-xs">Updated</p>
            <p className="text-gray-900 text-sm font-semibold mt-1">{lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Embed Modal */}
      <EmbedScriptModal 
        isOpen={showEmbedModal} 
        onClose={() => setShowEmbedModal(false)} 
        tourId={tour.id}
        embedKey={tour.embed_key}
      />
    </>
  )
}