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
        px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
        ${isActive 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border-0' 
          : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-indigo-600 border border-gray-200/50 shadow-sm hover:shadow-md hover:border-indigo-200'
        }
        flex items-center space-x-2.5 hover:scale-105 active:scale-95
      `}
    >
      <span>{label}</span>
      <div className={`transition-transform duration-200 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'}`}>
        {getSortIcon()}
      </div>
    </button>
  );
} 