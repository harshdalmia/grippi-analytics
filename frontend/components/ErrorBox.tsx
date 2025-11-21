export default function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <h2 className="text-red-800 font-semibold text-lg mb-2">Error</h2>
        <p className="text-red-600">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
