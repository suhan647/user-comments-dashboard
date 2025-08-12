'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { fetchUsers } from '../services/api';
import { User } from '../types';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        setUser(usersData[0]); // Use first user as per requirements
        setError(null);
      } catch (err) {
        setError('Failed to load user data. Please try again.');
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleBackToDashboard = () => {
    router.push('/dashboard');
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      <Header user={user} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12 animate-fade-in">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition-all duration-200 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-md group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Welcome, {user.name}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-10 animate-fade-in">
          {/* User Identity Section */}
          <div className="flex items-start space-x-8 mb-12">
            <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-bold text-3xl">
                {getInitials(user.name)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{user.name}</h2>
              <p className="text-gray-600 text-lg mb-4">{user.email}</p>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Active User
                </div>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ID: {user.id}
                </div>
              </div>
            </div>
          </div>

          {/* User Information Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">User ID</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-semibold shadow-sm">
                  {user.id}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Email ID</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-semibold shadow-sm">
                  {user.email}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Phone</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-semibold shadow-sm">
                  {user.phone}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Name</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-semibold shadow-sm">
                  {user.name}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Address</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-semibold shadow-sm leading-relaxed">
                  {user.address.street}, {user.address.suite}
                  <br />
                  {user.address.city}, {user.address.zipcode}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Company</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-semibold shadow-sm">
                  {user.company.name}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Username</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 text-gray-900 font-semibold shadow-sm">
                  {user.username}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Website</label>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50/50 border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                  <a 
                    href={`https://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 