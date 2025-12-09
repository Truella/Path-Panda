"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Plus, Trash2, Code } from "lucide-react"
import { Sidebar } from "../../../../../../components/dashboard/sidebar"
import { StepEditor } from "../../../../../../components/dashboard/step-editor"
import { EmbedScriptModal } from "../../../../../../components/dashboard/embed-script-modal"
import type { TourStep } from "../page"

export default function TourEditorPage() {
  const params = useParams()
  const tourId = params.id as string

  const [steps, setSteps] = useState<TourStep[]>([
    { id: "1", title: "Welcome", description: "Welcome to our app", selector: ".welcome", stepNumber: 1 },
    { id: "2", title: "Dashboard", description: "Overview of dashboard", selector: ".dashboard", stepNumber: 2 },
    { id: "3", title: "Features", description: "Key features overview", selector: ".features", stepNumber: 3 },
    { id: "4", title: "Settings", description: "Configure settings", selector: ".settings", stepNumber: 4 },
    { id: "5", title: "Done", description: "You're all set!", selector: ".done", stepNumber: 5 },
  ])

  const [editingStep, setEditingStep] = useState<TourStep | null>(null)
  const [showEmbedModal, setShowEmbedModal] = useState(false)

  const handleAddStep = () => {
    const newStep: TourStep = {
      id: Date.now().toString(),
      title: "New Step",
      description: "Add description here",
      selector: "",
      stepNumber: steps.length + 1,
    }
    setSteps([...steps, newStep])
  }

  const handleUpdateStep = (updatedStep: TourStep) => {
    setSteps(steps.map((step) => (step.id === updatedStep.id ? updatedStep : step)))
    setEditingStep(null)
  }

  const handleDeleteStep = (stepId: string) => {
    const filtered = steps.filter((step) => step.id !== stepId)
    // Renumber steps
    const renumbered = filtered.map((step, index) => ({
      ...step,
      stepNumber: index + 1,
    }))
    setSteps(renumbered)
  }

  const handlePublish = () => {
    if (steps.length < 5) {
      alert("Tours must have at least 5 steps to be published")
      return
    }
    alert("Tour published successfully!")
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Tour</h1>
              <p className="text-gray-600 mt-1">Manage tour steps and settings</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEmbedModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Code className="w-5 h-5" />
                Embed Script
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Publish Tour
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Steps Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Tour Steps ({steps.length}/5 minimum required)</h2>
              <button
                onClick={handleAddStep}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-100 transition font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Step
              </button>
            </div>

            {/* Step List */}
            <div className="space-y-3">
              {steps.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No steps added yet. Create your first step to get started.</p>
                </div>
              ) : (
                steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex-shrink-0">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1 cursor-pointer min-w-0" onClick={() => setEditingStep(step)}>
                      <h3 className="font-semibold text-gray-900 truncate">{step.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{step.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Selector: {step.selector || "Not set"}</p>
                    </div>
                    <button onClick={() => handleDeleteStep(step.id)} className="text-red-600 hover:text-red-700 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Warning if less than 5 steps */}
          {steps.length < 5 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-yellow-800 font-medium">
                Your tour needs at least {5 - steps.length} more step(s) to be published.
              </p>
            </div>
          )}

          {/* Success message if 5 or more steps */}
          {steps.length >= 5 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
              <p className="text-emerald-800 font-medium">
                ✓ Your tour meets the minimum requirements and is ready to publish!
              </p>
            </div>
          )}
        </div>

        {/* Step Editor Modal */}
        {editingStep && (
          <StepEditor step={editingStep} onSave={handleUpdateStep} onClose={() => setEditingStep(null)} />
        )}

        {/* Embed Script Modal */}
        <EmbedScriptModal isOpen={showEmbedModal} onClose={() => setShowEmbedModal(false)} tourId={tourId} />
      </main>
    </div>
  )
}
