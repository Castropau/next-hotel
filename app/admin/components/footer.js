import React from 'react';

export default function FooterAdmin() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Hotel Admin. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
