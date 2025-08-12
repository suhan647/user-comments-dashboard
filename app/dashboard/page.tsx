'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SortButton from '../components/SortButton';
import CommentsTable from '../components/CommentsTable';
import Pagination from '../components/Pagination';
import { fetchUsers, fetchComments } from '../services/api';
import { useFilterState } from '../hooks/useFilterState';
import { filterComments, sortComments, paginateComments } from '../utils/dataProcessing';
import { User, Comment } from '../types';

export default function CommentsDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    state: filterState,
    updateSearch,
    updateSort,
    updatePage,
    updatePageSize,
  } = useFilterState();

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, commentsData] = await Promise.all([
          fetchUsers(),
          fetchComments(),
        ]);
        
        setUser(usersData[0]); // Use first user as per requirements
        setComments(commentsData);
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Process data when comments or filters change
  useEffect(() => {
    if (comments.length === 0) return;

    let processed = filterComments(comments, filterState.search);
    processed = sortComments(processed, filterState.sort);
    setFilteredComments(processed);
  }, [comments, filterState.search, filterState.sort]);

  // Get paginated data
  const { data: paginatedComments, totalPages } = paginateComments(
    filteredComments,
    filterState.page,
    filterState.pageSize
  );

  const handleProfileClick = () => {
    router.push('/profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error || 'User not found'}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Comments Dashboard</h1>
            <button
              onClick={handleProfileClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              View Profile
            </button>
          </div>
          <p className="mt-2 text-gray-600">
            Manage and view all comments with advanced filtering and sorting capabilities
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sort Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <SortButton
                  label="Sort Post ID"
                  sortKey="postId"
                  currentSort={filterState.sort}
                  onSort={updateSort}
                />
                <SortButton
                  label="Sort Name"
                  sortKey="name"
                  currentSort={filterState.sort}
                  onSort={updateSort}
                />
                <SortButton
                  label="Sort Email"
                  sortKey="email"
                  currentSort={filterState.sort}
                  onSort={updateSort}
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="space-y-3">
              <SearchBar
                value={filterState.search}
                onChange={updateSearch}
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredComments.length} of {comments.length} total comments
          </p>
        </div>

        {/* Comments Table */}
        <CommentsTable
          comments={paginatedComments}
          currentPage={filterState.page}
          pageSize={filterState.pageSize}
        />

        {/* Pagination */}
        {filteredComments.length > 0 && (
          <Pagination
            currentPage={filterState.page}
            totalPages={totalPages}
            pageSize={filterState.pageSize}
            totalItems={filteredComments.length}
            onPageChange={updatePage}
            onPageSizeChange={updatePageSize}
          />
        )}
      </main>
    </div>
  );
} 