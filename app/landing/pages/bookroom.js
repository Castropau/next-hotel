"use client";
import React, { useEffect, useState } from 'react';

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/rooms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-8 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Top 5 Rooms - Most Rated</h1>
      <div className="grid grid-cols-1 gap-6">
        {rooms.map((room, index) => (
          <div key={index} className="border rounded-lg shadow-md bg-white flex">
            <div className="p-4 w-1/2">
              <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
              <p className="mb-2">{room.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">${room.price} / night</span>
                <span className="text-sm text-gray-600">
                  Max: {room.maxGuests} guests | Min: {room.minGuests} guests
                </span>
              </div>
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white text-sm py-1 px-3 rounded-md hover:bg-blue-600">
                  Book Now
                </button>
              </div>
            </div>
            <img src={room.image} alt={room.name} className="w-1/2 h-auto object-cover rounded-r-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
