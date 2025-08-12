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
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg"
              alt="Swift Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* User Info - Clickable */}
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-3 hover:bg-black rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center  transition-colors shadow-sm">
              <span className="text-gray-700  font-medium text-sm">
                {getInitials(user.name)}
              </span>
            </div>
            <div className='text-black'>{user.name}</div>
            <span className="font-medium hidden sm:block text-black group-hover:text-gray-800 transition-colors">
              {user.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
} 