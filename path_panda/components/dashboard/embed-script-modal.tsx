"use client"

import { useState } from "react"
import { X, Copy, Check } from "lucide-react"

interface EmbedScriptModalProps {
  isOpen: boolean
  onClose: () => void
  tourId: string
}

export function EmbedScriptModal({ isOpen, onClose, tourId }: EmbedScriptModalProps) {
  const [copied, setCopied] = useState(false)

  const embedScript = `<script src="https://tourflow.app/widget.js"><\/script>
<script>
  TourFlow.initTour({
    tourId: "${tourId}",
    autoStart: false,
    theme: "light"
  });
<\/script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Embed Script</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Copy the script below and paste it into your website&apos;s HTML to embed this tour.
          </p>

          {/* Script Display */}
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap break-words">{embedScript}</pre>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition font-medium"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Script
              </>
            )}
          </button>

          {/* Implementation Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Copy the script above</li>
              <li>Paste it before the closing {"</body>"} tag of your website</li>
              <li>The tour will be available on your site immediately</li>
              <li>Users can trigger it with the TourFlow.start() method</li>
            </ol>
          </div>
        </div>

        <div className="flex gap-3 pt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
