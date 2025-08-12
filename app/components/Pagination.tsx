interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageSizeOptions = [10, 50, 100];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 sm:space-x-6 bg-white/80 backdrop-blur-sm px-8 py-6 border-t border-gray-100 rounded-b-2xl">
      {/* Page Info */}
      <div className="text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
        <span className="text-indigo-600 font-semibold">{startItem}-{endItem}</span> of <span className="text-indigo-600 font-semibold">{totalItems}</span> comments
      </div>

      {/* Page Size Selector */}
      <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
        <span className="text-sm font-medium text-gray-600">Show:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:border-indigo-300"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size} className="text-gray-700 bg-white font-medium">
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm font-medium text-gray-600">per page</span>
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 rounded-xl border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white shadow-sm hover:shadow-md disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:shadow-sm"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1 mx-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${currentPage === pageNum
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-indigo-200 hover:scale-105'
                  }
                `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 rounded-xl border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-white shadow-sm hover:shadow-md disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:shadow-sm"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
} 