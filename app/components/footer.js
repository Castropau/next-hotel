import React from 'react';

export default function Footer() {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p className="text-sm">
              We are dedicated to providing the best hospitality experience for our guests.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Rooms</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p className="text-sm">123 Hotel St, City, Country</p>
            <p className="text-sm">Email: info@hotel.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Hotel Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
