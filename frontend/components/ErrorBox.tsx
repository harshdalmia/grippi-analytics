"use client"

export default function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-neutral-800/30 border border-red-700 rounded-lg p-6 max-w-md shadow-sm">
        <h2 className="text-red-300 font-semibold text-lg mb-2">Error</h2>
        <p className="text-gray-200 text-sm mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition font-medium text-sm"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
