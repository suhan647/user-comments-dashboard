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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-2">
                Comments Dashboard
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
                <div className="text-sm font-semibold text-gray-900">{comments.length}</div>
                <div className="text-xs text-gray-500">Total Comments</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
                <div className="text-sm font-semibold text-indigo-600">{filteredComments.length}</div>
                <div className="text-xs text-gray-500">Filtered Results</div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Manage and view all comments with advanced filtering, sorting, and search capabilities. 
            Get insights from user feedback with our comprehensive dashboard.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sort Buttons */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Sort Options</h3>
              <div className="flex flex-wrap gap-3">
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
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Search & Filter</h3>
              <SearchBar
                value={filterState.search}
                onChange={updateSearch}
              />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 animate-slide-in">
          <p className="text-sm font-medium text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-100 inline-block shadow-sm">
            <span className="text-indigo-600 font-semibold">{filteredComments.length}</span> of <span className="text-indigo-600 font-semibold">{comments.length}</span> comments found
            {filterState.search && (
              <span className="ml-2 text-gray-500">
                for "<span className="font-semibold text-gray-700">{filterState.search}</span>"
              </span>
            )}
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