import { useState, useEffect } from 'react';
import { FilterState, SortConfig } from '../types';

const STORAGE_KEY = 'dashboard-filters';

const defaultState: FilterState = {
  search: '',
  sort: { key: null, direction: null },
  page: 1,
  pageSize: 10,
};

export const useFilterState = () => {
  const [state, setState] = useState<FilterState>(defaultState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...defaultState, ...parsed });
      }
    } catch (error) {
      console.error('Error loading filter state:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving filter state:', error);
    }
  }, [state]);

  const updateSearch = (search: string) => {
    setState(prev => ({ ...prev, search, page: 1 }));
  };

  const updateSort = (sort: SortConfig) => {
    setState(prev => ({ ...prev, sort, page: 1 }));
  };

  const updatePage = (page: number) => {
    setState(prev => ({ ...prev, page }));
  };

  const updatePageSize = (pageSize: number) => {
    setState(prev => ({ ...prev, pageSize, page: 1 }));
  };

  const resetFilters = () => {
    setState(defaultState);
  };

  return {
    state,
    updateSearch,
    updateSort,
    updatePage,
    updatePageSize,
    resetFilters,
  };
}; 