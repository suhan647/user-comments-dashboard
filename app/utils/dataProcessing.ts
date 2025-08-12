import { Comment, SortConfig } from '../types';

export const filterComments = (
  comments: Comment[],
  search: string
): Comment[] => {
  if (!search.trim()) return comments;
  
  const searchLower = search.toLowerCase();
  return comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(searchLower) ||
      comment.email.toLowerCase().includes(searchLower) ||
      comment.body.toLowerCase().includes(searchLower)
  );
};

export const sortComments = (
  comments: Comment[],
  sortConfig: SortConfig
): Comment[] => {
  if (!sortConfig.key || !sortConfig.direction) return comments;
  
  return [...comments].sort((a, b) => {
    const aValue = a[sortConfig.key!];
    const bValue = b[sortConfig.key!];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (sortConfig.direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
    
    return 0;
  });
};

export const paginateComments = (
  comments: Comment[],
  page: number,
  pageSize: number
): { data: Comment[]; totalPages: number } => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const data = comments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(comments.length / pageSize);
  
  return { data, totalPages };
};

export const getNextSortDirection = (
  currentKey: keyof Comment | null,
  clickedKey: keyof Comment,
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