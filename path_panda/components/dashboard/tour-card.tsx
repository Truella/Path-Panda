"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit3, Trash2, Eye, Loader2 } from "lucide-react"
import type { TourWithSteps } from "../../types/tour"
import { EmbedScriptModal } from "./embed-script-modal"
import DeleteConfirmModal from "./delete-confirmation-modal"
import { toast } from "sonner"

interface TourCardProps {
  tour: TourWithSteps
  onDelete: () => void
  isDeleting?: boolean
}

export function TourCard({ tour, onDelete, isDeleting = false }: TourCardProps) {
  const router = useRouter()
  const [showEmbedModal, setShowEmbedModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const stepCount = tour.steps?.length || 0
  const minStepsRequired = 5

  const lastUpdated = new Date(tour.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  const getStepColor = (count: number) => {
    if (count === 0) return "bg-gray-100 text-gray-600"
    if (count <= 3) return "bg-blue-100 text-blue-600"
    if (count <= 6) return "bg-purple-100 text-purple-600"
    return "bg-green-100 text-green-600"
  }

  const handleEmbedClick = () => {
    if (stepCount < minStepsRequired) {
      const remainingSteps = minStepsRequired - stepCount
      toast.error(`Complete ${remainingSteps} more ${remainingSteps === 1 ? 'step' : 'steps'} to view embed code`, {
        description: `Your tour needs at least ${minStepsRequired} steps before it can be embedded.`
      })
      return
    }
    setShowEmbedModal(true)
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition flex flex-col justify-between h-full">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
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

          <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
            <button
              onClick={() => router.push(`/dashboard/tours/${tour.id}/edit`)}
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>

            <button
              onClick={handleEmbedClick}
              disabled={isDeleting}
              className={`flex-1 flex items-center justify-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                stepCount < minStepsRequired
                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-green-600 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4" /> Embed
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center cursor-pointer gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              Delete
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-xs">Updated</p>
          <p className="text-gray-900 text-sm font-semibold mt-1">{lastUpdated}</p>
        </div>
      </div>

      {/* Embed Modal */}
      <EmbedScriptModal 
        isOpen={showEmbedModal} 
        onClose={() => setShowEmbedModal(false)} 
        tourId={tour.id}
        embedKey={tour.embed_key}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          title="Delete Tour?"
          description={`Are you sure you want to delete "${tour.title}"? This action cannot be undone and will remove all tour steps.`}
          onConfirm={onDelete}
          onCancel={() => setShowDeleteModal(false)}
          isDeleting={isDeleting}
        />
      )}
    </>
  )
}
