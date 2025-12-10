'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface EmbedScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourId: string;
  embedKey?: string;
}

export function EmbedScriptModal({
  isOpen,
  onClose,
  tourId,
  embedKey,
}: EmbedScriptModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Real embed code using the actual embed key from the database
  const embedCode = `<script
  type="module"
  src="https://path-panda.pages.dev/PathPandaWidget.js"
  data-embed-key="${embedKey ?? ''}"
></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast.success('Embed code copied!', {
        description: "Paste it in your website's HTML",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy', {
        description: 'Please try copying manually',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg lg:max-w-2xl p-6 sm:p-8 border border-[#d4a574] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-2">
          Embed Tour
        </h2>
        <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mb-6 text-sm sm:text-base">
          Add this code to your website to display the tour
        </p>

        <div className="space-y-4 sm:space-y-6">
          {/* Embed Key Display */}
          <div>
            <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
              Your Embed Key
            </label>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <code className="text-xs sm:text-sm text-blue-700 font-mono break-all">
                {embedKey}
              </code>
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
              Embed Code
            </label>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4 overflow-x-auto">
              <pre className="text-green-400 font-mono text-xs sm:text-sm whitespace-pre-wrap wrap-break-word">
                {embedCode}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-semibold text-[#555557] mb-2 sm:mb-3">
              How to Embed
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
              <ol className="text-xs sm:text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Copy the embed code above</li>
                <li>
                  Paste it before the closing{' '}
                  <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">
                    &lt;/body&gt;
                  </code>{' '}
                  tag in your HTML
                </li>
                <li>The tour will automatically appear on your website</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-200 rounded-lg text-[#555557] hover:bg-gray-50 transition font-semibold cursor-pointer text-sm sm:text-base"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden xs:inline">Copied!</span>
                <span className="xs:hidden">Done</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden xs:inline">Copy Code</span>
                <span className="xs:hidden">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
