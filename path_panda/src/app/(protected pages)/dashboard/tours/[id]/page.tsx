'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Copy,
  Check,
  Loader2,
  Edit,
  Trash2,
  Map,
  Eye,
  EyeOff,
  Code,
} from 'lucide-react';
import { toast } from 'sonner';
import { useTour } from '../../../../../../hooks/useTour';
import { useDeleteTour } from '../../../../../../hooks/useDeleteTour';
import { EmbedScriptModal } from '../../../../../../components/dashboard/embed-script-modal';
import DeleteConfirmModal from '../../../../../../components/dashboard/delete-confirmation-modal';
import { Header } from '../../../../../../components/dashboard/header';

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;

  const { data: tour, isLoading, error } = useTour(tourId);
  const deleteTourMutation = useDeleteTour();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCopy = async (text: string | undefined, fieldName: string) => {
    if (!text) {
      toast.error('No embed key available');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = async () => {
    try {
      await deleteTourMutation.mutateAsync(tourId);
      toast.success('Tour deleted successfully');
      router.push('/dashboard/tours');
    } catch (error) {
      toast.error('Failed to delete tour', {
        description:
          error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Loading tour details...</p>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !tour) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-sm">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl font-bold">!</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#555557] mb-2">
              Failed to load tour
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              {error?.message || 'Tour not found'}
            </p>
            <button
              onClick={() => router.push('/dashboard/tours')}
              className="cursor-pointer bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition w-full sm:w-auto"
            >
              Back to Tours
            </button>
          </div>
        </main>
      </div>
    );
  }

  const steps = tour.steps || [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 overflow-auto">
        <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-black transition p-1 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#555557]">
                  Tour Details
                </h1>
                <p className="bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] bg-clip-text text-transparent mt-1 text-sm sm:text-base">
                  View and manage your tour
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => router.push(`/dashboard/tours/${tourId}/edit`)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[#555557] hover:bg-gray-50 transition font-semibold cursor-pointer"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={deleteTourMutation.isPending}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
          {/* Tour Status Banner */}
          <div
            className={`p-4 rounded-lg border ${
              tour.is_active
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {tour.is_active ? (
                <>
                  <Eye className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    Active Tour
                  </span>
                  <span className="text-green-600 text-sm">
                    - Visible to users
                  </span>
                </>
              ) : (
                <>
                  <EyeOff className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    Inactive Tour
                  </span>
                  <span className="text-gray-600 text-sm">
                    - Hidden from users
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Embed Key Section */}
          <div className="bg-white border border-[#d4a574] rounded-xl p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4 sm:gap-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-2">
                  Embed Key
                </h2>
                <p className="text-gray-600 text-sm">
                  Use this key to embed your tour on your website
                </p>
              </div>
              <button
                onClick={() => setShowEmbedModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white rounded-lg hover:opacity-90 transition font-semibold cursor-pointer text-sm"
              >
                <Code className="w-4 h-4" /> View Embed Code
              </button>
            </div>

            {tour.embed_key ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <code className="flex-1 text-sm font-mono text-gray-700 break-all">
                  {tour.embed_key}
                </code>
                <button
                  onClick={() => handleCopy(tour.embed_key, 'Embed key')}
                  className="shrink-0 p-2 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                >
                  {copiedField === 'Embed key' ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  No embed key available for this tour.
                </p>
              </div>
            )}
          </div>

          {/* Tour Information */}
          <div className="bg-white border border-[#d4a574] rounded-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-6">
              Tour Information
            </h2>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
    Tour Name
  </label>

  <p className="text-[#555557] text-base sm:text-lg font-semibold leading-snug">
    {tour.title}
  </p>
</div>


              {tour.description && (
  <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
      Description
    </label>

    <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
      {tour.description}
    </p>
  </div>
)}


              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Total Steps
                  </label>
                  <p className="text-2xl font-bold text-[#555557]">
                    {steps.length}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Created
                  </label>
                  <p className="text-sm text-gray-700">
                    {formatDate(tour.created_at)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Last Updated
                  </label>
                  <p className="text-sm text-gray-700">
                    {formatDate(tour.updated_at)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Status
                </label>
                <span
                  className={`inline-flex items-center text-sm px-3 py-1 rounded-full font-medium ${
                    tour.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tour.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Tour Steps */}
          <div className="bg-white border border-[#d4a574] rounded-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-6">
              Tour Steps ({steps.length})
            </h2>

            {steps.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No steps added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#a67c52] transition"
                  >
                    {/* Step Number */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-[#7a5e46] via-[#a67c52] to-[#d4a574] text-white font-bold shrink-0">
                      {step.order}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#555557] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {step.content}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Selector:</span>{' '}
                          <code className="bg-gray-200 px-2 py-0.5 rounded">
                            {step.selector || 'Not set'}
                          </code>
                        </div>
                        <div>
                          <span className="font-medium">Position:</span>{' '}
                          <span className="capitalize">{step.position}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Embed Instructions Section */}
          <div className="bg-white border border-[#d4a574] rounded-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#555557] mb-4">
              How to Embed This Tour
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Click the &quot;View Embed Code&quot; button above</li>
                <li>Copy the provided embed script</li>
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
      </main>

      {/* Modals */}
      {showEmbedModal && (
        <EmbedScriptModal
          isOpen={showEmbedModal}
          onClose={() => setShowEmbedModal(false)}
          tourId={tourId}
          embedKey={tour.embed_key}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          title="Delete Tour?"
          description={`Are you sure you want to delete "${tour.title}"? This action cannot be undone and will remove all tour steps.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isDeleting={deleteTourMutation.isPending}
        />
      )}
    </div>
  );
}
