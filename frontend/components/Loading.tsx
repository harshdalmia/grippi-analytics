export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-neutral-700 border-t-white"></div>
        <p className="mt-4 text-gray-300 font-medium">Loading campaigns...</p>
      </div>
    </div>
  )
}
