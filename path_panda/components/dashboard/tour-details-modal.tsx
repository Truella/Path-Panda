"use client"

import { X, ChevronRight } from "lucide-react"
import type { TourWithSteps } from "../../types/tour"

interface TourDetailsModalProps {
  tour: TourWithSteps
  onClose: () => void
}

export function TourDetailsModal({ tour, onClose }: TourDetailsModalProps) {
  const stepCount = tour.steps?.length || 0
  const sortedSteps = tour.steps?.sort((a, b) => a.order - b.order) || []

  const lastUpdated = new Date(tour.updated_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const createdDate = new Date(tour.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{tour.title}</h2>
              <p className="text-white/90 text-sm">
                {tour.description || "No description provided"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {stepCount} {stepCount === 1 ? 'Step' : 'Steps'}
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              Active
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tour Information */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Created</p>
              <p className="text-gray-900 font-semibold">{createdDate}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-1">Last Updated</p>
              <p className="text-gray-900 font-semibold">{lastUpdated}</p>
            </div>
          </div>

          {/* Tour Steps */}
          <div>
            <h3 className="text-lg font-bold text-[#555557] mb-4 flex items-center gap-2">
              Tour Steps
              <span className="text-sm font-normal text-gray-600">({stepCount} total)</span>
            </h3>

            {stepCount === 0 ? (
              <div className="text-center py-8 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-gray-600">No steps have been added to this tour yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h4>
                        
                        {step.content && (
                          <p className="text-gray-600 text-sm mb-3">
                            {step.content}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {step.selector && (
                            <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              <span className="font-medium">Selector:</span>
                              <code className="bg-blue-100 px-1 rounded">{step.selector}</code>
                            </div>
                          )}
                          
                          {step.position && (
                            <div className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">
                              <span className="font-medium">Position:</span>
                              <span>{step.position}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white px-4 py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}