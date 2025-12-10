"use client"

import { useState } from "react"
import { Copy, X, Check } from "lucide-react"
import { toast } from "sonner"

interface EmbedScriptModalProps {
  isOpen: boolean
  onClose: () => void
  tourId: string
  embedKey: string
}

export function EmbedScriptModal({ isOpen, onClose, tourId, embedKey }: EmbedScriptModalProps) {
  const [copied, setCopied] = useState(false)

  // Real embed code using the actual embed key from the database
  const embedCode = `<!-- Path Panda Tour Script -->
<script src="https://cdn.pathpanda.com/embed.js"></script>
<script>
  PathPanda.init({
    embedKey: "${embedKey}",
    tourId: "${tourId}"
  });
</script>`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      toast.success("Embed code copied!", {
        description: "Paste it in your website's HTML"
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy", {
        description: "Please try copying manually"
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-black">Embed Tour</h2>
            <p className="text-gray-600 text-sm mt-1">
              Add this code to your website to display the tour
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-1 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Embed Key Display */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-1">Your Embed Key</p>
            <code className="text-sm text-blue-700 font-mono break-all">
              {embedKey}
            </code>
          </div>

          {/* Embed Code */}
          <div>
            <label className="block text-sm font-semibold text-black mb-3">
              Embed Code
            </label>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap wrap-break-word">
                {embedCode}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-black mb-2 text-sm">
              How to embed:
            </h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Copy the embed code above</li>
              <li>Paste it before the closing <code className="bg-gray-200 px-1 rounded">&lt;/body&gt;</code> tag in your HTML</li>
              <li>The tour will automatically appear on your website</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-black hover:bg-gray-50 transition font-medium"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}