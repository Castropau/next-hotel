"use client"; // Ensure this is declared at the top
import React, { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Navbars() {
    const router = useRouter();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const username = Cookies.get('username'); // Assuming you set the username in cookies
  
    const toggleUserMenu = () => {
      setUserMenuOpen(!userMenuOpen);
    };

  const handleLogout = () => {
    Cookies.remove('username'); // Clear the username cookie
    Cookies.remove('role'); // Clear the role cookie
    router.replace('/admin'); // Redirect to the login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="text-white text-lg font-bold">Hotel Name</div>
      <div className="space-x-4 flex items-center">
        <Link href="/admin/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
          Dashboard
        </Link>
        <Link href="/admin/dashboard/rooms" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
          Rooms
        </Link>
        <Link href="/admin/dashboard/book" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
          Bookings
        </Link>
        <Link href="/admin/dashboard/users" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2">
          Users
        </Link>
        
        {/* User menu button */}
        <div className="relative ml-3">
          <button
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
            onClick={toggleUserMenu}
          >
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                {username ? `Hello, ${username}` : 'Profile'}
              </a>
              <Link href="/landing/pages/settings" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                Settings
              </Link>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
  );
}
