"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { TourStep } from "../../constants/mockTours"

interface StepEditorProps {
  step: TourStep
  onSave: (step: TourStep) => void
  onClose: () => void
}

export function StepEditor({ step, onSave, onClose }: StepEditorProps) {
  const [title, setTitle] = useState(step.title)
  const [description, setDescription] = useState(step.description)
  const [selector, setSelector] = useState(step.selector)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Step title is required")
      return
    }
    if (!description.trim()) {
      setError("Step description is required")
      return
    }
    if (!selector.trim()) {
      setError("CSS selector is required")
      return
    }
    onSave({
      ...step,
      title,
      description,
      selector,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Step {step.stepNumber}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Step Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Welcome to Dashboard"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this step..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CSS Selector</label>
            <input
              type="text"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder="e.g., .dashboard-header, #main-nav"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">The CSS selector of the element this step highlights</p>
          </div>

          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
            >
              Save Step
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
