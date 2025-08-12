import { useState, useEffect, useCallback } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search name, email, comment" }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search with 300ms delay
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchTerm: string) => {
        clearTimeout(timeoutId);
        setIsSearching(true);
        timeoutId = setTimeout(() => {
          onChange(searchTerm);
          setIsSearching(false);
        }, 300);
      };
    })(),
    [onChange]
  );

  // Handle local input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedSearch(newValue);
  };

  // Sync local value with parent value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={handleInputChange}
        className="block w-full pl-12 pr-24 py-3.5 border border-gray-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm !text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        placeholder={placeholder}
      />
      
      {/* Loading indicator - Fixed positioning and visibility */}
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
        {isSearching && (
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-100 shadow-md">
            <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-indigo-500"></div>
            <span className="text-xs text-gray-600 font-medium">Searching...</span>
          </div>
        )}
      </div>
    </div>
  );
} 