import { SortConfig } from '../types';

interface SortButtonProps {
  label: string;
  sortKey: keyof import('../types').Comment;
  currentSort: SortConfig;
  onSort: (sort: SortConfig) => void;
}

export default function SortButton({ label, sortKey, currentSort, onSort }: SortButtonProps) {
  const isActive = currentSort.key === sortKey;
  
  const getSortIcon = () => {
    if (!isActive) {
      // Default state - show both up and down arrows
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (currentSort.direction === 'asc') {
      // Ascending state - show up arrow
      return (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    if (currentSort.direction === 'desc') {
      // Descending state - show down arrow
      return (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    
    // No sort state - show both arrows
    return (
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  };

  const handleClick = () => {
    const nextSort = getNextSortDirection(currentSort.key, sortKey, currentSort.direction);
    onSort(nextSort);
  };

  const getNextSortDirection = (
    currentKey: keyof import('../types').Comment | null,
    clickedKey: keyof import('../types').Comment,
    currentDirection: 'asc' | 'desc' | null
  ): SortConfig => {
    if (currentKey !== clickedKey) {
      return { key: clickedKey, direction: 'asc' };
    }
    
    if (currentDirection === 'asc') {
      return { key: clickedKey, direction: 'desc' };
    } else if (currentDirection === 'desc') {
      return { key: null, direction: null };
    } else {
      return { key: clickedKey, direction: 'asc' };
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'bg-white text-gray-800 border border-gray-300 shadow-sm' 
          : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200 shadow-sm'
        }
        flex items-center space-x-2 hover:shadow-md
      `}
    >
      <span>{label}</span>
      {getSortIcon()}
    </button>
  );
} 