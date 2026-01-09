export const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded w-40"></div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-8"></div>

        <div className="space-y-8">
          {/* Username */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>

          {/* Phone */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>

          {/* Role */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-3"></div>
            <div className="h-8 bg-gray-100 rounded w-32"></div>
          </div>

          {/* Dates */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
          </div>

          <div>
            <div className="h-4 bg-gray-200 rounded w-28 mb-3"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}