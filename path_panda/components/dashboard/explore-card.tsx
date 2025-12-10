"use client"

import { useState } from "react"
import { Eye, Info } from "lucide-react"
import type { TourWithSteps } from "../../types/tour"
import { EmbedScriptModal } from "./embed-script-modal"
import { TourDetailsModal } from "./tour-details-modal"

interface ExploreCardProps {
  tour: TourWithSteps
}

export function ExploreCard({ tour }: ExploreCardProps) {
  const [showEmbedModal, setShowEmbedModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const stepCount = tour.steps?.length || 0

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
              </div>
              <h3 className="text-lg font-bold text-black">{tour.title}</h3>
              <p className="text-black text-sm mt-1">
                {tour.description || "No description provided"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
            <button
              onClick={() => setShowDetailsModal(true)}
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              <Info className="w-4 h-4" /> View Details
            </button>

            <button
              onClick={() => setShowEmbedModal(true)}
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-gray-100 text-green-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              <Eye className="w-4 h-4" /> Embed Code
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

      {/* Tour Details Modal */}
      {showDetailsModal && (
        <TourDetailsModal
          tour={tour}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </>
  )
}