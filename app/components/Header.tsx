'use client';

import { User } from '../types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center animate-slide-in">
            <Image
              src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg"
              alt="Swift Logo"
              width={140}
              height={48}
              className="h-10 w-auto transition-transform hover:scale-105"
              priority
            />
          </div>

          {/* User Info - Clickable */}
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-4 hover:bg-gray-50 rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200 hover:shadow-sm"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-md group-hover:shadow-lg group-hover:scale-105">
              <span className="text-white font-semibold text-sm">
                {getInitials(user.name)}
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                View Profile
              </div>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 